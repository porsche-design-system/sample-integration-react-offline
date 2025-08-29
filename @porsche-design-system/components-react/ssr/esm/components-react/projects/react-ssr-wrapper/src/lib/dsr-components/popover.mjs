import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { Component } from 'react';
import '../../provider.mjs';
import { splitChildren } from '../../splitChildren.mjs';
import { minifyCss } from '../../minifyCss.mjs';
import { getPopoverCss as getComponentCss$y } from '../../../../../../components/dist/styles/esm/styles-entry.mjs';
import { getHasNativePopoverSupport, parseAndGetAriaAttributes } from '../../../../../../components/dist/utils/esm/utils-entry.mjs';
import { PIcon } from '../components/icon.wrapper.mjs';

/**
 * @slot {"name": "", "description": "Default slot for the popover content." }
 * @slot {"name": "button", "description": "Slot for custom button." }
 */
class DSRPopover extends Component {
    host;
    isOpen = false;
    popover;
    button;
    slottedButton;
    arrow;
    cleanUpAutoUpdate;
    hasNativePopoverSupport = getHasNativePopoverSupport();
    // TODO: This should be updated when slot is changed
    hasSlottedButton;
    render() {
        const { namedSlotChildren} = splitChildren(this.props.children);
        const hasSlottedButton = namedSlotChildren.filter(({ props: { slot } }) => slot === 'button').length > 0;
        const style = minifyCss(getComponentCss$y(this.props.theme).replace(/(:host {[\S\s]+?})[\S\s]+(button {[\S\s]+?})[\S\s]+(.icon {[\S\s]+?})[\S\s]+(.label {[\S\s]+?})[\S\s]+/, '$1\n$2\n$3\n$4'));
        return (jsxs(Fragment, { children: [jsxs("template", { shadowroot: "open", shadowrootmode: "open", children: [jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsxs(Fragment, { children: [hasSlottedButton ? (jsx("slot", { name: "button" })) : (jsxs("button", { type: "button", ...parseAndGetAriaAttributes({
                                        ...parseAndGetAriaAttributes(this.props.aria),
                                        ...{ 'aria-expanded': this.props.isOpen },
                                    }), children: [jsx(PIcon, { className: "icon", name: "information", theme: this.props.theme }), jsx("span", { className: "label", children: "More information" })] })), this.props.isOpen && (jsxs("div", { popover: "auto", children: [jsx("div", { className: "arrow" }), jsx("div", { className: "content", children: this.props.description ? jsx("p", { children: this.props.description }) : jsx("slot", {}) })] }))] })] }), this.props.children] }));
    }
}

export { DSRPopover };
