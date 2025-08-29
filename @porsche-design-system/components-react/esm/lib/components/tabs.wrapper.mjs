"use client";
import { jsx } from 'react/jsx-runtime';
import { forwardRef, useRef } from 'react';
import { useEventCallback, usePrefix, useTheme, useBrowserLayoutEffect, useMergedClass } from '../../hooks.mjs';
import { syncRef } from '../../utils.mjs';

const PTabs = /*#__PURE__*/ forwardRef(({ activeTabIndex = 0, gradientColor, gradientColorScheme, onTabChange, onUpdate, size = 'small', theme, weight = 'regular', className, ...rest }, ref) => {
    const elementRef = useRef(undefined);
    useEventCallback(elementRef, 'tabChange', onTabChange);
    useEventCallback(elementRef, 'update', onUpdate);
    const WebComponentTag = usePrefix('p-tabs');
    const propsToSync = [activeTabIndex, gradientColor, gradientColorScheme, size, theme || useTheme(), weight];
    useBrowserLayoutEffect(() => {
        const { current } = elementRef;
        ['activeTabIndex', 'gradientColor', 'gradientColorScheme', 'size', 'theme', 'weight'].forEach((propName, i) => (current[propName] = propsToSync[i]));
    }, propsToSync);
    const props = {
        ...rest,
        class: useMergedClass(elementRef, className),
        ref: syncRef(elementRef, ref)
    };
    // @ts-ignore
    return jsx(WebComponentTag, { ...props });
});

export { PTabs };
