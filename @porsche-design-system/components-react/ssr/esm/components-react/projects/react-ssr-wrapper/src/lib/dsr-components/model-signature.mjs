import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { splitChildren } from '../../splitChildren.mjs';
import { Component } from 'react';
import { minifyCss } from '../../minifyCss.mjs';
import { getModelSignatureCss as getComponentCss$E } from '../../../../../../components/dist/styles/esm/styles-entry.mjs';
import { getSvgUrl } from '../../../../../../components/dist/utils/esm/utils-entry.mjs';

/**
 * @slot {"name": "", "description": "Default slot for an img or video tag when using the model-signature as a mask." }
 */
class DSRModelSignature extends Component {
    host;
    render() {
        splitChildren(this.props.children);
        const fetchPriority = this.props.fetchPriority !== 'auto' ? this.props.fetchPriority : null;
        const loading = this.props.lazy === true ? 'lazy' : null;
        const style = minifyCss(getComponentCss$E(this.props.model, this.props.safeZone, this.props.size, this.props.color, this.props.theme));
        return (jsxs(Fragment, { children: [jsxs("template", { shadowroot: "open", shadowrootmode: "open", children: [jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsxs(Fragment, { children: [jsx("slot", {}), jsx("img", { fetchPriority: fetchPriority, loading: loading, src: getSvgUrl(this.props.model), alt: this.props.model })] })] }), this.props.children] }));
    }
}

export { DSRModelSignature };
