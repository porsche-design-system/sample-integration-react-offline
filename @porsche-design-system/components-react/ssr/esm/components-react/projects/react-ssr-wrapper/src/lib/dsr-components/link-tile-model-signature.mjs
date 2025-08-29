import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { Component } from 'react';
import '../../provider.mjs';
import { splitChildren } from '../../splitChildren.mjs';
import { minifyCss } from '../../minifyCss.mjs';
import { getLinkTileModelSignatureCss as getComponentCss$J } from '../../../../../../components/dist/styles/esm/styles-entry.mjs';
import { PModelSignature } from '../components/model-signature.wrapper.mjs';

/**
 * @slot {"name": "header", "description": "Renders a header section above the content area." }
 * @slot {"name": "", "description": "Default slot for the img or picture tag." }
 * @slot {"name": "primary", "description": "Renders the primary link. Has to be a p-link tag.", "isRequired": true, "allowedTagNames": ["p-link"] }
 * @slot {"name": "secondary", "description": "Renders the secondary link. Has to be a p-link tag.", "isRequired": true, "allowedTagNames": ["p-link"] }
 */
class DSRLinkTileModelSignature extends Component {
    host;
    render() {
        const { children, namedSlotChildren} = splitChildren(this.props.children);
        // If we do this earlier than render, there are cases where primaryLink.href is undefined
        // TODO: Here and in other components, validation happens only on initial render. We could extend this to watch props of the required slots.
        const manipulatedChildren = children.map((child) => typeof child === 'object' && 'props' in child && namedSlotChildren.includes(child)
            ? { ...child, props: { ...child.props, theme: 'dark', variant: child.props.slot } }
            : child);
        const primaryLink = manipulatedChildren.find((child) => typeof child === 'object' && 'props' in child && child.props.variant === 'primary');
        const linkEl = primaryLink.props.href
            ? primaryLink.props
            : (Array.isArray(primaryLink.props.children) ? primaryLink.props.children : [primaryLink.props.children]).find((child) => child.type === 'a' || child.props.href || child.props.to // href and to check is for framework links
            ).props; // support for slotted a tag within p-link
        const overlayLinkProps = {
            href: linkEl.href || linkEl.to,
            target: linkEl.target || '_self',
            download: linkEl.download || null,
            rel: linkEl.rel || null,
            tabIndex: -1,
            'aria-hidden': 'true',
        };
        const style = minifyCss(getComponentCss$J(this.props.aspectRatio, this.props.weight, this.props.linkDirection, !!this.props.description));
        return (jsxs(Fragment, { children: [jsxs("template", { shadowroot: "open", shadowrootmode: "open", children: [jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsxs("div", { className: "root", children: [jsx("a", { ...overlayLinkProps }), jsxs("div", { className: "header", children: [jsx(PModelSignature, { theme: "dark", model: this.props.model }), jsx("slot", { name: "header" })] }), jsx("div", { className: "media", children: jsx("slot", {}) }), jsxs("div", { className: "footer", children: [jsx(this.props.headingTag, { children: this.props.heading }), this.props.description && jsx("p", { children: this.props.description }), jsxs("div", { className: "link-group", role: "group", children: [jsx("slot", { name: "primary" }), jsx("slot", { name: "secondary" })] })] })] })] }), manipulatedChildren] }));
    }
}

export { DSRLinkTileModelSignature };
