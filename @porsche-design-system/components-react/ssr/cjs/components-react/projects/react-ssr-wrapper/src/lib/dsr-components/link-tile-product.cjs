'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
require('../../provider.cjs');
var splitChildren = require('../../splitChildren.cjs');
var minifyCss = require('../../minifyCss.cjs');
var stylesEntry = require('../../../../../../components/dist/styles/esm/styles-entry.cjs');
var utilsEntry = require('../../../../../../components/dist/utils/esm/utils-entry.cjs');
var buttonPure_wrapper = require('../components/button-pure.wrapper.cjs');

/**
 * @slot {"name": "anchor", "description": "Slotted anchor link which can be used instead of the `href` prop. Ensure the named slot is directly on the anchor element, without nesting." }
 * @slot {"name": "header", "description": "Shows special features about the product like novelty or exclusivity. Although you can pass in anything, it is recommended to use the `p-tag` component." }
 * @slot {"name": "", "description": "Default slot for the img or picture tag." }
 *
 * @controlled {"props": ["liked"], "event": "like"}
 *
 * @experimental
 */
class DSRLinkTileProduct extends react.Component {
    host;
    render() {
        splitChildren.splitChildren(this.props.children);
        const headerId = 'header';
        const headingId = 'heading';
        const priceId = 'price';
        const descriptionId = 'description';
        const style = minifyCss.minifyCss(stylesEntry.getLinkTileProductCss(this.props.likeButton, !this.props.href, !!this.props.priceOriginal, !!this.props.description, this.props.aspectRatio, this.props.theme));
        return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsxs("template", { shadowroot: "open", shadowrootmode: "open", shadowrootdelegatesfocus: "true", children: [jsxRuntime.jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsxRuntime.jsxs("div", { className: "root", children: [this.props.href ? (jsxRuntime.jsx("a", { className: "anchor", href: this.props.href, target: this.props.target, rel: this.props.rel, "aria-labelledby": `${headingId} ${priceId}`, "aria-describedby": `${headerId} ${descriptionId}` })) : (jsxRuntime.jsx("slot", { name: utilsEntry.anchorSlot })), jsxRuntime.jsxs("div", { id: headerId, className: "header", children: [jsxRuntime.jsx("slot", { name: utilsEntry.headerSlot }), this.props.likeButton && (jsxRuntime.jsx(buttonPure_wrapper.PButtonPure, { className: "button", type: "button", icon: this.props.liked ? 'heart-filled' : 'heart', hideLabel: true, theme: this.props.theme, children: this.props.liked ? 'Remove from wishlist' : 'Add to wishlist' }))] }), jsxRuntime.jsx("div", { className: "image", children: jsxRuntime.jsx("slot", {}) }), jsxRuntime.jsxs("div", { className: "wrapper", children: [this.props.heading && (jsxRuntime.jsx("h3", { id: headingId, className: "heading", children: this.props.heading })), this.props.price && (jsxRuntime.jsx("p", { id: priceId, className: "price", children: this.props.priceOriginal ? (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx("span", { className: "sr-only", children: "sale price" }), this.props.price, jsxRuntime.jsx("span", { className: "sr-only", children: "original price" }), jsxRuntime.jsx("s", { children: this.props.priceOriginal })] })) : (this.props.price) })), this.props.description && (jsxRuntime.jsx("p", { id: descriptionId, className: "description", children: this.props.description }))] })] })] }), this.props.children] }));
    }
}

exports.DSRLinkTileProduct = DSRLinkTileProduct;
