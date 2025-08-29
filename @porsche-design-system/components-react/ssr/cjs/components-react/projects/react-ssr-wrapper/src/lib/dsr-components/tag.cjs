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
 * @slot {"name": "", "description": "Default slot for the tag content." }
 */
class DSRTag extends react.Component {
    host;
    render() {
        splitChildren.splitChildren(this.props.children);
        const hasIcon = !!(this.props.icon || this.props.iconSource);
        const deprecationMap = {
            'background-default': 'background-base',
            'neutral-contrast-high': 'primary',
            'notification-neutral': 'notification-info-soft',
            'notification-warning': 'notification-warning-soft',
            'notification-success': 'notification-success-soft',
            'notification-error': 'notification-error-soft',
        };
        const style = minifyCss.minifyCss(stylesEntry.getTagCss((deprecationMap[this.props.color] || this.props.color), this.props.compact, !!utilsEntry.getDirectChildHTMLElement(null, 'a,button'), hasIcon, this.props.theme));
        return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsxs("template", { shadowroot: "open", shadowrootmode: "open", children: [jsxRuntime.jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsxRuntime.jsxs("span", { children: [hasIcon && (jsxRuntime.jsx(icon_wrapper.PIcon, { className: "icon", name: this.props.icon, source: this.props.iconSource, color: "primary", size: "x-small", theme: this.props.theme, "aria-hidden": "true" })), jsxRuntime.jsx("slot", {})] })] }), this.props.children] }));
    }
}

exports.DSRTag = DSRTag;
