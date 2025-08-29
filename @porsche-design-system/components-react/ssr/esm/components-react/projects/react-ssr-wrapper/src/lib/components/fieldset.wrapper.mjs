"use client";
import { jsx } from 'react/jsx-runtime';
import { forwardRef, useRef } from 'react';
import { usePrefix, useTheme, useBrowserLayoutEffect, useMergedClass } from '../../hooks.mjs';
import { syncRef } from '../../utils.mjs';
import { DSRFieldset } from '../dsr-components/fieldset.mjs';

const PFieldset = /*#__PURE__*/ forwardRef(({ aria, label = '', labelSize = 'medium', message = '', required = false, state = 'none', theme, className, children, ...rest }, ref) => {
    const elementRef = useRef(undefined);
    const WebComponentTag = usePrefix('p-fieldset');
    const propsToSync = [aria, label, labelSize, message, required, state, theme || useTheme()];
    useBrowserLayoutEffect(() => {
        const { current } = elementRef;
        ['aria', 'label', 'labelSize', 'message', 'required', 'state', 'theme'].forEach((propName, i) => (current[propName] = propsToSync[i]));
    }, propsToSync);
    const props = {
        ...rest,
        // @ts-ignore
        ...(!process.browser
            ? {
                children: (jsx(DSRFieldset, { aria, label, labelSize, message, required, state, theme: theme || useTheme(), children })),
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

export { PFieldset };
