import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { splitChildren } from '../../splitChildren.mjs';
import { Component } from 'react';
import { minifyCss } from '../../minifyCss.mjs';
import { getDisplayCss as getComponentCss$19 } from '../../../../../../components/dist/styles/esm/styles-entry.mjs';
import { getDisplayTagType } from '../../../../../../components/dist/utils/esm/utils-entry.mjs';

/**
 * @slot {"name": "", "description": "Default slot for the display text." }
 */
class DSRDisplay extends Component {
    host;
    render() {
        splitChildren(this.props.children);
        const alignDeprecationMap = {
            left: 'start',
            right: 'end',
        };
        const TagType = getDisplayTagType(null, this.props.size, this.props.tag);
        const style = minifyCss(getComponentCss$19(this.props.size, (alignDeprecationMap[this.props.align] || this.props.align), this.props.color, this.props.ellipsis, this.props.theme));
        return (jsxs(Fragment, { children: [jsxs("template", { shadowroot: "open", shadowrootmode: "open", children: [jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsx(TagType, { className: "root", children: jsx("slot", {}) })] }), this.props.children] }));
    }
}

export { DSRDisplay };
