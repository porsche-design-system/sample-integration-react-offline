'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
require('../../provider.cjs');
var splitChildren = require('../../splitChildren.cjs');
var minifyCss = require('../../minifyCss.cjs');
var stylesEntry = require('../../../../../../components/dist/styles/esm/styles-entry.cjs');
var buttonPure_wrapper = require('../components/button-pure.wrapper.cjs');

/**
 * @slot {"name": "", "description": "Default slot for the main content." }
 * @slot {"name": "button", "description": "Shows a custom button to reach a deeper level of the navigation structure." } *
 * @slot {"name": "header", "description": "Shows a custom header section on mobile view" } *
 * @experimental
 */
class DSRDrilldownItem extends react.Component {
    host;
    scroller;
    hasSlottedHeader;
    hasSlottedButton;
    get theme() {
        return this.props.theme || 'light'; // default as fallback (internal private prop is controlled by drilldown)
    }
    render() {
        const { namedSlotChildren} = splitChildren.splitChildren(this.props.children);
        const hasSlottedHeader = namedSlotChildren.filter(({ props: { slot } }) => slot === 'header').length > 0;
        const hasSlottedButton = namedSlotChildren.filter(({ props: { slot } }) => slot === 'button').length > 0;
        const style = minifyCss.minifyCss(stylesEntry.getDrilldownItemCss(this.props.primary, this.props.secondary, this.props.cascade));
        return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsxs("template", { shadowroot: "open", shadowrootmode: "open", children: [jsxRuntime.jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [hasSlottedButton ? (jsxRuntime.jsx("slot", { name: "button" })) : (jsxRuntime.jsx(buttonPure_wrapper.PButtonPure, { inert: this.props.primary || this.props.cascade, className: "button", type: "button", size: "medium", alignLabel: "start", stretch: true, icon: "arrow-head-right", active: this.props.secondary, aria: { 'aria-expanded': this.props.secondary }, theme: this.theme, children: this.props.label })), jsxRuntime.jsx(buttonPure_wrapper.PButtonPure, { className: "back", type: "button", size: "small", alignLabel: "end", stretch: true, icon: "arrow-left", theme: this.theme, hideLabel: { base: true, s: false }, children: this.props.label }), hasSlottedHeader ? jsxRuntime.jsx("slot", { name: "header" }) : jsxRuntime.jsx("h2", { children: this.props.label }), jsxRuntime.jsx("div", { className: "drawer", children: jsxRuntime.jsx("div", { className: "scroller", children: jsxRuntime.jsx("slot", {}) }) })] })] }), this.props.children] }));
    }
}

exports.DSRDrilldownItem = DSRDrilldownItem;
