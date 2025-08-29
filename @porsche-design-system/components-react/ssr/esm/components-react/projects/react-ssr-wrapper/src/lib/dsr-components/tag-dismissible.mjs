import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { Component } from 'react';
import '../../provider.mjs';
import { splitChildren } from '../../splitChildren.mjs';
import { minifyCss } from '../../minifyCss.mjs';
import { getTagDismissibleCss as getComponentCss$a } from '../../../../../../components/dist/styles/esm/styles-entry.mjs';
import { parseAndGetAriaAttributes } from '../../../../../../components/dist/utils/esm/utils-entry.mjs';
import { PIcon } from '../components/icon.wrapper.mjs';

/**
 * @slot {"name": "", "description": "Default slot for the tag content." }
 */
class DSRTagDismissible extends Component {
    host;
    render() {
        splitChildren(this.props.children);
        const deprecationMap = {
            'background-default': 'background-base',
        };
        const style = minifyCss(getComponentCss$a((deprecationMap[this.props.color] || this.props.color), !!this.props.label, this.props.theme));
        return (jsxs(Fragment, { children: [jsxs("template", { shadowroot: "open", shadowrootmode: "open", shadowrootdelegatesfocus: "true", children: [jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsxs("button", { type: "button", ...parseAndGetAriaAttributes(this.props.aria), children: [jsx("span", { className: "sr-only", children: "Remove:" }), jsxs("span", { children: [this.props.label && jsx("span", { className: "label", children: this.props.label }), jsx("slot", {})] }), jsx(PIcon, { className: "icon", name: "close", theme: this.props.theme, "aria-hidden": "true" })] })] }), this.props.children] }));
    }
}

export { DSRTagDismissible };
