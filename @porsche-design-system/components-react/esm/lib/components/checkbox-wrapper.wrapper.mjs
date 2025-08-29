"use client";
import { jsx } from 'react/jsx-runtime';
import { forwardRef, useRef } from 'react';
import { usePrefix, useTheme, useBrowserLayoutEffect, useMergedClass } from '../../hooks.mjs';
import { syncRef } from '../../utils.mjs';

/** @deprecated since v3.29.0, will be removed with next major release. Please use `p-checkbox` instead. */
const PCheckboxWrapper = /*#__PURE__*/ forwardRef(({ hideLabel = false, label = '', loading = false, message = '', state = 'none', theme, className, ...rest }, ref) => {
    const elementRef = useRef(undefined);
    const WebComponentTag = usePrefix('p-checkbox-wrapper');
    const propsToSync = [hideLabel, label, loading, message, state, theme || useTheme()];
    useBrowserLayoutEffect(() => {
        const { current } = elementRef;
        ['hideLabel', 'label', 'loading', 'message', 'state', 'theme'].forEach((propName, i) => (current[propName] = propsToSync[i]));
    }, propsToSync);
    const props = {
        ...rest,
        class: useMergedClass(elementRef, className),
        ref: syncRef(elementRef, ref)
    };
    // @ts-ignore
    return jsx(WebComponentTag, { ...props });
});

export { PCheckboxWrapper };
