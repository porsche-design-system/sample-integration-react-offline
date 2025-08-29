"use client";
'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
var hooks = require('../../hooks.cjs');
var utils = require('../../utils.cjs');
var inputTel = require('../dsr-components/input-tel.cjs');

const PInputTel = /*#__PURE__*/ react.forwardRef(({ autoComplete, compact = false, description = '', disabled = false, form, hideLabel = false, indicator = false, label = '', loading = false, maxLength, message = '', minLength, name, onBlur, onChange, onInput, pattern, placeholder = '', readOnly = false, required = false, state = 'none', theme, value = '', className, children, ...rest }, ref) => {
    const elementRef = react.useRef(undefined);
    hooks.useEventCallback(elementRef, 'blur', onBlur);
    hooks.useEventCallback(elementRef, 'change', onChange);
    hooks.useEventCallback(elementRef, 'input', onInput);
    const WebComponentTag = hooks.usePrefix('p-input-tel');
    const propsToSync = [autoComplete, compact, description, disabled, form, hideLabel, indicator, label, loading, maxLength, message, minLength, name, pattern, placeholder, readOnly, required, state, theme || hooks.useTheme(), value];
    hooks.useBrowserLayoutEffect(() => {
        const { current } = elementRef;
        ['autoComplete', 'compact', 'description', 'disabled', 'form', 'hideLabel', 'indicator', 'label', 'loading', 'maxLength', 'message', 'minLength', 'name', 'pattern', 'placeholder', 'readOnly', 'required', 'state', 'theme', 'value'].forEach((propName, i) => (current[propName] = propsToSync[i]));
    }, propsToSync);
    const props = {
        ...rest,
        // @ts-ignore
        ...(!process.browser
            ? {
                children: (jsxRuntime.jsx(inputTel.DSRInputTel, { autoComplete, compact, description, disabled, form, hideLabel, indicator, label, loading, maxLength, message, minLength, name, pattern, placeholder, readOnly, required, state, theme: theme || hooks.useTheme(), value, children })),
            }
            : {
                children,
                suppressHydrationWarning: true,
            }),
        'data-ssr': '',
        class: hooks.useMergedClass(elementRef, className),
        ref: utils.syncRef(elementRef, ref)
    };
    // @ts-ignore
    return jsxRuntime.jsx(WebComponentTag, { ...props });
});

exports.PInputTel = PInputTel;
