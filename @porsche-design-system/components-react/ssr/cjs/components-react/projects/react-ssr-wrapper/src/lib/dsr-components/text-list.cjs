'use strict';

var jsxRuntime = require('react/jsx-runtime');
var splitChildren = require('../../splitChildren.cjs');
var react = require('react');
var minifyCss = require('../../minifyCss.cjs');
var stylesEntry = require('../../../../../../components/dist/styles/esm/styles-entry.cjs');
var utilsEntry = require('../../../../../../components/dist/utils/esm/utils-entry.cjs');

/**
 * @slot {"name": "", "description": "Default slot for the `p-text-list-item` tags or nested `p-text-list` tags." }
 */
class DSRTextList extends react.Component {
    host;
    render() {
        splitChildren.splitChildren(this.props.children);
        const TagType = utilsEntry.isListTypeOrdered(this.props.listType || this.props.type) ? 'ol' : 'ul';
        const style = minifyCss.minifyCss(stylesEntry.getTextListCss(this.props.listType === 'ordered' ? this.props.orderType || 'numbered' : this.props.type, this.props.theme));
        return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsxs("template", { shadowroot: "open", shadowrootmode: "open", children: [jsxRuntime.jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsxRuntime.jsx(TagType, { children: jsxRuntime.jsx("slot", {}) })] }), this.props.children] }));
    }
}

exports.DSRTextList = DSRTextList;
