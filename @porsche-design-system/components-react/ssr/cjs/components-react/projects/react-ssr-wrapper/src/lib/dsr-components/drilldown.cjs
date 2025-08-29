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

/**
 * @slot {"name": "", "description": "Default slot to render p-drilldown items." }
 *
 * @controlled {"props": ["open"], "event": "dismiss"}
 * @controlled {"props": ["activeIdentifier"], "event": "update"}
 *
 * @experimental
 */
class DSRDrilldown extends react.Component {
    host;
    drilldownItemElements = [];
    primary = true;
    isSecondaryDrawerVisible = !!this.props.activeIdentifier;
    dialog;
    drawer;
    isDesktop = false;
    async componentWillLoad() {
        this.props.defineDrilldownItemElements();
        const activeItem = this.props.drilldownItemElements.find((item) => item.identifier === this.props.activeIdentifier);
        activeItem && utilsEntry.updateDrilldownItemState(activeItem, true); // Set item state
    }
    render() {
        splitChildren.splitChildren(this.props.children);
        const style = minifyCss.minifyCss(stylesEntry.getDrilldownCss(this.props.open, this.primary, this.isSecondaryDrawerVisible, this.props.theme));
        return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsxs("template", { shadowroot: "open", shadowrootmode: "open", children: [jsxRuntime.jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsxRuntime.jsx("dialog", { inert: !this.props.open, ...utilsEntry.parseAndGetAriaAttributes(this.props.aria), children: jsxRuntime.jsxs("div", { className: "drawer", children: [jsxRuntime.jsx(buttonPure_wrapper.PButtonPure, { className: "back", type: "button", size: "small", alignLabel: "end", stretch: true, icon: "arrow-left", theme: this.props.theme, hideLabel: true, children: "Back" }), jsxRuntime.jsx(button_wrapper.PButton, { className: "dismiss-mobile", type: "button", variant: "ghost", hideLabel: true, icon: "close", theme: this.props.theme, children: "Dismiss drilldown" }), jsxRuntime.jsx(buttonPure_wrapper.PButtonPure, { className: "dismiss-desktop", type: "button", size: "medium", icon: "close", hideLabel: true, theme: this.props.theme, children: "Dismiss drilldown" }), jsxRuntime.jsx("div", { className: "scroller", children: jsxRuntime.jsx("slot", {}) })] }) })] }), this.props.children] }));
    }
}

exports.DSRDrilldown = DSRDrilldown;
