"use client";
'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
var hooks = require('../../hooks.cjs');
var utils = require('../../utils.cjs');

const PInputText = /*#__PURE__*/ react.forwardRef(({ autoComplete, compact = false, counter = false, description = '', disabled = false, form, hideLabel = false, label = '', loading = false, maxLength, message = '', minLength, name, onBlur, onChange, onInput, placeholder = '', readOnly = false, required = false, spellCheck, state = 'none', theme, value = '', className, ...rest }, ref) => {
    const elementRef = react.useRef(undefined);
    hooks.useEventCallback(elementRef, 'blur', onBlur);
    hooks.useEventCallback(elementRef, 'change', onChange);
    hooks.useEventCallback(elementRef, 'input', onInput);
    const WebComponentTag = hooks.usePrefix('p-input-text');
    const propsToSync = [autoComplete, compact, counter, description, disabled, form, hideLabel, label, loading, maxLength, message, minLength, name, placeholder, readOnly, required, spellCheck, state, theme || hooks.useTheme(), value];
    hooks.useBrowserLayoutEffect(() => {
        const { current } = elementRef;
        ['autoComplete', 'compact', 'counter', 'description', 'disabled', 'form', 'hideLabel', 'label', 'loading', 'maxLength', 'message', 'minLength', 'name', 'placeholder', 'readOnly', 'required', 'spellCheck', 'state', 'theme', 'value'].forEach((propName, i) => (current[propName] = propsToSync[i]));
    }, propsToSync);
    const props = {
        ...rest,
        class: hooks.useMergedClass(elementRef, className),
        ref: utils.syncRef(elementRef, ref)
    };
    // @ts-ignore
    return jsxRuntime.jsx(WebComponentTag, { ...props });
});

exports.PInputText = PInputText;
