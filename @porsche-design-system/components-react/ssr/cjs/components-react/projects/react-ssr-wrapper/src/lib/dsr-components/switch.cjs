'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
require('../../provider.cjs');
var splitChildren = require('../../splitChildren.cjs');
var minifyCss = require('../../minifyCss.cjs');
var stylesEntry = require('../../../../../../components/dist/styles/esm/styles-entry.cjs');
var utilsEntry = require('../../../../../../components/dist/utils/esm/utils-entry.cjs');
var loadingMessage = require('./loading-message.cjs');
var spinner_wrapper = require('../components/spinner.wrapper.cjs');

/**
 * @slot {"name": "", "description": "Default slot for the label." }
 *
 * @controlled {"props": ["checked"], "event": "update"}
 */
class DSRSwitch extends react.Component {
    host;
    initialLoading = false;
    render() {
        splitChildren.splitChildren(this.props.children);
        const style = minifyCss.minifyCss(stylesEntry.getSwitchCss(this.props.alignLabel, this.props.hideLabel, this.props.stretch, this.props.checked, this.props.disabled, this.props.loading, this.props.compact, this.props.theme));
        return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsxs("template", { shadowroot: "open", shadowrootmode: "open", shadowrootdelegatesfocus: "true", children: [jsxRuntime.jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx("button", { ...utilsEntry.getSwitchButtonAriaAttributes(this.props.disabled, this.props.loading, this.props.checked), id: "switch", type: "button", role: "switch", "aria-labelledby": "label" // only relevant for axe-core because of https://github.com/dequelabs/axe-core/issues/1393
                                    , "aria-describedby": this.props.loading ? loadingMessage.loadingId : undefined, children: jsxRuntime.jsx("span", { className: "toggle", children: this.props.loading && (jsxRuntime.jsx(spinner_wrapper.PSpinner, { className: "spinner", size: "inherit", theme: this.props.theme, "aria-hidden": "true" })) }) }), jsxRuntime.jsx("label", { id: "label", htmlFor: "switch", children: jsxRuntime.jsx("slot", {}) }), jsxRuntime.jsx(loadingMessage.LoadingMessage, { loading: this.props.loading, initialLoading: this.props.initialLoading })] })] }), this.props.children] }));
    }
}

exports.DSRSwitch = DSRSwitch;
