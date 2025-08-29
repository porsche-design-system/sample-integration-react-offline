import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { Component } from 'react';
import '../../provider.mjs';
import { splitChildren } from '../../splitChildren.mjs';
import { minifyCss } from '../../minifyCss.mjs';
import { getInlineNotificationCss as getComponentCss$V } from '../../../../../../components/dist/styles/esm/styles-entry.mjs';
import { getInlineNotificationIconName, getContentAriaAttributes } from '../../../../../../components/dist/utils/esm/utils-entry.mjs';
import { PButton } from '../components/button.wrapper.mjs';
import { PButtonPure } from '../components/button-pure.wrapper.mjs';
import { PIcon } from '../components/icon.wrapper.mjs';

/**
 * @slot {"name": "heading", "description": "Shows a heading. Can be used to render rich markup." }
 * @slot {"name": "", "description": "Default slot to render a description. Can be used to render rich markup." }
 */
class DSRInlineNotification extends Component {
    host;
    get hasDismissButton() {
        return this.props.persistent ? false : this.props.dismissButton;
    }
    render() {
        const { namedSlotChildren} = splitChildren(this.props.children);
        const bannerId = 'banner';
        const labelId = 'label';
        const descriptionId = 'description';
        const Heading = this.props.headingTag;
        const style = minifyCss(getComponentCss$V(this.props.state, !!this.props.actionLabel, this.hasDismissButton, this.props.theme));
        return (jsxs(Fragment, { children: [jsxs("template", { shadowroot: "open", shadowrootmode: "open", children: [jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsxs(Fragment, { children: [jsx(PIcon, { className: "icon", name: getInlineNotificationIconName(this.props.state), color: `notification-${this.props.state}`, theme: this.props.theme, "aria-hidden": "true" }), jsxs("div", { id: bannerId, className: "content", ...getContentAriaAttributes(this.props.state, labelId, descriptionId), children: [(this.props.heading || namedSlotChildren.filter(({ props: { slot } }) => slot === 'heading').length > 0) &&
                                            (this.props.heading ? (jsx(Heading, { id: labelId, className: "heading", children: this.props.heading })) : (jsx("slot", { name: "heading" }))), jsx("p", { id: descriptionId, className: "description", children: this.props.description || jsx("slot", {}) })] }), this.props.actionLabel && (jsx(PButtonPure, { className: "action", theme: this.props.theme, icon: this.props.actionIcon, loading: this.props.actionLoading, children: this.props.actionLabel })), this.hasDismissButton && (jsx(PButton, { className: "close", type: "button", variant: "ghost", icon: "close", theme: this.props.theme, hideLabel: true, "aria-controls": bannerId, children: "Close notification" }))] })] }), this.props.children] }));
    }
}

export { DSRInlineNotification };
