'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
require('../../provider.cjs');
var splitChildren = require('../../splitChildren.cjs');
var minifyCss = require('../../minifyCss.cjs');
var stylesEntry = require('../../../../../../components/dist/styles/esm/styles-entry.cjs');
var inlineNotification_wrapper = require('../components/inline-notification.wrapper.cjs');

/**
 * @slot {"name": "heading", "description": "Defines the heading used in the banner. Can be used alternatively to the heading prop. Can be used for rich content.", "hasAltProp": true }
 * @slot {"name": "title", "description": "Please use the heading prop or slot=\"heading\" instead.", "hasAltProp": true, "isDeprecated": true }
 * @slot {"name": "description", "description": "Defines the description used in the banner. Can be used alternatively to the description prop. Can be used for rich content.", "hasAltProp": true }
 *
 * @controlled {"props": ["open"], "event": "dismiss"}
 */
class DSRBanner extends react.Component {
    host;
    inlineNotificationElement;
    closeBtn;
    get hasDismissButton() {
        return this.props.persistent ? false : this.props.dismissButton;
    }
    render() {
        const { namedSlotChildren} = splitChildren.splitChildren(this.props.children);
        const hasTitleSlot = namedSlotChildren.filter(({ props: { slot } }) => slot === 'title').length > 0;
        const style = minifyCss.minifyCss(stylesEntry.getBannerCss(this.props.open));
        return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsxs("template", { shadowroot: "open", shadowrootmode: "open", children: [jsxRuntime.jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsxRuntime.jsx(jsxRuntime.Fragment, { children: jsxRuntime.jsxs(inlineNotification_wrapper.PInlineNotification, { heading: this.props.heading, headingTag: this.props.headingTag, description: this.props.description, state: this.props.state, dismissButton: this.hasDismissButton, theme: this.props.theme, "aria-hidden": this.props.open ? 'false' : 'true', children: [namedSlotChildren.filter(({ props: { slot } }) => slot === 'heading').length > 0 ? (jsxRuntime.jsx("slot", { name: "heading", slot: "heading" })) : (hasTitleSlot && jsxRuntime.jsx("slot", { name: "title", slot: "heading" })), namedSlotChildren.filter(({ props: { slot } }) => slot === 'description').length > 0 && jsxRuntime.jsx("slot", { name: "description" })] }) })] }), this.props.children] }));
    }
}

exports.DSRBanner = DSRBanner;
