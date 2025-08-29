import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { Component } from 'react';
import '../../provider.mjs';
import { splitChildren } from '../../splitChildren.mjs';
import { minifyCss } from '../../minifyCss.mjs';
import { getLinkPureCss as getComponentCss$L } from '../../../../../../components/dist/styles/esm/styles-entry.mjs';
import { hasVisibleIcon, parseAndGetAriaAttributes } from '../../../../../../components/dist/utils/esm/utils-entry.mjs';
import { PIcon } from '../components/icon.wrapper.mjs';

/**
 * @slot {"name": "", "description": "Default slot to render the link label." }
 */
class DSRLinkPure extends Component {
    host;
    render() {
        splitChildren(this.props.children);
        const TagType = this.props.href === undefined ? 'span' : 'a';
        const hasIcon = hasVisibleIcon(this.props.icon, this.props.iconSource);
        const style = minifyCss(getComponentCss$L(this.props.icon, this.props.iconSource, this.props.active, this.props.stretch, this.props.size, this.props.hideLabel, this.props.alignLabel, this.props.underline, !this.props.href, this.props.theme));
        return (jsxs(Fragment, { children: [jsxs("template", { shadowroot: "open", shadowrootmode: "open", shadowrootdelegatesfocus: "true", children: [jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsxs(TagType, { className: "root", ...(TagType === 'a' && {
                                href: this.props.href,
                                target: this.props.target,
                                download: this.props.download,
                                rel: this.props.rel,
                                ...parseAndGetAriaAttributes(this.props.aria),
                            }), children: [hasIcon && (jsx(PIcon, { className: "icon", size: "inherit", name: this.props.icon, source: this.props.iconSource, theme: this.props.theme, "aria-hidden": "true" })), jsx("span", { className: "label", children: jsx("slot", {}) })] })] }), this.props.children] }));
    }
}

export { DSRLinkPure };
