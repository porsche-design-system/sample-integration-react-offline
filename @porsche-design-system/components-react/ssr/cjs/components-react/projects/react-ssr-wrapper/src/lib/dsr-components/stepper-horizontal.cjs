'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
require('../../provider.cjs');
var splitChildren = require('../../splitChildren.cjs');
var minifyCss = require('../../minifyCss.cjs');
var stylesEntry = require('../../../../../../components/dist/styles/esm/styles-entry.cjs');
var scroller_wrapper = require('../components/scroller.wrapper.cjs');

/**
 * @slot {"name": "", "description": "Default slot for the `p-stepper-horizontal-item` tags." }
 */
class DSRStepperHorizontal extends react.Component {
    host;
    stepperHorizontalItems = [];
    scrollerElement;
    currentStepIndex;
    render() {
        const { children, otherChildren } = splitChildren.splitChildren(this.props.children);
        const manipulatedChildren = children.map((child) => typeof child === 'object' && 'props' in child && otherChildren.includes(child)
            ? { ...child, props: { ...child.props, theme: this.props.theme } }
            : child);
        const style = minifyCss.minifyCss(stylesEntry.getStepperHorizontalCss(this.props.size));
        return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsxs("template", { shadowroot: "open", shadowrootmode: "open", children: [jsxRuntime.jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsxRuntime.jsx(jsxRuntime.Fragment, { children: jsxRuntime.jsx(scroller_wrapper.PScroller, { className: "scroller", aria: { role: 'list' }, theme: this.props.theme, children: jsxRuntime.jsx("slot", {}) }) })] }), manipulatedChildren] }));
    }
}

exports.DSRStepperHorizontal = DSRStepperHorizontal;
