"use client";
import { jsx } from 'react/jsx-runtime';
import { forwardRef, useRef } from 'react';
import { useEventCallback, usePrefix, useTheme, useBrowserLayoutEffect, useMergedClass } from '../../hooks.mjs';
import { syncRef } from '../../utils.mjs';
import { DSRInputSearch } from '../dsr-components/input-search.mjs';

const PInputSearch = /*#__PURE__*/ forwardRef(({ autoComplete, clear = false, compact = false, description = '', disabled = false, form, hideLabel = false, indicator = false, label = '', loading = false, message = '', name, onBlur, onChange, onInput, placeholder = '', readOnly = false, required = false, state = 'none', theme, value = '', className, children, ...rest }, ref) => {
    const elementRef = useRef(undefined);
    useEventCallback(elementRef, 'blur', onBlur);
    useEventCallback(elementRef, 'change', onChange);
    useEventCallback(elementRef, 'input', onInput);
    const WebComponentTag = usePrefix('p-input-search');
    const propsToSync = [autoComplete, clear, compact, description, disabled, form, hideLabel, indicator, label, loading, message, name, placeholder, readOnly, required, state, theme || useTheme(), value];
    useBrowserLayoutEffect(() => {
        const { current } = elementRef;
        ['autoComplete', 'clear', 'compact', 'description', 'disabled', 'form', 'hideLabel', 'indicator', 'label', 'loading', 'message', 'name', 'placeholder', 'readOnly', 'required', 'state', 'theme', 'value'].forEach((propName, i) => (current[propName] = propsToSync[i]));
    }, propsToSync);
    const props = {
        ...rest,
        // @ts-ignore
        ...(!process.browser
            ? {
                children: (jsx(DSRInputSearch, { autoComplete, clear, compact, description, disabled, form, hideLabel, indicator, label, loading, message, name, placeholder, readOnly, required, state, theme: theme || useTheme(), value, children })),
            }
            : {
                children,
                suppressHydrationWarning: true,
            }),
        'data-ssr': '',
        class: useMergedClass(elementRef, className),
        ref: syncRef(elementRef, ref)
    };
    // @ts-ignore
    return jsx(WebComponentTag, { ...props });
});

export { PInputSearch };
