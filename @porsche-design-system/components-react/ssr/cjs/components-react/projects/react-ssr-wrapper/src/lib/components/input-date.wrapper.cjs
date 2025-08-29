"use client";
'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
var hooks = require('../../hooks.cjs');
var utils = require('../../utils.cjs');
var inputDate = require('../dsr-components/input-date.cjs');

const PInputDate = /*#__PURE__*/ react.forwardRef(({ autoComplete, compact = false, description = '', disabled = false, form, hideLabel = false, label = '', loading = false, max, message = '', min, name, onBlur, onChange, onInput, readOnly = false, required = false, state = 'none', step = 1, theme, value = '', className, children, ...rest }, ref) => {
    const elementRef = react.useRef(undefined);
    hooks.useEventCallback(elementRef, 'blur', onBlur);
    hooks.useEventCallback(elementRef, 'change', onChange);
    hooks.useEventCallback(elementRef, 'input', onInput);
    const WebComponentTag = hooks.usePrefix('p-input-date');
    const propsToSync = [autoComplete, compact, description, disabled, form, hideLabel, label, loading, max, message, min, name, readOnly, required, state, step, theme || hooks.useTheme(), value];
    hooks.useBrowserLayoutEffect(() => {
        const { current } = elementRef;
        ['autoComplete', 'compact', 'description', 'disabled', 'form', 'hideLabel', 'label', 'loading', 'max', 'message', 'min', 'name', 'readOnly', 'required', 'state', 'step', 'theme', 'value'].forEach((propName, i) => (current[propName] = propsToSync[i]));
    }, propsToSync);
    const props = {
        ...rest,
        // @ts-ignore
        ...(!process.browser
            ? {
                children: (jsxRuntime.jsx(inputDate.DSRInputDate, { autoComplete, compact, description, disabled, form, hideLabel, label, loading, max, message, min, name, readOnly, required, state, step, theme: theme || hooks.useTheme(), value, children })),
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

exports.PInputDate = PInputDate;
