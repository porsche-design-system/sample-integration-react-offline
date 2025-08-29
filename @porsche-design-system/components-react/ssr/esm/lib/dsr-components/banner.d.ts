import { Component } from 'react';
/**
 * @slot {"name": "heading", "description": "Defines the heading used in the banner. Can be used alternatively to the heading prop. Can be used for rich content.", "hasAltProp": true }
 * @slot {"name": "title", "description": "Please use the heading prop or slot=\"heading\" instead.", "hasAltProp": true, "isDeprecated": true }
 * @slot {"name": "description", "description": "Defines the description used in the banner. Can be used alternatively to the description prop. Can be used for rich content.", "hasAltProp": true }
 *
 * @controlled {"props": ["open"], "event": "dismiss"}
 */
export declare class DSRBanner extends Component<any> {
    host: HTMLElement;
    private inlineNotificationElement;
    private closeBtn;
    private get hasDismissButton();
    render(): JSX.Element;
}
