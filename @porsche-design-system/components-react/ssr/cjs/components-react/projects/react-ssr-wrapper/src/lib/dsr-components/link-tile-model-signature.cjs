'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
require('../../provider.cjs');
var splitChildren = require('../../splitChildren.cjs');
var minifyCss = require('../../minifyCss.cjs');
var stylesEntry = require('../../../../../../components/dist/styles/esm/styles-entry.cjs');
var modelSignature_wrapper = require('../components/model-signature.wrapper.cjs');

/**
 * @slot {"name": "header", "description": "Renders a header section above the content area." }
 * @slot {"name": "", "description": "Default slot for the img or picture tag." }
 * @slot {"name": "primary", "description": "Renders the primary link. Has to be a p-link tag.", "isRequired": true, "allowedTagNames": ["p-link"] }
 * @slot {"name": "secondary", "description": "Renders the secondary link. Has to be a p-link tag.", "isRequired": true, "allowedTagNames": ["p-link"] }
 */
class DSRLinkTileModelSignature extends react.Component {
    host;
    render() {
        const { children, namedSlotChildren} = splitChildren.splitChildren(this.props.children);
        // If we do this earlier than render, there are cases where primaryLink.href is undefined
        // TODO: Here and in other components, validation happens only on initial render. We could extend this to watch props of the required slots.
        const manipulatedChildren = children.map((child) => typeof child === 'object' && 'props' in child && namedSlotChildren.includes(child)
            ? { ...child, props: { ...child.props, theme: 'dark', variant: child.props.slot } }
            : child);
        const primaryLink = manipulatedChildren.find((child) => typeof child === 'object' && 'props' in child && child.props.variant === 'primary');
        const linkEl = primaryLink.props.href
            ? primaryLink.props
            : (Array.isArray(primaryLink.props.children) ? primaryLink.props.children : [primaryLink.props.children]).find((child) => child.type === 'a' || child.props.href || child.props.to // href and to check is for framework links
            ).props; // support for slotted a tag within p-link
        const overlayLinkProps = {
            href: linkEl.href || linkEl.to,
            target: linkEl.target || '_self',
            download: linkEl.download || null,
            rel: linkEl.rel || null,
            tabIndex: -1,
            'aria-hidden': 'true',
        };
        const style = minifyCss.minifyCss(stylesEntry.getLinkTileModelSignatureCss(this.props.aspectRatio, this.props.weight, this.props.linkDirection, !!this.props.description));
        return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsxs("template", { shadowroot: "open", shadowrootmode: "open", children: [jsxRuntime.jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsxRuntime.jsxs("div", { className: "root", children: [jsxRuntime.jsx("a", { ...overlayLinkProps }), jsxRuntime.jsxs("div", { className: "header", children: [jsxRuntime.jsx(modelSignature_wrapper.PModelSignature, { theme: "dark", model: this.props.model }), jsxRuntime.jsx("slot", { name: "header" })] }), jsxRuntime.jsx("div", { className: "media", children: jsxRuntime.jsx("slot", {}) }), jsxRuntime.jsxs("div", { className: "footer", children: [jsxRuntime.jsx(this.props.headingTag, { children: this.props.heading }), this.props.description && jsxRuntime.jsx("p", { children: this.props.description }), jsxRuntime.jsxs("div", { className: "link-group", role: "group", children: [jsxRuntime.jsx("slot", { name: "primary" }), jsxRuntime.jsx("slot", { name: "secondary" })] })] })] })] }), manipulatedChildren] }));
    }
}

exports.DSRLinkTileModelSignature = DSRLinkTileModelSignature;
