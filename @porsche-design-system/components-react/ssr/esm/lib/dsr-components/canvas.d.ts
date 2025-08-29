import { Component } from 'react';
/**
 * @slot {"name": "title", "description": "Renders the application name in the header section of the sidebar start area." }
 * @slot {"name": "header-start", "description": "Renders a **sticky** header section above the content area on the **start** side (**left** in **LTR** mode / **right** in **RTL** mode)." }
 * @slot {"name": "header-end", "description": "Renders a **sticky** header section above the content area on the **end** side (**right** in **LTR** mode / **left** in **RTL** mode)." }
 * @slot {"name": "", "description": "Default slot for the main content." }
 * @slot {"name": "footer", "description": "Renders a **sticky** footer section underneath the main content." }
 * @slot {"name": "sidebar-start", "description": "Renders a sidebar area on the **start** side (**left** in **LTR** mode / **right** in **RTL** mode). On mobile view it transforms into a flyout." }
 * @slot {"name": "sidebar-end", "description": "Renders a sidebar area on the **end** side (**right** in **LTR** mode / **left** in **RTL** mode). On mobile view it transforms into a flyout." }
 * @slot {"name": "sidebar-end-header", "description": "Renders in the header section of the sidebar end area." }
 * @slot {"name": "background", "description": "Can be used to pass a sticky media element <img/> or <video/> placed underneath the main content." }
 *
 * @experimental
 */
export declare class DSRCanvas extends Component<any> {
    host: HTMLElement;
    private isMediaQueryS;
    private isMediaQueryM;
    private hasTitle;
    private hasSidebarEnd;
    private hasSidebarEndHeader;
    private hasFooter;
    private hasBackground;
    render(): JSX.Element;
}
