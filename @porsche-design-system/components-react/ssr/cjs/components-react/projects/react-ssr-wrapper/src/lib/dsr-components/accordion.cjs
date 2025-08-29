'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
require('../../provider.cjs');
var splitChildren = require('../../splitChildren.cjs');
var minifyCss = require('../../minifyCss.cjs');
var stylesEntry = require('../../../../../../components/dist/styles/esm/styles-entry.cjs');
var icon_wrapper = require('../components/icon.wrapper.cjs');

/**
 * @slot {"name": "heading", "description": "Defines the heading used in the accordion. Can be used alternatively to the heading prop. Please **refrain** from using any other than text content as slotted markup." }
 * @slot {"name": "", "description": "Default slot for the main content" }
 *
 * @controlled {"props": ["open"], "event": "update"}
 */
class DSRAccordion extends react.Component {
    host;
    render() {
        splitChildren.splitChildren(this.props.children);
        const buttonId = 'accordion-control';
        const contentId = 'accordion-panel';
        const Heading = this.props.tag || this.props.headingTag;
        const style = minifyCss.minifyCss(stylesEntry.getAccordionCss(this.props.size, this.props.compact, this.props.open, this.props.theme, this.props.sticky));
        return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsxs("template", { shadowroot: "open", shadowrootmode: "open", children: [jsxRuntime.jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx(Heading, { className: "heading", children: jsxRuntime.jsxs("button", { id: buttonId, type: "button", "aria-expanded": this.props.open ? 'true' : 'false', "aria-controls": contentId, children: [this.props.heading || jsxRuntime.jsx("slot", { name: "heading" }), jsxRuntime.jsx("span", { className: "icon-container", children: jsxRuntime.jsx(icon_wrapper.PIcon, { className: "icon", name: this.props.open ? 'minus' : 'plus', theme: this.props.theme, size: "xx-small", "aria-hidden": "true" }) })] }) }), jsxRuntime.jsx("div", { id: contentId, className: "collapsible", role: "region", "aria-labelledby": buttonId, children: jsxRuntime.jsx("div", { children: jsxRuntime.jsx("slot", {}) }) })] })] }), this.props.children] }));
    }
}

exports.DSRAccordion = DSRAccordion;
