import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { Component } from 'react';
import '../../provider.mjs';
import { splitChildren } from '../../splitChildren.mjs';
import { minifyCss } from '../../minifyCss.mjs';
import { getStepperHorizontalCss as getComponentCss$m } from '../../../../../../components/dist/styles/esm/styles-entry.mjs';
import { PScroller } from '../components/scroller.wrapper.mjs';

/**
 * @slot {"name": "", "description": "Default slot for the `p-stepper-horizontal-item` tags." }
 */
class DSRStepperHorizontal extends Component {
    host;
    stepperHorizontalItems = [];
    scrollerElement;
    currentStepIndex;
    render() {
        const { children, otherChildren } = splitChildren(this.props.children);
        const manipulatedChildren = children.map((child) => typeof child === 'object' && 'props' in child && otherChildren.includes(child)
            ? { ...child, props: { ...child.props, theme: this.props.theme } }
            : child);
        const style = minifyCss(getComponentCss$m(this.props.size));
        return (jsxs(Fragment, { children: [jsxs("template", { shadowroot: "open", shadowrootmode: "open", children: [jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsx(Fragment, { children: jsx(PScroller, { className: "scroller", aria: { role: 'list' }, theme: this.props.theme, children: jsx("slot", {}) }) })] }), manipulatedChildren] }));
    }
}

export { DSRStepperHorizontal };
