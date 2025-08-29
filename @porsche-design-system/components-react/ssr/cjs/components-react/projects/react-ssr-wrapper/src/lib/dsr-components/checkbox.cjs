'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
require('../../provider.cjs');
var splitChildren = require('../../splitChildren.cjs');
var minifyCss = require('../../minifyCss.cjs');
var stylesEntry = require('../../../../../../components/dist/styles/esm/styles-entry.cjs');
var utilsEntry = require('../../../../../../components/dist/utils/esm/utils-entry.cjs');
var loadingMessage = require('./loading-message.cjs');
var label = require('./label.cjs');
var stateMessage = require('./state-message.cjs');
var spinner_wrapper = require('../components/spinner.wrapper.cjs');

/**
 * @slot {"name": "label", "description": "Shows a label. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 * @slot {"name": "message", "description": "Shows a state message. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 */
class DSRCheckbox extends react.Component {
    host;
    // The "name" property is reflected as an attribute to ensure compatibility with native form submission.
    // In the React wrapper, all props are synced as properties on the element ref, so reflecting "name" as an attribute ensures it is properly handled in the form submission process.
    internals;
    initialLoading = false;
    defaultChecked;
    checkboxInputElement;
    formResetCallback() {
        this.props.internals?.setFormValue(this.props.defaultChecked ? this.props.value : undefined);
    }
    formDisabledCallback() {
    }
    formStateRestoreCallback() {
    }
    render() {
        const { namedSlotChildren} = splitChildren.splitChildren(this.props.children);
        const id = 'checkbox';
        const style = minifyCss.minifyCss(stylesEntry.getCheckboxCss(this.props.hideLabel, this.props.state, this.props.disabled, this.props.loading, this.props.compact, this.props.theme));
        return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsxs("template", { shadowroot: "open", shadowrootmode: "open", shadowrootdelegatesfocus: "true", children: [jsxRuntime.jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsxRuntime.jsxs("div", { className: "root", children: [jsxRuntime.jsx(label.Label, { hasLabel: this.props.label || namedSlotChildren.filter(({ props: { slot } }) => slot === 'label').length > 0, hasDescription: this.props.description || namedSlotChildren.filter(({ props: { slot } }) => slot === 'description').length > 0, host: null, htmlFor: id, label: this.props.label, isLoading: this.props.loading, isDisabled: this.props.disabled, isRequired: this.props.required }), jsxRuntime.jsxs("div", { className: "wrapper", children: [jsxRuntime.jsx("input", { type: "checkbox", id: id, "aria-describedby": `${utilsEntry.descriptionId} ${stateMessage.messageId}`, "aria-invalid": this.props.state === 'error' ? 'true' : null, "aria-disabled": this.props.loading || this.props.disabled ? 'true' : null, checked: this.props.checked, form: this.props.form, value: this.props.value, name: this.props.name, onBlur: this.props.onBlur, required: this.props.required, disabled: this.props.disabled }), this.props.loading && (jsxRuntime.jsx(spinner_wrapper.PSpinner, { className: "spinner", size: "inherit", theme: this.props.theme, "aria-hidden": "true" }))] }), jsxRuntime.jsx(stateMessage.StateMessage, { hasMessage: (this.props.message || namedSlotChildren.filter(({ props: { slot } }) => slot === 'message').length > 0) && ['success', 'error'].includes(this.props.state), state: this.props.state, message: this.props.message, theme: this.props.theme, host: null }), jsxRuntime.jsx(loadingMessage.LoadingMessage, { loading: this.props.loading, initialLoading: this.props.initialLoading })] })] }), this.props.children] }));
    }
}

exports.DSRCheckbox = DSRCheckbox;
