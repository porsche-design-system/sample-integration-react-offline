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
 * @slot {"name": "description", "description": "Shows a description. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 * @slot {"name": "message", "description": "Shows a state message. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 *
 * @controlled { "props": ["value"], "event": "update", "isInternallyMutated": true }
 */
class DSRPinCode extends react.Component {
    host;
    // The "name" property is reflected as an attribute to ensure compatibility with native form submission.
    // In the React wrapper, all props are synced as properties on the element ref, so reflecting "name" as an attribute ensures it is properly handled in the form submission process.
    internals;
    initialLoading = false;
    defaultValue;
    inputElements = [];
    formResetCallback() {
        this.props.internals?.setFormValue(this.props.defaultValue);
    }
    formDisabledCallback() {
    }
    formStateRestoreCallback() {
    }
    render() {
        const { namedSlotChildren} = splitChildren.splitChildren(this.props.children);
        // reset array of input elements
        this.inputElements = [];
        const currentInputId = 'current-input';
        const style = minifyCss.minifyCss(stylesEntry.getPinCodeCss(this.props.hideLabel, this.props.state, this.props.disabled, this.props.loading, this.props.length, this.props.theme));
        return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsxs("template", { shadowroot: "open", shadowrootmode: "open", shadowrootdelegatesfocus: "true", children: [jsxRuntime.jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsxRuntime.jsxs("div", { className: "root", children: [jsxRuntime.jsx(label.Label, { hasLabel: this.props.label || namedSlotChildren.filter(({ props: { slot } }) => slot === 'label').length > 0, hasDescription: this.props.description || namedSlotChildren.filter(({ props: { slot } }) => slot === 'description').length > 0, host: null, label: this.props.label, description: this.props.description, htmlFor: currentInputId, isRequired: this.props.required, isLoading: this.props.loading, isDisabled: this.props.disabled }), jsxRuntime.jsxs("div", { className: "wrapper", children: [Array.from(new Array(this.props.length), (_, index) => (jsxRuntime.jsx("input", { name: this.props.name, form: this.props.form, ...(utilsEntry.isCurrentInput(index, this.props.value, this.props.length) && { id: currentInputId }), type: this.props.type === 'number' ? 'text' : this.props.type, "aria-label": `${index + 1}-${this.props.length}`, "aria-describedby": `${utilsEntry.labelId} ${utilsEntry.descriptionId} ${stateMessage.messageId}`, "aria-invalid": this.props.state === 'error' ? 'true' : null, "aria-disabled": this.props.loading ? 'true' : null, autoComplete: "one-time-code", pattern: "\\d*", inputMode: "numeric" // get numeric keyboard on mobile
                                            , defaultValue: this.props.value[index] === ' ' ? null : this.props.value[index], disabled: this.props.disabled, required: this.props.required }, index))), this.props.loading && (jsxRuntime.jsx(spinner_wrapper.PSpinner, { className: "spinner", size: "inherit", theme: this.props.theme, "aria-hidden": "true" }))] }), jsxRuntime.jsx(stateMessage.StateMessage, { hasMessage: (this.props.message || namedSlotChildren.filter(({ props: { slot } }) => slot === 'message').length > 0) && ['success', 'error'].includes(this.props.state), state: this.props.state, message: this.props.message, theme: this.props.theme, host: null }), jsxRuntime.jsx(loadingMessage.LoadingMessage, { loading: this.props.loading, initialLoading: this.props.initialLoading })] })] }), this.props.children] }));
    }
}

exports.DSRPinCode = DSRPinCode;
