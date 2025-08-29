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
 * @slot {"name": "", "description": "Default slot for the content." }
 */
class DSRStepperHorizontalItem extends react.Component {
    host;
    render() {
        splitChildren.splitChildren(this.props.children);
        const style = minifyCss.minifyCss(stylesEntry.getStepperHorizontalItemCss(this.props.state, this.props.disabled, this.props.theme || 'light'));
        return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsxs("template", { shadowroot: "open", shadowrootmode: "open", shadowrootdelegatesfocus: "true", children: [jsxRuntime.jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsxRuntime.jsx(jsxRuntime.Fragment, { children: jsxRuntime.jsxs("button", { type: "button", "aria-disabled": !this.props.state || this.props.disabled ? 'true' : null, "aria-current": this.props.state === 'current' ? 'step' : null, children: [utilsEntry.isStateCompleteOrWarning(this.props.state) && (jsxRuntime.jsx(icon_wrapper.PIcon, { className: "icon", name: utilsEntry.getStepperHorizontalIconName(this.props.state), size: "inherit", theme: this.props.theme || 'light', color: this.props.disabled ? 'state-disabled' : `notification-${utilsEntry.getStepperHorizontalIconName(this.props.state)}`, "aria-hidden": "true" })), this.props.state && jsxRuntime.jsxs("span", { className: "sr-only", children: [this.props.state, ": "] }), jsxRuntime.jsx("slot", {})] }) })] }), this.props.children] }));
    }
}

exports.DSRStepperHorizontalItem = DSRStepperHorizontalItem;
