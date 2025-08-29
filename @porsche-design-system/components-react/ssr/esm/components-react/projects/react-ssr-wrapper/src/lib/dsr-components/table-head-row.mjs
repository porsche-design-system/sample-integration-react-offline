import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { splitChildren } from '../../splitChildren.mjs';
import { Component } from 'react';
import { minifyCss } from '../../minifyCss.mjs';
import { getTableHeadRowCss as getComponentCss$g } from '../../../../../../components/dist/styles/esm/styles-entry.mjs';

/**
 * @slot {"name": "", "description": "Default slot for the table head row content." }
 */
class DSRTableHeadRow extends Component {
    host;
    render() {
        splitChildren(this.props.children);
        const style = minifyCss(getComponentCss$g());
        return (jsxs(Fragment, { children: [jsxs("template", { shadowroot: "open", shadowrootmode: "open", children: [jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsx(Fragment, { children: jsx("slot", {}) })] }), this.props.children] }));
    }
}

export { DSRTableHeadRow };
