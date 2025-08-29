import { Component } from 'react';
/**
 * @slot {"name": "label", "description": "Shows a label. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 * @slot {"name": "description", "description": "Shows a description. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 * @slot {"name": "", "description": "Default slot for the `p-select-option` tags." }
 * @slot {"name": "message", "description": "Shows a state message. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 *
 * @controlled { "props": ["value"], "event": "update", "isInternallyMutated": true }
 */
export declare class DSRSelect extends Component<any> {
    host: HTMLElement;
    private isOpen;
    private hasFilterResults;
    private internals;
    private defaultValue;
    private buttonElement;
    private popoverElement;
    private inputSearchElement;
    private inputSearchInputElement;
    private listboxElement;
    private selectOptions;
    private selectOptgroups;
    private preventOptionUpdate;
    private searchString;
    private searchTimeout;
    private slottedImagePath;
    private hasNativePopoverSupport;
    private cleanUpAutoUpdate;
    private currentlyHighlightedOption;
    formDisabledCallback(): void;
    formStateRestoreCallback(): void;
    formResetCallback(): void;
    render(): JSX.Element;
    private getSelectedOptionImagePath;
}
