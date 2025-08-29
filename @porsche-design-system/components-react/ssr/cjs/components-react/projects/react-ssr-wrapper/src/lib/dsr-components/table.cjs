'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
require('../../provider.cjs');
var splitChildren = require('../../splitChildren.cjs');
var minifyCss = require('../../minifyCss.cjs');
var stylesEntry = require('../../../../../../components/dist/styles/esm/styles-entry.cjs');
var scroller_wrapper = require('../components/scroller.wrapper.cjs');

/**
 * @slot {"name": "caption", "description": "Shows a caption that describes the content of the table." }
 * @slot {"name": "", "description": "Default slot for the table content." }
 */
class DSRTable extends react.Component {
    host;
    render() {
        const { namedSlotChildren} = splitChildren.splitChildren(this.props.children);
        const hasSlottedCaption = namedSlotChildren.filter(({ props: { slot } }) => slot === 'caption').length > 0;
        const captionId = 'caption';
        const tableAttr = this.props.caption
            ? { 'aria-label': this.props.caption }
            : hasSlottedCaption && { 'aria-labelledby': captionId };
        const style = minifyCss.minifyCss(stylesEntry.getTableCss(this.props.compact, this.props.layout, this.props.theme));
        return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsxs("template", { shadowroot: "open", shadowrootmode: "open", children: [jsxRuntime.jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [hasSlottedCaption && (jsxRuntime.jsx("div", { id: captionId, className: "caption", children: jsxRuntime.jsx("slot", { name: "caption" }) })), jsxRuntime.jsx(scroller_wrapper.PScroller, { scrollbar: true, theme: this.props.theme, children: jsxRuntime.jsx("div", { className: "table", role: "table", ...tableAttr, children: jsxRuntime.jsx("slot", {}) }) })] })] }), this.props.children] }));
    }
}

exports.DSRTable = DSRTable;
