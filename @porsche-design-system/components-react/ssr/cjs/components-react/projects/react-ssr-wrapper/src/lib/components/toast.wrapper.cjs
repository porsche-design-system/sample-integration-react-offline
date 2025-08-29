"use client";
'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
var hooks = require('../../hooks.cjs');
var utils = require('../../utils.cjs');
var toast = require('../dsr-components/toast.cjs');

const PToast = /*#__PURE__*/ react.forwardRef(({ theme, className, ...rest }, ref) => {
    const elementRef = react.useRef(undefined);
    const WebComponentTag = hooks.usePrefix('p-toast');
    const themeValue = hooks.useTheme();
    hooks.useBrowserLayoutEffect(() => {
        elementRef.current.theme = theme || themeValue;
    }, [theme, themeValue]);
    const props = {
        ...rest,
        // @ts-ignore
        ...(!process.browser
            ? {
                ...{ "role": "status" },
                children: (jsxRuntime.jsx(toast.DSRToast, { theme: theme || hooks.useTheme() })),
            }
            : {
                suppressHydrationWarning: true,
            }),
        'data-ssr': '',
        class: hooks.useMergedClass(elementRef, className),
        ref: utils.syncRef(elementRef, ref)
    };
    // @ts-ignore
    return jsxRuntime.jsx(WebComponentTag, { ...props });
});

exports.PToast = PToast;
