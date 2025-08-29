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
 * @slot {"name": "", "description": "Default slot for the tag content." }
 */
class DSRTagDismissible extends react.Component {
    host;
    render() {
        splitChildren.splitChildren(this.props.children);
        const deprecationMap = {
            'background-default': 'background-base',
        };
        const style = minifyCss.minifyCss(stylesEntry.getTagDismissibleCss((deprecationMap[this.props.color] || this.props.color), !!this.props.label, this.props.theme));
        return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsxs("template", { shadowroot: "open", shadowrootmode: "open", shadowrootdelegatesfocus: "true", children: [jsxRuntime.jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsxRuntime.jsxs("button", { type: "button", ...utilsEntry.parseAndGetAriaAttributes(this.props.aria), children: [jsxRuntime.jsx("span", { className: "sr-only", children: "Remove:" }), jsxRuntime.jsxs("span", { children: [this.props.label && jsxRuntime.jsx("span", { className: "label", children: this.props.label }), jsxRuntime.jsx("slot", {})] }), jsxRuntime.jsx(icon_wrapper.PIcon, { className: "icon", name: "close", theme: this.props.theme, "aria-hidden": "true" })] })] }), this.props.children] }));
    }
}

exports.DSRTagDismissible = DSRTagDismissible;
