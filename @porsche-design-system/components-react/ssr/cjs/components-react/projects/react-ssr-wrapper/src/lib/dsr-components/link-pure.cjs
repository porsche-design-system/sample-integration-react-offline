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
 * @slot {"name": "", "description": "Default slot to render the link label." }
 */
class DSRLinkPure extends react.Component {
    host;
    render() {
        splitChildren.splitChildren(this.props.children);
        const TagType = this.props.href === undefined ? 'span' : 'a';
        const hasIcon = utilsEntry.hasVisibleIcon(this.props.icon, this.props.iconSource);
        const style = minifyCss.minifyCss(stylesEntry.getLinkPureCss(this.props.icon, this.props.iconSource, this.props.active, this.props.stretch, this.props.size, this.props.hideLabel, this.props.alignLabel, this.props.underline, !this.props.href, this.props.theme));
        return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsxs("template", { shadowroot: "open", shadowrootmode: "open", shadowrootdelegatesfocus: "true", children: [jsxRuntime.jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsxRuntime.jsxs(TagType, { className: "root", ...(TagType === 'a' && {
                                href: this.props.href,
                                target: this.props.target,
                                download: this.props.download,
                                rel: this.props.rel,
                                ...utilsEntry.parseAndGetAriaAttributes(this.props.aria),
                            }), children: [hasIcon && (jsxRuntime.jsx(icon_wrapper.PIcon, { className: "icon", size: "inherit", name: this.props.icon, source: this.props.iconSource, theme: this.props.theme, "aria-hidden": "true" })), jsxRuntime.jsx("span", { className: "label", children: jsxRuntime.jsx("slot", {}) })] })] }), this.props.children] }));
    }
}

exports.DSRLinkPure = DSRLinkPure;
