const Plugin = window.CKEditor5.core.Plugin;
const ButtonView = window.CKEditor5.ui.ButtonView;
const Command = window.CKEditor5.core.Command;
const enablePlaceholder = window.CKEditor5.engine.enablePlaceholder;
const Widget = window.CKEditor5.widget.Widget;
const toWidgetEditable = window.CKEditor5.widget.toWidgetEditable;

export class CalloutCaption extends Plugin {
    static get pluginName() {
        return 'calloutCaption';
    }

    static get requires() {
        return [Widget];
    }

    constructor(editor) {
        super(editor);
    }

    init() {
        const editor = this.editor;
        const schema = editor.model.schema;
        const editingView = editor.editing.view;
        const t = editor.t; // translate

        editor.ui.componentFactory.add('toggleCalloutCaption', (locale) => {
            const command = editor.commands.get('toggleCalloutCaption');

            const buttonView = new ButtonView(locale);

            buttonView.set({
                label: t('Toggle Callout Title/Term'),
                withText: true,
                tooltip: true,
            });

            buttonView.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled');

            buttonView.bind('label').to(
                command, 'value',
                command, 'isEnabled', // set custom property so ToolTip displays one of source/keyterm/label/etc.
                (value, isEnabled) => `Toggle source/keyterm/label ${value ? 'off' : 'on'}`
                );

            this.listenTo(buttonView, 'execute', () => {
                editor.execute('toggleCalloutCaption');

                const modelCalloutElement = getCalloutFromModelSelection(editor.model.document.selection);
                const modelCaptionElement = getCaptionFromCalloutModelElement(modelCalloutElement);

                if (modelCaptionElement) {
                    const figcaptionElement = editor.editing.mapper.toViewElement(modelCaptionElement);

                    editingView.scrollToTheSelection();

                    editingView.change(writer => {
                        writer.addClass('callout__caption_highlighted', figcaptionElement);
                    });
                }

                editor.editing.view.focus();
            });

            return buttonView;
        });

        if ( !schema.isRegistered('caption') ) {
            schema.register( 'caption', {
                allowIn: 'callout',
                allowContentOf: '$block',
                isLimit: true,
            })
        } else {
            schema.extend( 'caption', {
                allowIn: 'callout'
            })
        }

        editor.commands.add(
            'toggleCalloutCaption',
            new ToggleCalloutCaptionCommand(this.editor)
        );

        this._setupConversion();
    }

    _setupConversion() {
        const editor = this.editor;
        const view = editor.editing.view;
        const t = editor.t;

        editor.conversion.for('upcast').elementToElement({
            view: element => { matchCalloutCaptionViewElement(element) },
            model: 'caption'
        });

        editor.conversion.for('dataDowncast').elementToElement({
            model: 'caption',
            view: (modelElement, { writer }) => {
                if (!modelElement.parent.is('element', 'callout')) {
                    return null;
                }
                return writer.createContainerElement('figcaption');
            }
        });

        editor.conversion.for('editingDowncast').elementToElement({
            model: 'caption',
            view: (modelElement, { writer }) => {
                if (!modelElement.parent.is('element', 'callout')) {
                    return null;
                }
                const figcaptionElement = writer.createEditableElement('figcaption');
                writer.setCustomProperty('calloutCaption', true, figcaptionElement);
                figcaptionElement.placeholder = t('Type title or keyterm');
                enablePlaceholder({
                    view,
                    element: figcaptionElement,
                    keepOnFocus: true,
                });
                return toWidgetEditable(figcaptionElement, writer);
            }
        });
    }
}

class ToggleCalloutCaptionCommand extends Command {

    refresh() {
        const editor = this.editor;
        const selection = editor.model.document.selection;
        const selectedElement = selection.getSelectedElement();

        if (!selectedElement) {
            const calloutElement = getCalloutFromModelSelection(selection);
            this.isEnabled = !!calloutElement;
            this.calloutElement = calloutElement;
            const captionElement = getCaptionFromCalloutModelElement(calloutElement);
            this.value = !!captionElement;
            return;
        }

        this.isEnabled = selectedElement.is('element', 'callout');

        if (!this.isEnabled) {
            this.value = false;
        } else {    
            this.value = !!getCaptionFromCalloutModelElement(selectedElement);
            this.calloutElement = selectedElement;
        }
    }

    execute() {
        this.editor.model.change(writer => {
            if (this.value) {
                this._hideCalloutCaption(writer);
            } else {
                this._showCalloutCaption(writer);
            }
        });
    }

    _showCalloutCaption(writer) {
        const newCaptionElement = writer.createElement('caption');
        writer.append(newCaptionElement, this.calloutElement);
        writer.setSelection(newCaptionElement, 'in');
    }

    _hideCalloutCaption(writer) {
        const captionElement = getCaptionFromCalloutModelElement(this.calloutElement);
        writer.setSelection(this.calloutElement, 'on');
        writer.remove(captionElement);
    }
}


function getCalloutFromModelSelection(selection) {
    const calloutElement = selection.getFirstPosition().findAncestor('callout');

    if (!calloutElement) {
        return null;
    }

    return calloutElement;
    
}

function getCaptionFromCalloutModelElement(calloutModelElement) {
    if (!calloutModelElement) {
        return null;
    }

    for (const node of calloutModelElement.getChildren()) {
        if (node.is('element', 'caption')) {
            return node;
        }
    }
    return null;
}

function matchCalloutCaptionViewElement( element ) {
    // Convert only captions for callouts.
    if ( element.name === 'figcaption' && element.parent?.is('element', 'figure') && element.parent?.hasClass('callout')) {
        return { name: true };
    }

    return null;
}