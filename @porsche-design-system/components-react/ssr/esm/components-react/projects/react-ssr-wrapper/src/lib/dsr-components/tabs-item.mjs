import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { splitChildren } from '../../splitChildren.mjs';
import { Component } from 'react';
import { minifyCss } from '../../minifyCss.mjs';
import { getTabsItemCss as getComponentCss$c } from '../../../../../../components/dist/styles/esm/styles-entry.mjs';

/**
 * @slot {"name": "", "description": "Default slot for the tab content." }
 */
class DSRTabsItem extends Component {
    host;
    render() {
        splitChildren(this.props.children);
        const style = minifyCss(getComponentCss$c(this.props.theme || 'light' // default as fallback
        ));
        return (jsxs(Fragment, { children: [jsxs("template", { shadowroot: "open", shadowrootmode: "open", children: [jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsx("slot", {})] }), this.props.children] }));
    }
}

export { DSRTabsItem };
