import './callout.css';

const Plugin = window.CKEditor5.core.Plugin;
const ButtonView = window.CKEditor5.ui.ButtonView;
const Command = window.CKEditor5.core.Command;
const Widget = window.CKEditor5.widget.Widget;
const toWidget = window.CKEditor5.widget.toWidget;
const toWidgetEditable = window.CKEditor5.widget.toWidgetEditable;

export class Callout extends Plugin {
    static get pluginName() {
        return 'keyterm';
    }

    static get requires() {
        return [Widget];
    }

	constructor( editor: Editor ) {
		super();

		this.editor = editor;

		this.set( 'isEnabled', true );
	}
    
    init() {
        const editor = this.editor;
        const t = editor.t; // translate

        editor.ui.componentFactory.add('keyterm', (locale) => {
            const command = editor.commands.get('insertKeyterm');

            const buttonView = new ButtonView(locale);

            buttonView.set({
                label: t('Insert Keyterm'),
                withText: true,
                tooltip: true,
            });

            buttonView
                .bind('isOn', 'isEnabled')
                .to(command, 'value', 'isEnabled');

            this.listenTo(buttonView, 'execute', () =>
                editor.execute('insertKeyterm')
            );

            return buttonView;
        });

        this._defineSchema();
        this._defineConverters();

        this.editor.commands.add(
            'insertKeyterm',
            new InsertKeytermCommand(this.editor)
        );
    }

    _defineSchema() {
        const schema = this.editor.model.schema;

        schema.register('keyterm', {
            isObject: true,
            allowIn: '$root',
            isSelectable: true,
            allowChildren: ['term', 'definition'],
        });

        schema.register('term', {
            // Cannot be split or left by the caret.
            isLimit: true,

            allowIn: 'keyterm',

            // Allow content which is allowed in the containers.
            allowContentOf: '$container',
        });
    }

    _defineConverters() {
        const conversion = this.editor.conversion;
        const view = this.editor.editing.view;

        conversion.for('upcast').elementToElement({
            model: 'keyterm',
            view: {
                name: 'div',
                classes: ['test'],
            },
        });
        conversion.for('dataDowncast').elementToElement({
            model: 'keyterm',
            view: {
                name: 'div',
                classes: 'test',
            },
        });
        conversion.for('editingDowncast').elementToElement({
            model: 'keyterm',
            view: (modelElement, { writer: viewWriter }) => {
                const div = viewWriter.createContainerElement('div', {
                    class: 'keyterm',
                });
                const newTermElement = viewWriter.createEditableElement('term');
                const newDefinitionElement = viewWriter.createEditableElement('definition');
                viewWriter.append(newCaptionElement, div);
                // viewWriter.setCustomProperty('callout', true, div);
                return toWidget(div, viewWriter, {
                    label: 'keyterm widget',
                    hasSelectionHandle: true
                });
            },
        });

        // conversion.for('upcast').elementToElement({
        //     model: 'term',
        //     view: {
        //         name: 'div',
        //         classes: 'callout-content',
        //     },
        // });
        // conversion.for('dataDowncast').elementToElement({
        //     model: 'term',
        //     view: {
        //         name: 'div',
        //         classes: 'callout-content',
        //     },
        // });
        // conversion.for('editingDowncast').elementToElement({
        //     model: 'term',
        //     view: (modelElement, { writer: viewWriter }) => {
        //         const div = viewWriter.createEditableElement('div', {
        //             class: 'callout-content',
        //         });

        //         return toWidgetEditable(div, viewWriter);
        //     },
        // });
    }
}

class InsertKeytermCommand extends Command {
    execute() {
        this.editor.model.change((writer) => {
            this.editor.model.insertObject(createCallout(writer));
        });
    }

    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;
        
        const allowedIn = model.schema.findAllowedParent(
            selection.getFirstPosition(),
            'callout'
        );

        this.isEnabled = allowedIn !== null;
    }
}

function createCallout(writer) {
    const callout = writer.createElement('callout');
    const calloutContent = writer.createElement('calloutContent');

    writer.append(calloutContent, callout);

    writer.appendElement('paragraph', calloutContent);

    return callout;
}