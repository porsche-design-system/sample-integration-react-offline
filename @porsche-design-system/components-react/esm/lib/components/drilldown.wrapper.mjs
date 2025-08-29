"use client";
import { jsx } from 'react/jsx-runtime';
import { forwardRef, useRef } from 'react';
import { useEventCallback, usePrefix, useTheme, useBrowserLayoutEffect, useMergedClass } from '../../hooks.mjs';
import { syncRef } from '../../utils.mjs';

const PDrilldown = /*#__PURE__*/ forwardRef(({ activeIdentifier, aria, onDismiss, onUpdate, open = false, theme, className, ...rest }, ref) => {
    const elementRef = useRef(undefined);
    useEventCallback(elementRef, 'dismiss', onDismiss);
    useEventCallback(elementRef, 'update', onUpdate);
    const WebComponentTag = usePrefix('p-drilldown');
    const propsToSync = [activeIdentifier, aria, open, theme || useTheme()];
    useBrowserLayoutEffect(() => {
        const { current } = elementRef;
        ['activeIdentifier', 'aria', 'open', 'theme'].forEach((propName, i) => (current[propName] = propsToSync[i]));
    }, propsToSync);
    const props = {
        ...rest,
        class: useMergedClass(elementRef, className),
        ref: syncRef(elementRef, ref)
    };
    // @ts-ignore
    return jsx(WebComponentTag, { ...props });
});

export { PDrilldown };
