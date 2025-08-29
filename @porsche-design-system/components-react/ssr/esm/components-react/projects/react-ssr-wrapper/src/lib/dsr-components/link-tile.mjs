import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { Component, createElement } from 'react';
import '../../provider.mjs';
import { splitChildren } from '../../splitChildren.mjs';
import { minifyCss } from '../../minifyCss.mjs';
import { getLinkTileCss as getComponentCss$H } from '../../../../../../components/dist/styles/esm/styles-entry.mjs';
import { PLink } from '../components/link.wrapper.mjs';
import { PLinkPure } from '../components/link-pure.wrapper.mjs';

/**
 * @slot {"name": "header", "description": "Renders a header section above the content area." }
 * @slot {"name": "", "description": "Default slot for the img or picture tag." }
 */
class DSRLinkTile extends Component {
    host;
    render() {
        splitChildren(this.props.children);
        const linkProps = {
            theme: this.props.background,
            variant: 'secondary',
            aria: this.props.aria,
        };
        const sharedLinkProps = {
            href: this.props.href,
            target: this.props.target,
            download: this.props.download,
            rel: this.props.rel,
        };
        const link = (createElement(PLink, { ...sharedLinkProps, ...linkProps, key: "link-or-button", className: "link-or-button" }, this.props.label));
        const linkPure = (createElement(PLinkPure, { ...sharedLinkProps, ...linkProps, key: "link-or-button-pure", className: "link-or-button-pure", hideLabel: true, icon: "arrow-right" }, this.props.label));
        const style = minifyCss(getComponentCss$H(this.props.aspectRatio, this.props.size, this.props.weight, this.props.background, this.props.align, this.props.compact, this.props.gradient));
        return (jsxs(Fragment, { children: [jsxs("template", { shadowroot: "open", shadowrootmode: "open", shadowrootdelegatesfocus: "true", children: [jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsxs("div", { className: "root", children: [jsx("a", { ...sharedLinkProps, tabIndex: -1, "aria-hidden": "true" }), jsx("slot", { name: "header" }), jsx("div", { className: "media", children: jsx("slot", {}) }), jsxs("div", { className: "footer", children: [jsx("p", { children: this.props.description }), typeof this.props.compact === 'boolean' ? (this.props.compact ? linkPure : link) : [linkPure, link]] })] })] }), this.props.children] }));
    }
}

export { DSRLinkTile };
