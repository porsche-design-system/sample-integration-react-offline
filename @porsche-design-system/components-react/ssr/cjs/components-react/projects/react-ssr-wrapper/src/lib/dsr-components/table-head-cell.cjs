'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
require('../../provider.cjs');
var splitChildren = require('../../splitChildren.cjs');
var minifyCss = require('../../minifyCss.cjs');
var stylesEntry = require('../../../../../../components/dist/styles/esm/styles-entry.cjs');
var utilsEntry = require('../../../../../../components/dist/utils/esm/utils-entry.cjs');
var icon_wrapper = require('../components/icon.wrapper.cjs');

/**
 * @slot {"name": "", "description": "Default slot for the table head cell content." }
 */
class DSRTableHeadCell extends react.Component {
    host;
    render() {
        splitChildren.splitChildren(this.props.children);
        const { active, direction } = this.props.sort || {};
        const style = minifyCss.minifyCss(stylesEntry.getTableHeadCellCss(active, direction, this.props.hideLabel, this.props.multiline));
        return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsxs("template", { shadowroot: "open", shadowrootmode: "open", children: [jsxRuntime.jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsxRuntime.jsx(jsxRuntime.Fragment, { children: utilsEntry.isSortable(active, direction) ? (jsxRuntime.jsxs("button", { type: "button", children: [jsxRuntime.jsx("slot", {}), jsxRuntime.jsx(icon_wrapper.PIcon, { className: "icon", color: "inherit", size: "x-small", name: "arrow-up", "aria-hidden": "true" })] })) : (jsxRuntime.jsx("span", { children: jsxRuntime.jsx("slot", {}) })) })] }), this.props.children] }));
    }
}

exports.DSRTableHeadCell = DSRTableHeadCell;
