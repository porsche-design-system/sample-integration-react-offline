'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
require('../../provider.cjs');
var splitChildren = require('../../splitChildren.cjs');
var minifyCss = require('../../minifyCss.cjs');
var stylesEntry = require('../../../../../../components/dist/styles/esm/styles-entry.cjs');
var utilsEntry = require('../../../../../../components/dist/utils/esm/utils-entry.cjs');
var loadingMessage = require('./loading-message.cjs');
var icon_wrapper = require('../components/icon.wrapper.cjs');
var spinner_wrapper = require('../components/spinner.wrapper.cjs');

/**
 * @slot {"name": "", "description": "Default slot for the button label." }
 */
class DSRButton extends react.Component {
    host;
    // In the React wrapper, all props are synced as properties on the element ref, so reflecting "form" as an attribute ensures it is properly handled in the form submission process.
    internals;
    initialLoading = false;
    render() {
        splitChildren.splitChildren(this.props.children);
        const style = minifyCss.minifyCss(stylesEntry.getButtonCss(this.props.icon, this.props.iconSource, this.props.variant, this.props.hideLabel, this.props.disabled, this.props.loading, this.props.compact, this.props.theme));
        return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsxs("template", { shadowroot: "open", shadowrootmode: "open", shadowrootdelegatesfocus: "true", children: [jsxRuntime.jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsxs("button", { ...utilsEntry.getButtonAriaAttributes(this.props.disabled, this.props.loading, this.props.aria), className: "root", type: this.props.type, name: this.props.name, value: this.props.value, "aria-describedby": this.props.loading ? loadingMessage.loadingId : undefined, children: [this.props.loading && (jsxRuntime.jsx(spinner_wrapper.PSpinner, { className: "spinner", size: "inherit", theme: this.props.theme, "aria-hidden": "true" })), utilsEntry.hasVisibleIcon(this.props.icon, this.props.iconSource) && (jsxRuntime.jsx(icon_wrapper.PIcon, { className: "icon", size: "inherit", name: this.props.iconSource ? undefined : this.props.icon, source: this.props.iconSource, color: this.props.disabled ? (this.props.variant === 'primary' ? 'contrast-high' : 'state-disabled') : 'primary', theme: this.props.theme, "aria-hidden": "true" })), jsxRuntime.jsx("span", { className: "label", children: jsxRuntime.jsx("slot", {}) })] }), jsxRuntime.jsx(loadingMessage.LoadingMessage, { loading: this.props.loading, initialLoading: this.props.initialLoading })] })] }), this.props.children] }));
    }
}

exports.DSRButton = DSRButton;
