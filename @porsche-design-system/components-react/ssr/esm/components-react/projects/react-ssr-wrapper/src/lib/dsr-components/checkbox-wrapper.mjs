import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { Component } from 'react';
import '../../provider.mjs';
import { splitChildren } from '../../splitChildren.mjs';
import { minifyCss } from '../../minifyCss.mjs';
import { getCheckboxWrapperCss as getComponentCss$1d } from '../../../../../../components/dist/styles/esm/styles-entry.mjs';
import { LoadingMessage } from './loading-message.mjs';
import { StateMessage } from './state-message.mjs';
import { LegacyLabel } from './legacy-label.mjs';
import { PSpinner } from '../components/spinner.wrapper.mjs';

/**
 * @slot {"name": "label", "description": "Shows a label. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 * @slot {"name": "", "description": "Default slot for the input." }
 * @slot {"name": "message", "description": "Shows a state message. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 *
 * @deprecated since v3.29.0, will be removed with next major release. Please use `p-checkbox` instead.
 */
class DSRCheckboxWrapper extends Component {
    host;
    initialLoading = false;
    input;
    render() {
        const { namedSlotChildren, otherChildren } = splitChildren(this.props.children);
        const { disabled } = typeof otherChildren[0] === 'object' && 'props' in otherChildren[0] && otherChildren[0]?.props || {};
        const style = minifyCss(getComponentCss$1d(this.props.hideLabel, this.props.state, disabled, this.props.loading, this.props.theme));
        return (jsxs(Fragment, { children: [jsxs("template", { shadowroot: "open", shadowrootmode: "open", children: [jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsxs("div", { className: "root", children: [jsx(LegacyLabel, { hasLabel: this.props.label || namedSlotChildren.filter(({ props: { slot } }) => slot === 'label').length > 0, hasDescription: this.props.description || namedSlotChildren.filter(({ props: { slot } }) => slot === 'description').length > 0, host: null, label: this.props.label, isLoading: this.props.loading, isDisabled: disabled, formElement: typeof otherChildren[0] === 'object' && 'props' in otherChildren[0] && otherChildren[0]?.props }), jsxs("div", { className: "wrapper", children: [jsx("slot", {}), this.props.loading && (jsx(PSpinner, { className: "spinner", size: "inherit", theme: this.props.theme, "aria-hidden": "true" }))] }), jsx(StateMessage, { hasMessage: (this.props.message || namedSlotChildren.filter(({ props: { slot } }) => slot === 'message').length > 0) && ['success', 'error'].includes(this.props.state), state: this.props.state, message: this.props.message, theme: this.props.theme, host: null }), jsx(LoadingMessage, { loading: this.props.loading, initialLoading: this.props.initialLoading })] })] }), this.props.children] }));
    }
}

export { DSRCheckboxWrapper };
