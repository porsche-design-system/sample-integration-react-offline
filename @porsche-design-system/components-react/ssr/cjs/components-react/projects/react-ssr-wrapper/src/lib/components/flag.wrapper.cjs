"use client";
'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
var hooks = require('../../hooks.cjs');
var utils = require('../../utils.cjs');
var flag = require('../dsr-components/flag.cjs');

const PFlag = /*#__PURE__*/ react.forwardRef(({ aria, name = 'de', size = 'small', className, ...rest }, ref) => {
    const elementRef = react.useRef(undefined);
    const WebComponentTag = hooks.usePrefix('p-flag');
    const propsToSync = [aria, name, size];
    hooks.useBrowserLayoutEffect(() => {
        const { current } = elementRef;
        ['aria', 'name', 'size'].forEach((propName, i) => (current[propName] = propsToSync[i]));
    }, propsToSync);
    const props = {
        ...rest,
        // @ts-ignore
        ...(!process.browser
            ? {
                children: (jsxRuntime.jsx(flag.DSRFlag, { aria, name, size })),
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

exports.PFlag = PFlag;
