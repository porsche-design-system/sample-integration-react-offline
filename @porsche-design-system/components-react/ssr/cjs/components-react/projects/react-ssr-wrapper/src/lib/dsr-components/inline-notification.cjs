'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
require('../../provider.cjs');
var splitChildren = require('../../splitChildren.cjs');
var minifyCss = require('../../minifyCss.cjs');
var stylesEntry = require('../../../../../../components/dist/styles/esm/styles-entry.cjs');
var utilsEntry = require('../../../../../../components/dist/utils/esm/utils-entry.cjs');
var button_wrapper = require('../components/button.wrapper.cjs');
var buttonPure_wrapper = require('../components/button-pure.wrapper.cjs');
var icon_wrapper = require('../components/icon.wrapper.cjs');

/**
 * @slot {"name": "heading", "description": "Shows a heading. Can be used to render rich markup." }
 * @slot {"name": "", "description": "Default slot to render a description. Can be used to render rich markup." }
 */
class DSRInlineNotification extends react.Component {
    host;
    get hasDismissButton() {
        return this.props.persistent ? false : this.props.dismissButton;
    }
    render() {
        const { namedSlotChildren} = splitChildren.splitChildren(this.props.children);
        const bannerId = 'banner';
        const labelId = 'label';
        const descriptionId = 'description';
        const Heading = this.props.headingTag;
        const style = minifyCss.minifyCss(stylesEntry.getInlineNotificationCss(this.props.state, !!this.props.actionLabel, this.hasDismissButton, this.props.theme));
        return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsxs("template", { shadowroot: "open", shadowrootmode: "open", children: [jsxRuntime.jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx(icon_wrapper.PIcon, { className: "icon", name: utilsEntry.getInlineNotificationIconName(this.props.state), color: `notification-${this.props.state}`, theme: this.props.theme, "aria-hidden": "true" }), jsxRuntime.jsxs("div", { id: bannerId, className: "content", ...utilsEntry.getContentAriaAttributes(this.props.state, labelId, descriptionId), children: [(this.props.heading || namedSlotChildren.filter(({ props: { slot } }) => slot === 'heading').length > 0) &&
                                            (this.props.heading ? (jsxRuntime.jsx(Heading, { id: labelId, className: "heading", children: this.props.heading })) : (jsxRuntime.jsx("slot", { name: "heading" }))), jsxRuntime.jsx("p", { id: descriptionId, className: "description", children: this.props.description || jsxRuntime.jsx("slot", {}) })] }), this.props.actionLabel && (jsxRuntime.jsx(buttonPure_wrapper.PButtonPure, { className: "action", theme: this.props.theme, icon: this.props.actionIcon, loading: this.props.actionLoading, children: this.props.actionLabel })), this.hasDismissButton && (jsxRuntime.jsx(button_wrapper.PButton, { className: "close", type: "button", variant: "ghost", icon: "close", theme: this.props.theme, hideLabel: true, "aria-controls": bannerId, children: "Close notification" }))] })] }), this.props.children] }));
    }
}

exports.DSRInlineNotification = DSRInlineNotification;
