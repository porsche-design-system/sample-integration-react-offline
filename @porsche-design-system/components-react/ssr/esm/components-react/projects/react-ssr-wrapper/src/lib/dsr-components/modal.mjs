import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { Component } from 'react';
import '../../provider.mjs';
import { splitChildren } from '../../splitChildren.mjs';
import { minifyCss } from '../../minifyCss.mjs';
import { getModalCss as getComponentCss$F } from '../../../../../../components/dist/styles/esm/styles-entry.mjs';
import { parseAndGetAriaAttributes } from '../../../../../../components/dist/utils/esm/utils-entry.mjs';
import { PButton } from '../components/button.wrapper.mjs';

/**
 * @slot {"name": "heading", "description": "Renders a heading section above the content area.", "isDeprecated": true }
 * @slot {"name": "header", "description": "Renders a header section above the content area." }
 * @slot {"name": "", "description": "Default slot for the main content." }
 * @slot {"name": "footer", "description": "Shows a sticky footer section, flowing under the content area when scrollable." }
 *
 * @controlled {"props": ["open"], "event": "dismiss"}
 */
class DSRModal extends Component {
    host;
    dialog;
    scroller;
    footer;
    hasHeader;
    hasFooter;
    get hasDismissButton() {
        return this.props.disableCloseButton ? false : this.props.dismissButton;
    }
    render() {
        const { namedSlotChildren} = splitChildren(this.props.children);
        const hasHeader = (this.props.heading || namedSlotChildren.filter(({ props: { slot } }) => slot === 'heading').length > 0) || namedSlotChildren.filter(({ props: { slot } }) => slot === 'header').length > 0;
        const hasFooter = namedSlotChildren.filter(({ props: { slot } }) => slot === 'footer').length > 0;
        const hasDismissButton = this.props.disableCloseButton ? false : this.props.dismissButton;
        // TODO: why do we validate only when opened?
        if (this.props.open) ;
        const style = minifyCss(getComponentCss$F(this.props.open, this.props.backdrop, this.props.fullscreen, hasDismissButton, hasHeader, hasFooter, this.props.theme));
        return (jsxs(Fragment, { children: [jsxs("template", { shadowroot: "open", shadowrootmode: "open", children: [jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsx("dialog", { inert: !this.props.open, tabIndex: -1, ...parseAndGetAriaAttributes({
                                'aria-modal': true,
                                ...(hasHeader && { 'aria-label': this.props.ariaLabel }),
                                ...parseAndGetAriaAttributes(this.props.aria),
                            }), children: jsx("div", { className: "scroller", children: jsxs("div", { className: "modal", children: [hasDismissButton && (jsx(PButton, { variant: "ghost", className: "dismiss", type: "button", hideLabel: true, icon: "close", theme: this.props.theme, children: "Dismiss modal" })), hasHeader &&
                                            (this.props.heading ? (jsx("h2", { children: this.props.heading })) : namedSlotChildren.filter(({ props: { slot } }) => slot === 'heading').length > 0 ? (jsx("slot", { name: "heading" })) : (jsx("slot", { name: "header" }))), jsx("slot", {}), hasFooter && jsx("slot", { name: "footer" })] }) }) })] }), this.props.children] }));
    }
}

export { DSRModal };
