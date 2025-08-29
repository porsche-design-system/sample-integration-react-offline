import { Component } from 'react';
import type { DrilldownItemInternalHTMLProps } from '@porsche-design-system/components/dist/utils';
/**
 * @slot {"name": "", "description": "Default slot for the main content." }
 * @slot {"name": "button", "description": "Shows a custom button to reach a deeper level of the navigation structure." } *
 * @slot {"name": "header", "description": "Shows a custom header section on mobile view" } *
 * @experimental
 */
export declare class DSRDrilldownItem extends Component<any> {
    host: HTMLElement & DrilldownItemInternalHTMLProps;
    private scroller;
    private hasSlottedHeader;
    private hasSlottedButton;
    private get theme();
    render(): JSX.Element;
}
