"use client";
import { jsx } from 'react/jsx-runtime';
import { forwardRef, useRef } from 'react';
import { usePrefix, useTheme, useBrowserLayoutEffect, useMergedClass } from '../../hooks.mjs';
import { syncRef } from '../../utils.mjs';
import { DSRScroller } from '../dsr-components/scroller.mjs';

const PScroller = /*#__PURE__*/ forwardRef(({ alignScrollIndicator = 'center', aria, gradientColor, gradientColorScheme, scrollIndicatorPosition, scrollToPosition, scrollbar = false, theme, className, children, ...rest }, ref) => {
    const elementRef = useRef(undefined);
    const WebComponentTag = usePrefix('p-scroller');
    const propsToSync = [alignScrollIndicator, aria, gradientColor, gradientColorScheme, scrollIndicatorPosition, scrollToPosition, scrollbar, theme || useTheme()];
    useBrowserLayoutEffect(() => {
        const { current } = elementRef;
        ['alignScrollIndicator', 'aria', 'gradientColor', 'gradientColorScheme', 'scrollIndicatorPosition', 'scrollToPosition', 'scrollbar', 'theme'].forEach((propName, i) => (current[propName] = propsToSync[i]));
    }, propsToSync);
    const props = {
        ...rest,
        // @ts-ignore
        ...(!process.browser
            ? {
                children: (jsx(DSRScroller, { alignScrollIndicator, aria, gradientColor, gradientColorScheme, scrollIndicatorPosition, scrollToPosition, scrollbar, theme: theme || useTheme(), children })),
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

export { PScroller };
