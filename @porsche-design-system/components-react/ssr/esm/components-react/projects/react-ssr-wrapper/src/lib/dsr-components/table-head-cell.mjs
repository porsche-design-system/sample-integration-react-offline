import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { Component } from 'react';
import '../../provider.mjs';
import { splitChildren } from '../../splitChildren.mjs';
import { minifyCss } from '../../minifyCss.mjs';
import { getTableHeadCellCss as getComponentCss$h } from '../../../../../../components/dist/styles/esm/styles-entry.mjs';
import { isSortable } from '../../../../../../components/dist/utils/esm/utils-entry.mjs';
import { PIcon } from '../components/icon.wrapper.mjs';

/**
 * @slot {"name": "", "description": "Default slot for the table head cell content." }
 */
class DSRTableHeadCell extends Component {
    host;
    render() {
        splitChildren(this.props.children);
        const { active, direction } = this.props.sort || {};
        const style = minifyCss(getComponentCss$h(active, direction, this.props.hideLabel, this.props.multiline));
        return (jsxs(Fragment, { children: [jsxs("template", { shadowroot: "open", shadowrootmode: "open", children: [jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsx(Fragment, { children: isSortable(active, direction) ? (jsxs("button", { type: "button", children: [jsx("slot", {}), jsx(PIcon, { className: "icon", color: "inherit", size: "x-small", name: "arrow-up", "aria-hidden": "true" })] })) : (jsx("span", { children: jsx("slot", {}) })) })] }), this.props.children] }));
    }
}

export { DSRTableHeadCell };
