'use strict';

var jsxRuntime = require('react/jsx-runtime');
var splitChildren = require('../../splitChildren.cjs');
var react = require('react');
var minifyCss = require('../../minifyCss.cjs');
var stylesEntry = require('../../../../../../components/dist/styles/esm/styles-entry.cjs');

/**
 * @slot {"name": "", "description": "Default slot for the `p-segmented-control-item` tags." }
 *
 * @controlled { "props": ["value"], "event": "update", "isInternallyMutated": true }
 */
class DSRSegmentedControl extends react.Component {
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
        const { children, otherChildren } = splitChildren.splitChildren(this.props.children);
        const manipulatedChildren = children.map((child) => typeof child === 'object' && 'props' in child && otherChildren.includes(child)
            ? { ...child, props: { ...child.props, selected: child.props?.value === this.props.value, backgroundColor: this.props.backgroundColor, theme: this.props.theme } }
            : child);
        const style = minifyCss.minifyCss(stylesEntry.getSegmentedControlCss(100, this.props.columns));
        return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsxs("template", { shadowroot: "open", shadowrootmode: "open", children: [jsxRuntime.jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsxRuntime.jsx(jsxRuntime.Fragment, { children: jsxRuntime.jsx("slot", {}) })] }), manipulatedChildren] }));
    }
}

exports.DSRSegmentedControl = DSRSegmentedControl;
