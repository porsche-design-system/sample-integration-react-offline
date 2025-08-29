"use client";
import { jsx } from 'react/jsx-runtime';
import { forwardRef, useRef } from 'react';
import { usePrefix, useBrowserLayoutEffect, useMergedClass } from '../../hooks.mjs';
import { syncRef } from '../../utils.mjs';

const PDrilldownItem = /*#__PURE__*/ forwardRef(({ cascade = false, identifier, label, primary = false, secondary = false, className, ...rest }, ref) => {
    const elementRef = useRef(undefined);
    const WebComponentTag = usePrefix('p-drilldown-item');
    const propsToSync = [cascade, identifier, label, primary, secondary];
    useBrowserLayoutEffect(() => {
        const { current } = elementRef;
        ['cascade', 'identifier', 'label', 'primary', 'secondary'].forEach((propName, i) => (current[propName] = propsToSync[i]));
    }, propsToSync);
    const props = {
        ...rest,
        class: useMergedClass(elementRef, className),
        ref: syncRef(elementRef, ref)
    };
    // @ts-ignore
    return jsx(WebComponentTag, { ...props });
});

export { PDrilldownItem };
