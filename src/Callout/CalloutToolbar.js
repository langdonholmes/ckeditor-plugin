const Plugin = window.CKEditor5.core.Plugin;
const WidgetToolbarRepository = window.CKEditor5.widget.WidgetToolbarRepository;
const isWidget = window.CKEditor5.widget.isWidget;
export class CalloutToolbar extends Plugin {
    value;

    static get pluginName() {
        return 'calloutToolbar';
    }

    afterInit() {
        const editor = this.editor;
        const t = editor.t;
        const widgetToolbarRepository = editor.plugins.get(WidgetToolbarRepository);
        widgetToolbarRepository.register('callout', {
            ariaLabel: t('Callout toolbar'),
            items: [
                'toggleCalloutCaption',
            ],
            getRelatedElement: selection => getClosestSelectedCalloutWidget(selection)
        });
    }
}

function getClosestSelectedCalloutWidget(selection) {
    const selectionPosition = selection.getFirstPosition();
    if (!selectionPosition) {
        console.log("No selection position")
        return null;
    }
    const viewElement = selection.getSelectedElement();
    // console.log("View element", viewElement)
    if ( viewElement && viewElement.getCustomProperty('callout')) {
        console.log("View element selected", viewElement)
        return viewElement;
    }

    let parent = selectionPosition.parent;

    while (parent) {
        if ( parent.is('element') && parent.getCustomProperty('callout')) {
            console.log("Parent selected", parent)
            return parent;
        }
        parent = parent.parent;
    }
    console.log("no closest callout widget!!")
    return null;
}