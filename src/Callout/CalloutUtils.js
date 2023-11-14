function getCalloutFromModelSelection(selection) {
    if (!selection) {
        return null;
    }

    const selectionPosition = selection.getFirstPosition();
    if (!selectionPosition) {
        return null;
    }

    const calloutElement = selectionPosition.findAncestor('callout');
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

function getClosestSelectedCalloutWidget(selection) {
    const selectionPosition = selection.getFirstPosition();
    if (!selectionPosition) {
        return null;
    }
    const viewElement = selection.getSelectedElement();
    if ( viewElement && viewElement.getCustomProperty('callout')) {
        return viewElement;
    }

    let parent = selectionPosition.parent;

    while (parent) {
        if ( parent.is('element') && parent.getCustomProperty('callout')) {
            return parent;
        }
        parent = parent.parent;
    }
    return null;
}

module.exports = {
    getCalloutFromModelSelection,
    getCaptionFromCalloutModelElement,
    matchCalloutCaptionViewElement,
    getClosestSelectedCalloutWidget
};