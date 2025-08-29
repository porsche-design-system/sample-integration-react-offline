import { Component } from 'react';
/**
 * @slot {"name": "", "description": "Default slot to render p-drilldown items." }
 *
 * @controlled {"props": ["open"], "event": "dismiss"}
 * @controlled {"props": ["activeIdentifier"], "event": "update"}
 *
 * @experimental
 */
export declare class DSRDrilldown extends Component<any> {
    host: HTMLElement;
    private drilldownItemElements;
    private primary;
    private isSecondaryDrawerVisible;
    private dialog;
    private drawer;
    private isDesktop;
    componentWillLoad(): Promise<void>;
    render(): JSX.Element;
}
