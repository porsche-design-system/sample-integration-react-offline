"use client";
'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
var hooks = require('../../hooks.cjs');
var utils = require('../../utils.cjs');

const PInputSearch = /*#__PURE__*/ react.forwardRef(({ autoComplete, clear = false, compact = false, description = '', disabled = false, form, hideLabel = false, indicator = false, label = '', loading = false, message = '', name, onBlur, onChange, onInput, placeholder = '', readOnly = false, required = false, state = 'none', theme, value = '', className, ...rest }, ref) => {
    const elementRef = react.useRef(undefined);
    hooks.useEventCallback(elementRef, 'blur', onBlur);
    hooks.useEventCallback(elementRef, 'change', onChange);
    hooks.useEventCallback(elementRef, 'input', onInput);
    const WebComponentTag = hooks.usePrefix('p-input-search');
    const propsToSync = [autoComplete, clear, compact, description, disabled, form, hideLabel, indicator, label, loading, message, name, placeholder, readOnly, required, state, theme || hooks.useTheme(), value];
    hooks.useBrowserLayoutEffect(() => {
        const { current } = elementRef;
        ['autoComplete', 'clear', 'compact', 'description', 'disabled', 'form', 'hideLabel', 'indicator', 'label', 'loading', 'message', 'name', 'placeholder', 'readOnly', 'required', 'state', 'theme', 'value'].forEach((propName, i) => (current[propName] = propsToSync[i]));
    }, propsToSync);
    const props = {
        ...rest,
        class: hooks.useMergedClass(elementRef, className),
        ref: utils.syncRef(elementRef, ref)
    };
    // @ts-ignore
    return jsxRuntime.jsx(WebComponentTag, { ...props });
});

exports.PInputSearch = PInputSearch;
