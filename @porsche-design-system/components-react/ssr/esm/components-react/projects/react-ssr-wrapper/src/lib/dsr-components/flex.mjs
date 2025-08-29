import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { splitChildren } from '../../splitChildren.mjs';
import { Component } from 'react';
import { minifyCss } from '../../minifyCss.mjs';
import { getFlexCss as getComponentCss$10 } from '../../../../../../components/dist/styles/esm/styles-entry.mjs';

/**
 * @slot {"name": "", "description": "Default slot for the flex items." }
 * @deprecated since v3.0.0, will be removed with next major release. Use native CSS Flex instead.
 */
class DSRFlex extends Component {
    host;
    render() {
        splitChildren(this.props.children);
        const style = minifyCss(getComponentCss$10(this.props.inline, this.props.wrap, this.props.direction, this.props.justifyContent, this.props.alignItems, this.props.alignContent));
        return (jsxs(Fragment, { children: [jsxs("template", { shadowroot: "open", shadowrootmode: "open", children: [jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsx("slot", {})] }), this.props.children] }));
    }
}

export { DSRFlex };
