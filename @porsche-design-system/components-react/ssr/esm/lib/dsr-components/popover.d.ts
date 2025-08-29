import { Component } from 'react';
/**
 * @slot {"name": "", "description": "Default slot for the popover content." }
 * @slot {"name": "button", "description": "Slot for custom button." }
 */
export declare class DSRPopover extends Component<any> {
    host: HTMLElement;
    private isOpen;
    private popover;
    private button;
    private slottedButton;
    private arrow;
    private cleanUpAutoUpdate;
    private hasNativePopoverSupport;
    private hasSlottedButton;
    render(): JSX.Element;
}
