import {getClosestSelectedCalloutWidget} from './CalloutUtils';

const Plugin = window.CKEditor5.core.Plugin;
const WidgetToolbarRepository = window.CKEditor5.widget.WidgetToolbarRepository;

export class CalloutToolbar extends Plugin {
    value;

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

// function getClosestSelectedCalloutWidget(selection) {
//     const selectionPosition = selection.getFirstPosition();
//     if (!selectionPosition) {
//         return null;
//     }
//     const viewElement = selection.getSelectedElement();
//     if ( viewElement && viewElement.getCustomProperty('callout')) {
//         return viewElement;
//     }

//     let parent = selectionPosition.parent;

//     while (parent) {
//         if ( parent.is('element') && parent.getCustomProperty('callout')) {
//             return parent;
//         }
//         parent = parent.parent;
//     }
//     return null;
// }