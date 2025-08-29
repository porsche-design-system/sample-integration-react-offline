"use client";
import { jsx } from 'react/jsx-runtime';
import { forwardRef, useRef } from 'react';
import { useEventCallback, usePrefix, useTheme, useBrowserLayoutEffect, useMergedClass } from '../../hooks.mjs';
import { syncRef } from '../../utils.mjs';
import { DSRInputDate } from '../dsr-components/input-date.mjs';

const PInputDate = /*#__PURE__*/ forwardRef(({ autoComplete, compact = false, description = '', disabled = false, form, hideLabel = false, label = '', loading = false, max, message = '', min, name, onBlur, onChange, onInput, readOnly = false, required = false, state = 'none', step = 1, theme, value = '', className, children, ...rest }, ref) => {
    const elementRef = useRef(undefined);
    useEventCallback(elementRef, 'blur', onBlur);
    useEventCallback(elementRef, 'change', onChange);
    useEventCallback(elementRef, 'input', onInput);
    const WebComponentTag = usePrefix('p-input-date');
    const propsToSync = [autoComplete, compact, description, disabled, form, hideLabel, label, loading, max, message, min, name, readOnly, required, state, step, theme || useTheme(), value];
    useBrowserLayoutEffect(() => {
        const { current } = elementRef;
        ['autoComplete', 'compact', 'description', 'disabled', 'form', 'hideLabel', 'label', 'loading', 'max', 'message', 'min', 'name', 'readOnly', 'required', 'state', 'step', 'theme', 'value'].forEach((propName, i) => (current[propName] = propsToSync[i]));
    }, propsToSync);
    const props = {
        ...rest,
        // @ts-ignore
        ...(!process.browser
            ? {
                children: (jsx(DSRInputDate, { autoComplete, compact, description, disabled, form, hideLabel, label, loading, max, message, min, name, readOnly, required, state, step, theme: theme || useTheme(), value, children })),
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

export { PInputDate };
