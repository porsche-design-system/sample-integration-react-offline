import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { Component } from 'react';
import '../../provider.mjs';
import { splitChildren } from '../../splitChildren.mjs';
import { minifyCss } from '../../minifyCss.mjs';
import { getTableCss as getComponentCss$j } from '../../../../../../components/dist/styles/esm/styles-entry.mjs';
import { PScroller } from '../components/scroller.wrapper.mjs';

/**
 * @slot {"name": "caption", "description": "Shows a caption that describes the content of the table." }
 * @slot {"name": "", "description": "Default slot for the table content." }
 */
class DSRTable extends Component {
    host;
    render() {
        const { namedSlotChildren} = splitChildren(this.props.children);
        const hasSlottedCaption = namedSlotChildren.filter(({ props: { slot } }) => slot === 'caption').length > 0;
        const captionId = 'caption';
        const tableAttr = this.props.caption
            ? { 'aria-label': this.props.caption }
            : hasSlottedCaption && { 'aria-labelledby': captionId };
        const style = minifyCss(getComponentCss$j(this.props.compact, this.props.layout, this.props.theme));
        return (jsxs(Fragment, { children: [jsxs("template", { shadowroot: "open", shadowrootmode: "open", children: [jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsxs(Fragment, { children: [hasSlottedCaption && (jsx("div", { id: captionId, className: "caption", children: jsx("slot", { name: "caption" }) })), jsx(PScroller, { scrollbar: true, theme: this.props.theme, children: jsx("div", { className: "table", role: "table", ...tableAttr, children: jsx("slot", {}) }) })] })] }), this.props.children] }));
    }
}

export { DSRTable };
