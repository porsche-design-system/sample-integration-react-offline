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
 * @slot {"name": "", "description": "Default slot to render the link label. This slot can be used to slot an anchor tag instead of using the href prop." }
 */
class DSRLink extends react.Component {
    host;
    render() {
        splitChildren.splitChildren(this.props.children);
        const TagType = this.props.href === undefined ? 'span' : 'a';
        const style = minifyCss.minifyCss(stylesEntry.getLinkCss(this.props.icon, this.props.iconSource, this.props.variant, this.props.hideLabel, !this.props.href, this.props.compact, this.props.theme));
        return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsxs("template", { shadowroot: "open", shadowrootmode: "open", shadowrootdelegatesfocus: "true", children: [jsxRuntime.jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsxRuntime.jsxs(TagType, { className: "root", ...(TagType === 'a' && {
                                href: this.props.href,
                                target: this.props.target,
                                download: this.props.download,
                                rel: this.props.rel,
                                ...utilsEntry.parseAndGetAriaAttributes(this.props.aria),
                            }), children: [utilsEntry.hasVisibleIcon(this.props.icon, this.props.iconSource) && (jsxRuntime.jsx(icon_wrapper.PIcon, { className: "icon", size: "inherit", name: this.props.iconSource ? undefined : this.props.icon, source: this.props.iconSource, theme: this.props.theme, "aria-hidden": "true" })), jsxRuntime.jsx("span", { className: "label", children: jsxRuntime.jsx("slot", {}) })] })] }), this.props.children] }));
    }
}

exports.DSRLink = DSRLink;
