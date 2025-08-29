import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { Component } from 'react';
import '../../provider.mjs';
import { splitChildren } from '../../splitChildren.mjs';
import { minifyCss } from '../../minifyCss.mjs';
import { getRadioButtonWrapperCss as getComponentCss$x } from '../../../../../../components/dist/styles/esm/styles-entry.mjs';
import { LoadingMessage } from './loading-message.mjs';
import { StateMessage } from './state-message.mjs';
import { LegacyLabel } from './legacy-label.mjs';
import { PSpinner } from '../components/spinner.wrapper.mjs';

/**
 * @slot {"name": "label", "description": "Shows a label. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 * @slot {"name": "", "description": "Default slot for the input." }
 * @slot {"name": "message", "description": "Shows a state message. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 */
class DSRRadioButtonWrapper extends Component {
    host;
    initialLoading = false;
    input;
    render() {
        const { namedSlotChildren, otherChildren } = splitChildren(this.props.children);
        const { disabled } = typeof otherChildren[0] === 'object' && 'props' in otherChildren[0] && otherChildren[0]?.props || {};
        const isLoading = this.props.loading && !(typeof otherChildren[0] === 'object' && 'props' in otherChildren[0] && (otherChildren[0]?.props.checked || otherChildren[0]?.props.defaultChecked)); // spinner is only displayed when radio is not checked already
        const style = minifyCss(getComponentCss$x(this.props.hideLabel, this.props.state, disabled, isLoading, this.props.theme));
        return (jsxs(Fragment, { children: [jsxs("template", { shadowroot: "open", shadowrootmode: "open", children: [jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsxs("div", { className: "root", children: [jsx(LegacyLabel, { hasLabel: this.props.label || namedSlotChildren.filter(({ props: { slot } }) => slot === 'label').length > 0, hasDescription: this.props.description || namedSlotChildren.filter(({ props: { slot } }) => slot === 'description').length > 0, host: null, label: this.props.label, isLoading: isLoading, isDisabled: disabled, formElement: typeof otherChildren[0] === 'object' && 'props' in otherChildren[0] && otherChildren[0]?.props }), jsxs("div", { className: "wrapper", children: [jsx("slot", {}), isLoading && (jsx(PSpinner, { className: "spinner", size: "inherit", theme: this.props.theme, "aria-hidden": "true" }))] }), jsx(StateMessage, { hasMessage: (this.props.message || namedSlotChildren.filter(({ props: { slot } }) => slot === 'message').length > 0) && ['success', 'error'].includes(this.props.state), state: this.props.state, message: this.props.message, theme: this.props.theme, host: null }), jsx(LoadingMessage, { loading: isLoading, initialLoading: this.props.initialLoading })] })] }), this.props.children] }));
    }
}

export { DSRRadioButtonWrapper };
