"use client";
'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
var hooks = require('../../hooks.cjs');
var utils = require('../../utils.cjs');

/** @deprecated since v3.29.0, will be removed with next major release. Please use `p-checkbox` instead. */
const PCheckboxWrapper = /*#__PURE__*/ react.forwardRef(({ hideLabel = false, label = '', loading = false, message = '', state = 'none', theme, className, ...rest }, ref) => {
    const elementRef = react.useRef(undefined);
    const WebComponentTag = hooks.usePrefix('p-checkbox-wrapper');
    const propsToSync = [hideLabel, label, loading, message, state, theme || hooks.useTheme()];
    hooks.useBrowserLayoutEffect(() => {
        const { current } = elementRef;
        ['hideLabel', 'label', 'loading', 'message', 'state', 'theme'].forEach((propName, i) => (current[propName] = propsToSync[i]));
    }, propsToSync);
    const props = {
        ...rest,
        class: hooks.useMergedClass(elementRef, className),
        ref: utils.syncRef(elementRef, ref)
    };
    // @ts-ignore
    return jsxRuntime.jsx(WebComponentTag, { ...props });
});

exports.PCheckboxWrapper = PCheckboxWrapper;
