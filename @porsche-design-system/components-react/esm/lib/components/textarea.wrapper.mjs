"use client";
import { jsx } from 'react/jsx-runtime';
import { forwardRef, useRef } from 'react';
import { useEventCallback, usePrefix, useTheme, useBrowserLayoutEffect, useMergedClass } from '../../hooks.mjs';
import { syncRef } from '../../utils.mjs';

const PTextarea = /*#__PURE__*/ forwardRef(({ autoComplete, counter = false, description = '', disabled = false, form, hideLabel = false, label = '', maxLength, message = '', minLength, name, onBlur, onChange, onInput, placeholder = '', readOnly = false, required = false, resize = 'vertical', rows = 7, spellCheck, state = 'none', theme, value = '', wrap = 'soft', className, ...rest }, ref) => {
    const elementRef = useRef(undefined);
    useEventCallback(elementRef, 'blur', onBlur);
    useEventCallback(elementRef, 'change', onChange);
    useEventCallback(elementRef, 'input', onInput);
    const WebComponentTag = usePrefix('p-textarea');
    const propsToSync = [autoComplete, counter, description, disabled, form, hideLabel, label, maxLength, message, minLength, name, placeholder, readOnly, required, resize, rows, spellCheck, state, theme || useTheme(), value, wrap];
    useBrowserLayoutEffect(() => {
        const { current } = elementRef;
        ['autoComplete', 'counter', 'description', 'disabled', 'form', 'hideLabel', 'label', 'maxLength', 'message', 'minLength', 'name', 'placeholder', 'readOnly', 'required', 'resize', 'rows', 'spellCheck', 'state', 'theme', 'value', 'wrap'].forEach((propName, i) => (current[propName] = propsToSync[i]));
    }, propsToSync);
    const props = {
        ...rest,
        class: useMergedClass(elementRef, className),
        ref: syncRef(elementRef, ref)
    };
    // @ts-ignore
    return jsx(WebComponentTag, { ...props });
});

export { PTextarea };
