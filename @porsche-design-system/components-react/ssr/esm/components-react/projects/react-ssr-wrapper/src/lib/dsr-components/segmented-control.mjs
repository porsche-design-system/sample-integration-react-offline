import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { splitChildren } from '../../splitChildren.mjs';
import { Component } from 'react';
import { minifyCss } from '../../minifyCss.mjs';
import { getSegmentedControlCss as getComponentCss$u } from '../../../../../../components/dist/styles/esm/styles-entry.mjs';

/**
 * @slot {"name": "", "description": "Default slot for the `p-segmented-control-item` tags." }
 *
 * @controlled { "props": ["value"], "event": "update", "isInternallyMutated": true }
 */
class DSRSegmentedControl extends Component {
    host;
    internals;
    defaultValue;
    formResetCallback() {
        this.props.internals?.setFormValue(this.props.defaultValue?.toString());
    }
    formDisabledCallback() {
    }
    formStateRestoreCallback() {
    }
    render() {
        const { children, otherChildren } = splitChildren(this.props.children);
        const manipulatedChildren = children.map((child) => typeof child === 'object' && 'props' in child && otherChildren.includes(child)
            ? { ...child, props: { ...child.props, selected: child.props?.value === this.props.value, backgroundColor: this.props.backgroundColor, theme: this.props.theme } }
            : child);
        const style = minifyCss(getComponentCss$u(100, this.props.columns));
        return (jsxs(Fragment, { children: [jsxs("template", { shadowroot: "open", shadowrootmode: "open", children: [jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsx(Fragment, { children: jsx("slot", {}) })] }), manipulatedChildren] }));
    }
}

export { DSRSegmentedControl };
