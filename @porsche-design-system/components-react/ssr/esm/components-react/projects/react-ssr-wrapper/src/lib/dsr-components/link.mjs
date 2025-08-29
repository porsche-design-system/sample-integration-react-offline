import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { Component } from 'react';
import '../../provider.mjs';
import { splitChildren } from '../../splitChildren.mjs';
import { minifyCss } from '../../minifyCss.mjs';
import { getLinkCss as getComponentCss$K } from '../../../../../../components/dist/styles/esm/styles-entry.mjs';
import { hasVisibleIcon, parseAndGetAriaAttributes } from '../../../../../../components/dist/utils/esm/utils-entry.mjs';
import { PIcon } from '../components/icon.wrapper.mjs';

/**
 * @slot {"name": "", "description": "Default slot to render the link label. This slot can be used to slot an anchor tag instead of using the href prop." }
 */
class DSRLink extends Component {
    host;
    render() {
        splitChildren(this.props.children);
        const TagType = this.props.href === undefined ? 'span' : 'a';
        const style = minifyCss(getComponentCss$K(this.props.icon, this.props.iconSource, this.props.variant, this.props.hideLabel, !this.props.href, this.props.compact, this.props.theme));
        return (jsxs(Fragment, { children: [jsxs("template", { shadowroot: "open", shadowrootmode: "open", shadowrootdelegatesfocus: "true", children: [jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsxs(TagType, { className: "root", ...(TagType === 'a' && {
                                href: this.props.href,
                                target: this.props.target,
                                download: this.props.download,
                                rel: this.props.rel,
                                ...parseAndGetAriaAttributes(this.props.aria),
                            }), children: [hasVisibleIcon(this.props.icon, this.props.iconSource) && (jsx(PIcon, { className: "icon", size: "inherit", name: this.props.iconSource ? undefined : this.props.icon, source: this.props.iconSource, theme: this.props.theme, "aria-hidden": "true" })), jsx("span", { className: "label", children: jsx("slot", {}) })] })] }), this.props.children] }));
    }
}

export { DSRLink };
