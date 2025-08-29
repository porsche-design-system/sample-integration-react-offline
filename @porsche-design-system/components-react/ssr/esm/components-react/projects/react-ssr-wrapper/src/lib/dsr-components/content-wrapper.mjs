import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { splitChildren } from '../../splitChildren.mjs';
import { Component } from 'react';
import { minifyCss } from '../../minifyCss.mjs';
import { getContentWrapperCss as getComponentCss$1b } from '../../../../../../components/dist/styles/esm/styles-entry.mjs';

/**
 * @slot {"name": "", "description": "Default slot for main content." }
 * @deprecated since v3.0.0, will be removed with next major release. Use native CSS Grid instead.
 */
class DSRContentWrapper extends Component {
    host;
    render() {
        splitChildren(this.props.children);
        const style = minifyCss(getComponentCss$1b(this.props.width));
        return (jsxs(Fragment, { children: [jsxs("template", { shadowroot: "open", shadowrootmode: "open", children: [jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsx("div", { className: "root", children: jsx("slot", {}) })] }), this.props.children] }));
    }
}

export { DSRContentWrapper };
