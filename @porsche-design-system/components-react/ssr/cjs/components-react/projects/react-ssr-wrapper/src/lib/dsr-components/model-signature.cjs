'use strict';

var jsxRuntime = require('react/jsx-runtime');
var splitChildren = require('../../splitChildren.cjs');
var react = require('react');
var minifyCss = require('../../minifyCss.cjs');
var stylesEntry = require('../../../../../../components/dist/styles/esm/styles-entry.cjs');
var utilsEntry = require('../../../../../../components/dist/utils/esm/utils-entry.cjs');

/**
 * @slot {"name": "", "description": "Default slot for an img or video tag when using the model-signature as a mask." }
 */
class DSRModelSignature extends react.Component {
    host;
    render() {
        splitChildren.splitChildren(this.props.children);
        const fetchPriority = this.props.fetchPriority !== 'auto' ? this.props.fetchPriority : null;
        const loading = this.props.lazy === true ? 'lazy' : null;
        const style = minifyCss.minifyCss(stylesEntry.getModelSignatureCss(this.props.model, this.props.safeZone, this.props.size, this.props.color, this.props.theme));
        return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsxs("template", { shadowroot: "open", shadowrootmode: "open", children: [jsxRuntime.jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx("slot", {}), jsxRuntime.jsx("img", { fetchPriority: fetchPriority, loading: loading, src: utilsEntry.getSvgUrl(this.props.model), alt: this.props.model })] })] }), this.props.children] }));
    }
}

exports.DSRModelSignature = DSRModelSignature;
