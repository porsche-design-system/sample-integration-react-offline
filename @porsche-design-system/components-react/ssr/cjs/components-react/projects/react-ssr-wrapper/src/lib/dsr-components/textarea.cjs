'use strict';

var jsxRuntime = require('react/jsx-runtime');
var splitChildren = require('../../splitChildren.cjs');
var react = require('react');
var minifyCss = require('../../minifyCss.cjs');
var stylesEntry = require('../../../../../../components/dist/styles/esm/styles-entry.cjs');
var utilsEntry = require('../../../../../../components/dist/utils/esm/utils-entry.cjs');
var label = require('./label.cjs');
var stateMessage = require('./state-message.cjs');

/**
 * @slot {"name": "label", "description": "Shows a label. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 * @slot {"name": "description", "description": "Shows a description. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 * @slot {"name": "message", "description": "Shows a state message. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 */
class DSRTextarea extends react.Component {
    host;
    // The "name" property is reflected as an attribute to ensure compatibility with native form submission.
    // In the React wrapper, all props are synced as properties on the element ref, so reflecting "name" as an attribute ensures it is properly handled in the form submission process.
    internals;
    defaultValue;
    textAreaElement;
    formResetCallback() {
        this.props.internals?.setFormValue(this.props.defaultValue);
    }
    formDisabledCallback() {
    }
    formStateRestoreCallback() {
    }
    render() {
        const { namedSlotChildren} = splitChildren.splitChildren(this.props.children);
        const id = 'textarea';
        const style = minifyCss.minifyCss(stylesEntry.getTextareaCss(this.props.disabled, this.props.readOnly, this.props.hideLabel, this.props.state, this.props.counter, this.props.resize, this.props.theme));
        return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsxs("template", { shadowroot: "open", shadowrootmode: "open", shadowrootdelegatesfocus: "true", children: [jsxRuntime.jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsxRuntime.jsxs("div", { className: "root", children: [jsxRuntime.jsx(label.Label, { hasLabel: this.props.label || namedSlotChildren.filter(({ props: { slot } }) => slot === 'label').length > 0, hasDescription: this.props.description || namedSlotChildren.filter(({ props: { slot } }) => slot === 'description').length > 0, host: null, htmlFor: id, label: this.props.label, description: this.props.description, isRequired: this.props.required, isDisabled: this.props.disabled }), jsxRuntime.jsxs("div", { className: "wrapper", children: [jsxRuntime.jsx("textarea", { "aria-describedby": `${utilsEntry.descriptionId} ${stateMessage.messageId}`, "aria-invalid": this.props.state === 'error' ? 'true' : null, id: id, onBlur: this.props.onBlur, name: this.props.name, defaultValue: this.props.value, form: this.props.form, disabled: this.props.disabled, required: this.props.required, placeholder: this.props.placeholder, maxLength: this.props.maxLength, minLength: this.props.minLength, rows: this.props.rows, readOnly: this.props.readOnly, spellCheck: this.props.spellCheck, autoComplete: this.props.autoComplete, wrap: this.props.wrap }), this.props.counter && (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx("span", { className: "sr-only", "aria-live": "polite", children: this.props.maxLength
                                                        ? `You have ${this.props.maxLength - this.props.value.length} out of ${this.props.maxLength} characters left`
                                                        : `${this.props.value.length} characters entered` }), jsxRuntime.jsx("span", { className: "counter", "aria-hidden": "true", children: this.props.maxLength ? `${this.props.value.length}/${this.props.maxLength}` : `${this.props.value.length}` })] }))] }), jsxRuntime.jsx(stateMessage.StateMessage, { hasMessage: (this.props.message || namedSlotChildren.filter(({ props: { slot } }) => slot === 'message').length > 0) && ['success', 'error'].includes(this.props.state), state: this.props.state, message: this.props.message, theme: this.props.theme, host: null })] })] }), this.props.children] }));
    }
}

exports.DSRTextarea = DSRTextarea;
