"use client";
import { jsx } from 'react/jsx-runtime';
import { forwardRef, useRef } from 'react';
import { useEventCallback, usePrefix, useTheme, useBrowserLayoutEffect, useMergedClass } from '../../hooks.mjs';
import { syncRef } from '../../utils.mjs';
import { DSRInputText } from '../dsr-components/input-text.mjs';

const PInputText = /*#__PURE__*/ forwardRef(({ autoComplete, compact = false, counter = false, description = '', disabled = false, form, hideLabel = false, label = '', loading = false, maxLength, message = '', minLength, name, onBlur, onChange, onInput, placeholder = '', readOnly = false, required = false, spellCheck, state = 'none', theme, value = '', className, children, ...rest }, ref) => {
    const elementRef = useRef(undefined);
    useEventCallback(elementRef, 'blur', onBlur);
    useEventCallback(elementRef, 'change', onChange);
    useEventCallback(elementRef, 'input', onInput);
    const WebComponentTag = usePrefix('p-input-text');
    const propsToSync = [autoComplete, compact, counter, description, disabled, form, hideLabel, label, loading, maxLength, message, minLength, name, placeholder, readOnly, required, spellCheck, state, theme || useTheme(), value];
    useBrowserLayoutEffect(() => {
        const { current } = elementRef;
        ['autoComplete', 'compact', 'counter', 'description', 'disabled', 'form', 'hideLabel', 'label', 'loading', 'maxLength', 'message', 'minLength', 'name', 'placeholder', 'readOnly', 'required', 'spellCheck', 'state', 'theme', 'value'].forEach((propName, i) => (current[propName] = propsToSync[i]));
    }, propsToSync);
    const props = {
        ...rest,
        // @ts-ignore
        ...(!process.browser
            ? {
                children: (jsx(DSRInputText, { autoComplete, compact, counter, description, disabled, form, hideLabel, label, loading, maxLength, message, minLength, name, placeholder, readOnly, required, spellCheck, state, theme: theme || useTheme(), value, children })),
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

export { PInputText };
