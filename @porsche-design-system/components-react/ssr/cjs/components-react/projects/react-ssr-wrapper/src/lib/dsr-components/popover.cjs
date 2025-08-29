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
 * @slot {"name": "", "description": "Default slot for the popover content." }
 * @slot {"name": "button", "description": "Slot for custom button." }
 */
class DSRPopover extends react.Component {
    host;
    isOpen = false;
    popover;
    button;
    slottedButton;
    arrow;
    cleanUpAutoUpdate;
    hasNativePopoverSupport = utilsEntry.getHasNativePopoverSupport();
    // TODO: This should be updated when slot is changed
    hasSlottedButton;
    render() {
        const { namedSlotChildren} = splitChildren.splitChildren(this.props.children);
        const hasSlottedButton = namedSlotChildren.filter(({ props: { slot } }) => slot === 'button').length > 0;
        const style = minifyCss.minifyCss(stylesEntry.getPopoverCss(this.props.theme).replace(/(:host {[\S\s]+?})[\S\s]+(button {[\S\s]+?})[\S\s]+(.icon {[\S\s]+?})[\S\s]+(.label {[\S\s]+?})[\S\s]+/, '$1\n$2\n$3\n$4'));
        return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsxs("template", { shadowroot: "open", shadowrootmode: "open", children: [jsxRuntime.jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [hasSlottedButton ? (jsxRuntime.jsx("slot", { name: "button" })) : (jsxRuntime.jsxs("button", { type: "button", ...utilsEntry.parseAndGetAriaAttributes({
                                        ...utilsEntry.parseAndGetAriaAttributes(this.props.aria),
                                        ...{ 'aria-expanded': this.props.isOpen },
                                    }), children: [jsxRuntime.jsx(icon_wrapper.PIcon, { className: "icon", name: "information", theme: this.props.theme }), jsxRuntime.jsx("span", { className: "label", children: "More information" })] })), this.props.isOpen && (jsxRuntime.jsxs("div", { popover: "auto", children: [jsxRuntime.jsx("div", { className: "arrow" }), jsxRuntime.jsx("div", { className: "content", children: this.props.description ? jsxRuntime.jsx("p", { children: this.props.description }) : jsxRuntime.jsx("slot", {}) })] }))] })] }), this.props.children] }));
    }
}

exports.DSRPopover = DSRPopover;
