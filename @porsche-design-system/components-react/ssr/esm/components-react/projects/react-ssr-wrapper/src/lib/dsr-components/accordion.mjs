import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { Component } from 'react';
import '../../provider.mjs';
import { splitChildren } from '../../splitChildren.mjs';
import { minifyCss } from '../../minifyCss.mjs';
import { getAccordionCss as getComponentCss$1l } from '../../../../../../components/dist/styles/esm/styles-entry.mjs';
import { PIcon } from '../components/icon.wrapper.mjs';

/**
 * @slot {"name": "heading", "description": "Defines the heading used in the accordion. Can be used alternatively to the heading prop. Please **refrain** from using any other than text content as slotted markup." }
 * @slot {"name": "", "description": "Default slot for the main content" }
 *
 * @controlled {"props": ["open"], "event": "update"}
 */
class DSRAccordion extends Component {
    host;
    render() {
        splitChildren(this.props.children);
        const buttonId = 'accordion-control';
        const contentId = 'accordion-panel';
        const Heading = this.props.tag || this.props.headingTag;
        const style = minifyCss(getComponentCss$1l(this.props.size, this.props.compact, this.props.open, this.props.theme, this.props.sticky));
        return (jsxs(Fragment, { children: [jsxs("template", { shadowroot: "open", shadowrootmode: "open", children: [jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsxs(Fragment, { children: [jsx(Heading, { className: "heading", children: jsxs("button", { id: buttonId, type: "button", "aria-expanded": this.props.open ? 'true' : 'false', "aria-controls": contentId, children: [this.props.heading || jsx("slot", { name: "heading" }), jsx("span", { className: "icon-container", children: jsx(PIcon, { className: "icon", name: this.props.open ? 'minus' : 'plus', theme: this.props.theme, size: "xx-small", "aria-hidden": "true" }) })] }) }), jsx("div", { id: contentId, className: "collapsible", role: "region", "aria-labelledby": buttonId, children: jsx("div", { children: jsx("slot", {}) }) })] })] }), this.props.children] }));
    }
}

export { DSRAccordion };
