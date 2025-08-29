import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { splitChildren } from '../../splitChildren.mjs';
import { Component } from 'react';
import { minifyCss } from '../../minifyCss.mjs';
import { getTextListCss as getComponentCss$7 } from '../../../../../../components/dist/styles/esm/styles-entry.mjs';
import { isListTypeOrdered } from '../../../../../../components/dist/utils/esm/utils-entry.mjs';

/**
 * @slot {"name": "", "description": "Default slot for the `p-text-list-item` tags or nested `p-text-list` tags." }
 */
class DSRTextList extends Component {
    host;
    render() {
        splitChildren(this.props.children);
        const TagType = isListTypeOrdered(this.props.listType || this.props.type) ? 'ol' : 'ul';
        const style = minifyCss(getComponentCss$7(this.props.listType === 'ordered' ? this.props.orderType || 'numbered' : this.props.type, this.props.theme));
        return (jsxs(Fragment, { children: [jsxs("template", { shadowroot: "open", shadowrootmode: "open", children: [jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsx(TagType, { children: jsx("slot", {}) })] }), this.props.children] }));
    }
}

export { DSRTextList };
