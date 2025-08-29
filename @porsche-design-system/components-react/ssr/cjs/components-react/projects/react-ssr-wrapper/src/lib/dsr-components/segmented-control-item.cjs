'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
require('../../provider.cjs');
var splitChildren = require('../../splitChildren.cjs');
var minifyCss = require('../../minifyCss.cjs');
var stylesEntry = require('../../../../../../components/dist/styles/esm/styles-entry.cjs');
var utilsEntry = require('../../../../../../components/dist/utils/esm/utils-entry.cjs');
var icon_wrapper = require('../components/icon.wrapper.cjs');

/**
 * @slot {"name": "", "description": "Default slot for the content." }
 */
class DSRSegmentedControlItem extends react.Component {
    host;
    render() {
        const { children} = splitChildren.splitChildren(this.props.children);
        // this additional validation is still needed because undefined is allowed with current propTypes
        const hasIcon = !!this.props.icon || !!this.props.iconSource;
        const hasSlottedContent = !!children.length;
        const isDisabled = this.props.disabled || this.props.disabledParent;
        const style = minifyCss.minifyCss(stylesEntry.getSegmentedControlItemCss(isDisabled, this.props.selected, hasIcon, hasSlottedContent, this.props.theme || 'light' // default as fallback
        ));
        return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsxs("template", { shadowroot: "open", shadowrootmode: "open", shadowrootdelegatesfocus: "true", children: [jsxRuntime.jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsxRuntime.jsx(jsxRuntime.Fragment, { children: jsxRuntime.jsxs("button", { type: "button", ...utilsEntry.getSegmentedControlItemAriaAttributes(this.props.selected, this.props.disabled, this.props.aria), children: [this.props.label && jsxRuntime.jsx("span", { children: this.props.label }), hasIcon && (jsxRuntime.jsx(icon_wrapper.PIcon, { className: "icon", size: "inherit", name: this.props.icon, source: this.props.iconSource, color: utilsEntry.getIconColor(this.props.disabled), theme: this.props.theme || 'light', "aria-hidden": "true" })), jsxRuntime.jsx("slot", {})] }) })] }), this.props.children] }));
    }
}

exports.DSRSegmentedControlItem = DSRSegmentedControlItem;
