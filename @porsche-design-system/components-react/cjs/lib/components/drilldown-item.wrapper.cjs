"use client";
'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
var hooks = require('../../hooks.cjs');
var utils = require('../../utils.cjs');

const PDrilldownItem = /*#__PURE__*/ react.forwardRef(({ cascade = false, identifier, label, primary = false, secondary = false, className, ...rest }, ref) => {
    const elementRef = react.useRef(undefined);
    const WebComponentTag = hooks.usePrefix('p-drilldown-item');
    const propsToSync = [cascade, identifier, label, primary, secondary];
    hooks.useBrowserLayoutEffect(() => {
        const { current } = elementRef;
        ['cascade', 'identifier', 'label', 'primary', 'secondary'].forEach((propName, i) => (current[propName] = propsToSync[i]));
    }, propsToSync);
    const props = {
        ...rest,
        class: hooks.useMergedClass(elementRef, className),
        ref: utils.syncRef(elementRef, ref)
    };
    // @ts-ignore
    return jsxRuntime.jsx(WebComponentTag, { ...props });
});

exports.PDrilldownItem = PDrilldownItem;
