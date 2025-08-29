'use strict';

var jsxRuntime = require('react/jsx-runtime');
var splitChildren = require('../../splitChildren.cjs');
var react = require('react');
var minifyCss = require('../../minifyCss.cjs');
var stylesEntry = require('../../../../../../components/dist/styles/esm/styles-entry.cjs');

/**
 * @slot {"name": "", "description": "Default slot for the table head row content." }
 */
class DSRTableHeadRow extends react.Component {
    host;
    render() {
        splitChildren.splitChildren(this.props.children);
        const style = minifyCss.minifyCss(stylesEntry.getTableHeadRowCss());
        return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsxs("template", { shadowroot: "open", shadowrootmode: "open", children: [jsxRuntime.jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsxRuntime.jsx(jsxRuntime.Fragment, { children: jsxRuntime.jsx("slot", {}) })] }), this.props.children] }));
    }
}

exports.DSRTableHeadRow = DSRTableHeadRow;
