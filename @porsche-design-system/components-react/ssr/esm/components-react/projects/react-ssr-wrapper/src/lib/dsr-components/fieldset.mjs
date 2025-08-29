import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { splitChildren } from '../../splitChildren.mjs';
import { Component } from 'react';
import { minifyCss } from '../../minifyCss.mjs';
import { getFieldsetCss as getComponentCss$13 } from '../../../../../../components/dist/styles/esm/styles-entry.mjs';
import { getFieldsetAriaAttributes } from '../../../../../../components/dist/utils/esm/utils-entry.mjs';
import { Required } from './required.mjs';
import { messageId, StateMessage } from './state-message.mjs';

/**
 * @slot {"name": "label", "description": "Shows a label. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 * @slot {"name": "", "description": "Default slot for the main content." }
 * @slot {"name": "message", "description": "Shows a state message. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 */
class DSRFieldset extends Component {
    host;
    render() {
        const { namedSlotChildren} = splitChildren(this.props.children);
        const hasMessageValue = (this.props.message || namedSlotChildren.filter(({ props: { slot } }) => slot === 'message').length > 0) && ['success', 'error'].includes(this.props.state);
        const style = minifyCss(getComponentCss$13(this.props.state, this.props.labelSize, (this.props.label || namedSlotChildren.filter(({ props: { slot } }) => slot === 'label').length > 0), this.props.theme));
        return (jsxs(Fragment, { children: [jsxs("template", { shadowroot: "open", shadowrootmode: "open", children: [jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsxs("fieldset", { "aria-describedby": hasMessageValue ? messageId : null, ...getFieldsetAriaAttributes(this.props.required, this.props.state === 'error', this.props.aria), children: [(this.props.label || namedSlotChildren.filter(({ props: { slot } }) => slot === 'label').length > 0) && (jsxs("legend", { children: [this.props.label || jsx("slot", { name: "label" }), this.props.required && jsx(Required, {})] })), jsx("slot", {}), jsx(StateMessage, { hasMessage: (this.props.message || namedSlotChildren.filter(({ props: { slot } }) => slot === 'message').length > 0) && ['success', 'error'].includes(this.props.state), state: this.props.state, message: this.props.message, theme: this.props.theme, host: null })] })] }), this.props.children] }));
    }
}

export { DSRFieldset };
