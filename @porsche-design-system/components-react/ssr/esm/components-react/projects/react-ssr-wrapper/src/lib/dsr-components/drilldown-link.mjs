import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { splitChildren } from '../../splitChildren.mjs';
import { Component } from 'react';
import { minifyCss } from '../../minifyCss.mjs';
import { getDrilldownLinkCss as getComponentCss$15 } from '../../../../../../components/dist/styles/esm/styles-entry.mjs';
import { parseAndGetAriaAttributes } from '../../../../../../components/dist/utils/esm/utils-entry.mjs';

/**
 * @slot {"name": "", "description": "Default slot to render the link label." }
 *
 * @experimental
 */
class DSRDrilldownLink extends Component {
    host;
    render() {
        splitChildren(this.props.children);
        const hasSlottedAnchor = this.props.href === undefined;
        const style = minifyCss(getComponentCss$15(hasSlottedAnchor, this.props.active));
        return (jsxs(Fragment, { children: [jsxs("template", { shadowroot: "open", shadowrootmode: "open", shadowrootdelegatesfocus: "true", children: [jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsx(Fragment, { children: hasSlottedAnchor ? (jsx("slot", {})) : (jsx("a", { href: this.props.href, target: this.props.target, download: this.props.download, rel: this.props.rel, "aria-current": this.props.active ? 'true' : 'false', ...parseAndGetAriaAttributes(this.props.aria), children: jsx("slot", {}) })) })] }), this.props.children] }));
    }
}

export { DSRDrilldownLink };
