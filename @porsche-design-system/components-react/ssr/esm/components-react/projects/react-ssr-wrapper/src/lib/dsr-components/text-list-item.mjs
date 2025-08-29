import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { splitChildren } from '../../splitChildren.mjs';
import { Component } from 'react';
import { minifyCss } from '../../minifyCss.mjs';
import { getTextListItemCss as getComponentCss$6 } from '../../../../../../components/dist/styles/esm/styles-entry.mjs';

/**
 * @slot {"name": "", "description": "Default slot for the content." }
 */
class DSRTextListItem extends Component {
    host;
    render() {
        splitChildren(this.props.children);
        const style = minifyCss(getComponentCss$6());
        return (jsxs(Fragment, { children: [jsxs("template", { shadowroot: "open", shadowrootmode: "open", children: [jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsx(Fragment, { children: jsx("span", { children: jsx("slot", {}) }) })] }), this.props.children] }));
    }
}

export { DSRTextListItem };
