'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
require('../../provider.cjs');
var splitChildren = require('../../splitChildren.cjs');
var minifyCss = require('../../minifyCss.cjs');
var stylesEntry = require('../../../../../../components/dist/styles/esm/styles-entry.cjs');
var buttonPure_wrapper = require('../components/button-pure.wrapper.cjs');
var inputBase = require('./input-base.cjs');

/**
 * @slot {"name": "label", "description": "Shows a label. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed."}
 * @slot {"name": "description", "description": "Shows a description. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed."}
 * @slot {"name": "message", "description": "Shows a state message. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed."}
 * @slot {"name": "start", "description": "Shows content at the start of the input (e.g. unit prefix)."}
 * @slot {"name": "end", "description": "Shows content at the end of the input (e.g. toggle button, unit suffix)."}
 */
class DSRInputPassword extends react.Component {
    host;
    // The "name" property is reflected as an attribute to ensure compatibility with native form submission.
    // In the React wrapper, all props are synced as properties on the element ref, so reflecting "name" as an attribute ensures it is properly handled in the form submission process.
    internals;
    showPassword = false;
    initialLoading = false;
    inputElement;
    defaultValue;
    formResetCallback() {
        // triggers value watcher
    }
    formDisabledCallback() {
    }
    formStateRestoreCallback() {
    }
    render() {
        splitChildren.splitChildren(this.props.children);
        const style = minifyCss.minifyCss(stylesEntry.getInputPasswordCss(this.props.disabled, this.props.loading, this.props.hideLabel, this.props.state, this.props.toggle, this.props.compact, this.props.readOnly, this.props.theme));
        return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsxs("template", { shadowroot: "open", shadowrootmode: "open", shadowrootdelegatesfocus: "true", children: [jsxRuntime.jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsxRuntime.jsx(inputBase.InputBase, { children: this.props.children, host: null, label: this.props.label, description: this.props.description, id: "input-password", name: this.props.name, form: this.props.form, type: this.props.showPassword ? 'text' : 'password', required: this.props.required, placeholder: this.props.placeholder, maxLength: this.props.maxLength, minLength: this.props.minLength, value: this.props.value, readOnly: this.props.readOnly, autoComplete: this.props.autoComplete, disabled: this.props.disabled, state: this.props.state, message: this.props.message, theme: this.props.theme, loading: this.props.loading, initialLoading: this.props.initialLoading, end: this.props.toggle && (jsxRuntime.jsx(buttonPure_wrapper.PButtonPure, { hideLabel: true, theme: this.props.theme, className: "button", type: "button", icon: this.props.showPassword ? 'view-off' : 'view', disabled: this.props.disabled, aria: { 'aria-pressed': this.props.showPassword ? 'true' : 'false' }, children: "Toggle password visibility" })) })] }), this.props.children] }));
    }
}

exports.DSRInputPassword = DSRInputPassword;
