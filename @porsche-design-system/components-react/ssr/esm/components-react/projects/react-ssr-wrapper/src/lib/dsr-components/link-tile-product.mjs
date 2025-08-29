import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { Component } from 'react';
import '../../provider.mjs';
import { splitChildren } from '../../splitChildren.mjs';
import { minifyCss } from '../../minifyCss.mjs';
import { getLinkTileProductCss as getComponentCss$I } from '../../../../../../components/dist/styles/esm/styles-entry.mjs';
import { anchorSlot, headerSlot } from '../../../../../../components/dist/utils/esm/utils-entry.mjs';
import { PButtonPure } from '../components/button-pure.wrapper.mjs';

/**
 * @slot {"name": "anchor", "description": "Slotted anchor link which can be used instead of the `href` prop. Ensure the named slot is directly on the anchor element, without nesting." }
 * @slot {"name": "header", "description": "Shows special features about the product like novelty or exclusivity. Although you can pass in anything, it is recommended to use the `p-tag` component." }
 * @slot {"name": "", "description": "Default slot for the img or picture tag." }
 *
 * @controlled {"props": ["liked"], "event": "like"}
 *
 * @experimental
 */
class DSRLinkTileProduct extends Component {
    host;
    render() {
        splitChildren(this.props.children);
        const headerId = 'header';
        const headingId = 'heading';
        const priceId = 'price';
        const descriptionId = 'description';
        const style = minifyCss(getComponentCss$I(this.props.likeButton, !this.props.href, !!this.props.priceOriginal, !!this.props.description, this.props.aspectRatio, this.props.theme));
        return (jsxs(Fragment, { children: [jsxs("template", { shadowroot: "open", shadowrootmode: "open", shadowrootdelegatesfocus: "true", children: [jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsxs("div", { className: "root", children: [this.props.href ? (jsx("a", { className: "anchor", href: this.props.href, target: this.props.target, rel: this.props.rel, "aria-labelledby": `${headingId} ${priceId}`, "aria-describedby": `${headerId} ${descriptionId}` })) : (jsx("slot", { name: anchorSlot })), jsxs("div", { id: headerId, className: "header", children: [jsx("slot", { name: headerSlot }), this.props.likeButton && (jsx(PButtonPure, { className: "button", type: "button", icon: this.props.liked ? 'heart-filled' : 'heart', hideLabel: true, theme: this.props.theme, children: this.props.liked ? 'Remove from wishlist' : 'Add to wishlist' }))] }), jsx("div", { className: "image", children: jsx("slot", {}) }), jsxs("div", { className: "wrapper", children: [this.props.heading && (jsx("h3", { id: headingId, className: "heading", children: this.props.heading })), this.props.price && (jsx("p", { id: priceId, className: "price", children: this.props.priceOriginal ? (jsxs(Fragment, { children: [jsx("span", { className: "sr-only", children: "sale price" }), this.props.price, jsx("span", { className: "sr-only", children: "original price" }), jsx("s", { children: this.props.priceOriginal })] })) : (this.props.price) })), this.props.description && (jsx("p", { id: descriptionId, className: "description", children: this.props.description }))] })] })] }), this.props.children] }));
    }
}

export { DSRLinkTileProduct };
