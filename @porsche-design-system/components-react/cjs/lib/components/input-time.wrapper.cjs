"use client";
'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
var hooks = require('../../hooks.cjs');
var utils = require('../../utils.cjs');

const PInputTime = /*#__PURE__*/ react.forwardRef(({ autoComplete, compact = false, description = '', disabled = false, form, hideLabel = false, label = '', loading = false, max, message = '', min, name, onBlur, onChange, onInput, readOnly = false, required = false, state = 'none', step = 60, theme, value = '', className, ...rest }, ref) => {
    const elementRef = react.useRef(undefined);
    hooks.useEventCallback(elementRef, 'blur', onBlur);
    hooks.useEventCallback(elementRef, 'change', onChange);
    hooks.useEventCallback(elementRef, 'input', onInput);
    const WebComponentTag = hooks.usePrefix('p-input-time');
    const propsToSync = [autoComplete, compact, description, disabled, form, hideLabel, label, loading, max, message, min, name, readOnly, required, state, step, theme || hooks.useTheme(), value];
    hooks.useBrowserLayoutEffect(() => {
        const { current } = elementRef;
        ['autoComplete', 'compact', 'description', 'disabled', 'form', 'hideLabel', 'label', 'loading', 'max', 'message', 'min', 'name', 'readOnly', 'required', 'state', 'step', 'theme', 'value'].forEach((propName, i) => (current[propName] = propsToSync[i]));
    }, propsToSync);
    const props = {
        ...rest,
        class: hooks.useMergedClass(elementRef, className),
        ref: utils.syncRef(elementRef, ref)
    };
    // @ts-ignore
    return jsxRuntime.jsx(WebComponentTag, { ...props });
});

exports.PInputTime = PInputTime;
