import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { Component } from 'react';
import '../../provider.mjs';
import { splitChildren } from '../../splitChildren.mjs';
import { minifyCss } from '../../minifyCss.mjs';
import { getBannerCss as getComponentCss$1k } from '../../../../../../components/dist/styles/esm/styles-entry.mjs';
import { PInlineNotification } from '../components/inline-notification.wrapper.mjs';

/**
 * @slot {"name": "heading", "description": "Defines the heading used in the banner. Can be used alternatively to the heading prop. Can be used for rich content.", "hasAltProp": true }
 * @slot {"name": "title", "description": "Please use the heading prop or slot=\"heading\" instead.", "hasAltProp": true, "isDeprecated": true }
 * @slot {"name": "description", "description": "Defines the description used in the banner. Can be used alternatively to the description prop. Can be used for rich content.", "hasAltProp": true }
 *
 * @controlled {"props": ["open"], "event": "dismiss"}
 */
class DSRBanner extends Component {
    host;
    inlineNotificationElement;
    closeBtn;
    get hasDismissButton() {
        return this.props.persistent ? false : this.props.dismissButton;
    }
    render() {
        const { namedSlotChildren} = splitChildren(this.props.children);
        const hasTitleSlot = namedSlotChildren.filter(({ props: { slot } }) => slot === 'title').length > 0;
        const style = minifyCss(getComponentCss$1k(this.props.open));
        return (jsxs(Fragment, { children: [jsxs("template", { shadowroot: "open", shadowrootmode: "open", children: [jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsx(Fragment, { children: jsxs(PInlineNotification, { heading: this.props.heading, headingTag: this.props.headingTag, description: this.props.description, state: this.props.state, dismissButton: this.hasDismissButton, theme: this.props.theme, "aria-hidden": this.props.open ? 'false' : 'true', children: [namedSlotChildren.filter(({ props: { slot } }) => slot === 'heading').length > 0 ? (jsx("slot", { name: "heading", slot: "heading" })) : (hasTitleSlot && jsx("slot", { name: "title", slot: "heading" })), namedSlotChildren.filter(({ props: { slot } }) => slot === 'description').length > 0 && jsx("slot", { name: "description" })] }) })] }), this.props.children] }));
    }
}

export { DSRBanner };
