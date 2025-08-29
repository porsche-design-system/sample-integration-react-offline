import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { Component } from 'react';
import '../../provider.mjs';
import { splitChildren } from '../../splitChildren.mjs';
import { minifyCss } from '../../minifyCss.mjs';
import { getDrilldownItemCss as getComponentCss$16 } from '../../../../../../components/dist/styles/esm/styles-entry.mjs';
import { PButtonPure } from '../components/button-pure.wrapper.mjs';

/**
 * @slot {"name": "", "description": "Default slot for the main content." }
 * @slot {"name": "button", "description": "Shows a custom button to reach a deeper level of the navigation structure." } *
 * @slot {"name": "header", "description": "Shows a custom header section on mobile view" } *
 * @experimental
 */
class DSRDrilldownItem extends Component {
    host;
    scroller;
    hasSlottedHeader;
    hasSlottedButton;
    get theme() {
        return this.props.theme || 'light'; // default as fallback (internal private prop is controlled by drilldown)
    }
    render() {
        const { namedSlotChildren} = splitChildren(this.props.children);
        const hasSlottedHeader = namedSlotChildren.filter(({ props: { slot } }) => slot === 'header').length > 0;
        const hasSlottedButton = namedSlotChildren.filter(({ props: { slot } }) => slot === 'button').length > 0;
        const style = minifyCss(getComponentCss$16(this.props.primary, this.props.secondary, this.props.cascade));
        return (jsxs(Fragment, { children: [jsxs("template", { shadowroot: "open", shadowrootmode: "open", children: [jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsxs(Fragment, { children: [hasSlottedButton ? (jsx("slot", { name: "button" })) : (jsx(PButtonPure, { inert: this.props.primary || this.props.cascade, className: "button", type: "button", size: "medium", alignLabel: "start", stretch: true, icon: "arrow-head-right", active: this.props.secondary, aria: { 'aria-expanded': this.props.secondary }, theme: this.theme, children: this.props.label })), jsx(PButtonPure, { className: "back", type: "button", size: "small", alignLabel: "end", stretch: true, icon: "arrow-left", theme: this.theme, hideLabel: { base: true, s: false }, children: this.props.label }), hasSlottedHeader ? jsx("slot", { name: "header" }) : jsx("h2", { children: this.props.label }), jsx("div", { className: "drawer", children: jsx("div", { className: "scroller", children: jsx("slot", {}) }) })] })] }), this.props.children] }));
    }
}

export { DSRDrilldownItem };
