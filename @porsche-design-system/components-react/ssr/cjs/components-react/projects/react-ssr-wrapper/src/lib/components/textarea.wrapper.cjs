"use client";
'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
var hooks = require('../../hooks.cjs');
var utils = require('../../utils.cjs');
var textarea = require('../dsr-components/textarea.cjs');

const PTextarea = /*#__PURE__*/ react.forwardRef(({ autoComplete, counter = false, description = '', disabled = false, form, hideLabel = false, label = '', maxLength, message = '', minLength, name, onBlur, onChange, onInput, placeholder = '', readOnly = false, required = false, resize = 'vertical', rows = 7, spellCheck, state = 'none', theme, value = '', wrap = 'soft', className, children, ...rest }, ref) => {
    const elementRef = react.useRef(undefined);
    hooks.useEventCallback(elementRef, 'blur', onBlur);
    hooks.useEventCallback(elementRef, 'change', onChange);
    hooks.useEventCallback(elementRef, 'input', onInput);
    const WebComponentTag = hooks.usePrefix('p-textarea');
    const propsToSync = [autoComplete, counter, description, disabled, form, hideLabel, label, maxLength, message, minLength, name, placeholder, readOnly, required, resize, rows, spellCheck, state, theme || hooks.useTheme(), value, wrap];
    hooks.useBrowserLayoutEffect(() => {
        const { current } = elementRef;
        ['autoComplete', 'counter', 'description', 'disabled', 'form', 'hideLabel', 'label', 'maxLength', 'message', 'minLength', 'name', 'placeholder', 'readOnly', 'required', 'resize', 'rows', 'spellCheck', 'state', 'theme', 'value', 'wrap'].forEach((propName, i) => (current[propName] = propsToSync[i]));
    }, propsToSync);
    const props = {
        ...rest,
        // @ts-ignore
        ...(!process.browser
            ? {
                children: (jsxRuntime.jsx(textarea.DSRTextarea, { autoComplete, counter, description, disabled, form, hideLabel, label, maxLength, message, minLength, name, placeholder, readOnly, required, resize, rows, spellCheck, state, theme: theme || hooks.useTheme(), value, wrap, children })),
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

exports.PTextarea = PTextarea;
