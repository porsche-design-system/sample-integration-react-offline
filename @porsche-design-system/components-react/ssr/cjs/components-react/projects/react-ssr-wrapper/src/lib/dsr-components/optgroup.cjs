'use strict';

var jsxRuntime = require('react/jsx-runtime');
var splitChildren = require('../../splitChildren.cjs');
var react = require('react');
var minifyCss = require('../../minifyCss.cjs');
var stylesEntry = require('../../../../../../components/dist/styles/esm/styles-entry.cjs');

/**
 * @slot {"name": "", "description": "Default slot for the optgroup content." }
 */
class DSROptgroup extends react.Component {
    host;
    render() {
        splitChildren.splitChildren(this.props.children);
        const { theme = 'light', hidden } = this.props;
        const labelId = 'label';
        const style = minifyCss.minifyCss(stylesEntry.getOptgroupCss(this.props.disabled, theme));
        return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsxs("template", { shadowroot: "open", shadowrootmode: "open", children: [jsxRuntime.jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsxRuntime.jsx(jsxRuntime.Fragment, { children: jsxRuntime.jsxs("div", { role: "group", "aria-disabled": this.props.disabled ? 'true' : null, "aria-hidden": hidden ? 'true' : null, "aria-labelledby": labelId, children: [jsxRuntime.jsx("span", { id: labelId, role: "presentation", children: this.props.label }), jsxRuntime.jsx("slot", {})] }) })] }), this.props.children] }));
    }
}

exports.DSROptgroup = DSROptgroup;
