'use strict';

var jsxRuntime = require('react/jsx-runtime');
var splitChildren = require('../../splitChildren.cjs');
require('react');
require('../../provider.cjs');
var utilsEntry = require('../../../../../../components/dist/utils/esm/utils-entry.cjs');
var loadingMessage = require('./loading-message.cjs');
var label = require('./label.cjs');
var stateMessage = require('./state-message.cjs');
var spinner_wrapper = require('../components/spinner.wrapper.cjs');

const InputBase = ({ children, 
// host,
id, label: label$1, description, loading, initialLoading, required, disabled, state, message, theme, readOnly, type, form, placeholder, maxLength, minLength, max, min, value, step, spellCheck, autoComplete, pattern, multiple, name, 
// onInput,
// onWheel,
// onChange,
// onBlur,
// refElement,
start, end, }) => {
    const { namedSlotChildren } = splitChildren.splitChildren(children);
    return (jsxRuntime.jsxs("div", { className: "root", children: [jsxRuntime.jsx(label.Label, { hasLabel: !!label$1 || namedSlotChildren.filter(({ props: { slot } }) => slot === 'label').length > 0, hasDescription: !!description || namedSlotChildren.filter(({ props: { slot } }) => slot === 'description').length > 0, host: null, label: label$1, description: description, htmlFor: id, isRequired: required, isLoading: loading, isDisabled: disabled }), jsxRuntime.jsxs("div", { className: "wrapper", children: [jsxRuntime.jsx("slot", { name: "start" }), start, jsxRuntime.jsx("input", { "aria-describedby": loading ? loadingMessage.loadingId : `${utilsEntry.descriptionId} ${stateMessage.messageId}`, "aria-invalid": state === 'error' ? 'true' : null, "aria-disabled": disabled || loading ? 'true' : null, "aria-readonly": readOnly ? 'true' : null, id: id, name: name, form: form, type: type, required: required, placeholder: placeholder, maxLength: maxLength, minLength: minLength, spellCheck: spellCheck, max: max, min: min, step: step, defaultValue: value, readOnly: readOnly, autoComplete: autoComplete, disabled: disabled, pattern: pattern, multiple: multiple }), end, jsxRuntime.jsx("slot", { name: "end" }), loading && jsxRuntime.jsx(spinner_wrapper.PSpinner, { className: "spinner", size: "inherit", theme: theme, "aria-hidden": "true" })] }), jsxRuntime.jsx(stateMessage.StateMessage, { hasMessage: (message || namedSlotChildren.filter(({ props: { slot } }) => slot === 'message').length > 0) && ['success', 'error'].includes(state), state: state, message: message, theme: theme, host: null }), jsxRuntime.jsx(loadingMessage.LoadingMessage, { loading: loading, initialLoading: initialLoading })] }));
};

exports.InputBase = InputBase;
