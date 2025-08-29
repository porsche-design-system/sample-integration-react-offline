"use client";
'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
var hooks = require('../../hooks.cjs');
var utils = require('../../utils.cjs');
var textareaWrapper = require('../dsr-components/textarea-wrapper.cjs');

/** @deprecated since v3.29.0, will be removed with next major release. Please use `p-textarea` instead. */
const PTextareaWrapper = /*#__PURE__*/ react.forwardRef(({ description = '', hideLabel = false, label = '', message = '', showCharacterCount, showCounter = true, state = 'none', theme, className, children, ...rest }, ref) => {
    const elementRef = react.useRef(undefined);
    const WebComponentTag = hooks.usePrefix('p-textarea-wrapper');
    const propsToSync = [description, hideLabel, label, message, showCharacterCount, showCounter, state, theme || hooks.useTheme()];
    hooks.useBrowserLayoutEffect(() => {
        const { current } = elementRef;
        ['description', 'hideLabel', 'label', 'message', 'showCharacterCount', 'showCounter', 'state', 'theme'].forEach((propName, i) => (current[propName] = propsToSync[i]));
    }, propsToSync);
    const props = {
        ...rest,
        // @ts-ignore
        ...(!process.browser
            ? {
                children: (jsxRuntime.jsx(textareaWrapper.DSRTextareaWrapper, { description, hideLabel, label, message, showCharacterCount, showCounter, state, theme: theme || hooks.useTheme(), children })),
            }
            : {
                children,
                suppressHydrationWarning: true,
            }),
        'data-ssr': '',
        class: hooks.useMergedClass(elementRef, className),
        ref: utils.syncRef(elementRef, ref)
    };
    // @ts-ignore
    return jsxRuntime.jsx(WebComponentTag, { ...props });
});

exports.PTextareaWrapper = PTextareaWrapper;
