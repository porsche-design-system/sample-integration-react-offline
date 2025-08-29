'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
require('../../provider.cjs');
var splitChildren = require('../../splitChildren.cjs');
var minifyCss = require('../../minifyCss.cjs');
var stylesEntry = require('../../../../../../components/dist/styles/esm/styles-entry.cjs');
var utilsEntry = require('../../../../../../components/dist/utils/esm/utils-entry.cjs');
var button_wrapper = require('../components/button.wrapper.cjs');

/**
 * @slot {"name": "heading", "description": "Renders a heading section above the content area.", "isDeprecated": true }
 * @slot {"name": "header", "description": "Renders a header section above the content area." }
 * @slot {"name": "", "description": "Default slot for the main content." }
 * @slot {"name": "footer", "description": "Shows a sticky footer section, flowing under the content area when scrollable." }
 *
 * @controlled {"props": ["open"], "event": "dismiss"}
 */
class DSRModal extends react.Component {
    host;
    dialog;
    scroller;
    footer;
    hasHeader;
    hasFooter;
    get hasDismissButton() {
        return this.props.disableCloseButton ? false : this.props.dismissButton;
    }
    render() {
        const { namedSlotChildren} = splitChildren.splitChildren(this.props.children);
        const hasHeader = (this.props.heading || namedSlotChildren.filter(({ props: { slot } }) => slot === 'heading').length > 0) || namedSlotChildren.filter(({ props: { slot } }) => slot === 'header').length > 0;
        const hasFooter = namedSlotChildren.filter(({ props: { slot } }) => slot === 'footer').length > 0;
        const hasDismissButton = this.props.disableCloseButton ? false : this.props.dismissButton;
        // TODO: why do we validate only when opened?
        if (this.props.open) ;
        const style = minifyCss.minifyCss(stylesEntry.getModalCss(this.props.open, this.props.backdrop, this.props.fullscreen, hasDismissButton, hasHeader, hasFooter, this.props.theme));
        return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsxs("template", { shadowroot: "open", shadowrootmode: "open", children: [jsxRuntime.jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsxRuntime.jsx("dialog", { inert: !this.props.open, tabIndex: -1, ...utilsEntry.parseAndGetAriaAttributes({
                                'aria-modal': true,
                                ...(hasHeader && { 'aria-label': this.props.ariaLabel }),
                                ...utilsEntry.parseAndGetAriaAttributes(this.props.aria),
                            }), children: jsxRuntime.jsx("div", { className: "scroller", children: jsxRuntime.jsxs("div", { className: "modal", children: [hasDismissButton && (jsxRuntime.jsx(button_wrapper.PButton, { variant: "ghost", className: "dismiss", type: "button", hideLabel: true, icon: "close", theme: this.props.theme, children: "Dismiss modal" })), hasHeader &&
                                            (this.props.heading ? (jsxRuntime.jsx("h2", { children: this.props.heading })) : namedSlotChildren.filter(({ props: { slot } }) => slot === 'heading').length > 0 ? (jsxRuntime.jsx("slot", { name: "heading" })) : (jsxRuntime.jsx("slot", { name: "header" }))), jsxRuntime.jsx("slot", {}), hasFooter && jsxRuntime.jsx("slot", { name: "footer" })] }) }) })] }), this.props.children] }));
    }
}

exports.DSRModal = DSRModal;
