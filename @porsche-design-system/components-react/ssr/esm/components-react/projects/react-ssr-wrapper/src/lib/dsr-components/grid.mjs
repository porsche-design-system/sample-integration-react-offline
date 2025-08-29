import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { splitChildren } from '../../splitChildren.mjs';
import { Component } from 'react';
import { minifyCss } from '../../minifyCss.mjs';
import { getGridCss as getComponentCss$Z } from '../../../../../../components/dist/styles/esm/styles-entry.mjs';

/**
 * @slot {"name": "", "description": "Default slot to render p-grid-item tags." }
 *
 * @deprecated since v3.0.0, will be removed with next major release. Use native CSS Grid instead.
 */
class DSRGrid extends Component {
    host;
    render() {
        const { children, otherChildren } = splitChildren(this.props.children);
        const manipulatedChildren = children.map((child) => typeof child === 'object' && 'props' in child && otherChildren.includes(child)
            ? { ...child, props: { ...child.props, gutter: this.props.gutter } }
            : child);
        const style = minifyCss(getComponentCss$Z(this.props.direction, this.props.wrap));
        return (jsxs(Fragment, { children: [jsxs("template", { shadowroot: "open", shadowrootmode: "open", children: [jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsx("slot", {})] }), manipulatedChildren] }));
    }
}

export { DSRGrid };
