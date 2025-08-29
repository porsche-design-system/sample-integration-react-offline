'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
require('../../provider.cjs');
var splitChildren = require('../../splitChildren.cjs');
var minifyCss = require('../../minifyCss.cjs');
var stylesEntry = require('../../../../../../components/dist/styles/esm/styles-entry.cjs');
var loadingMessage = require('./loading-message.cjs');
var stateMessage = require('./state-message.cjs');
var legacyLabel = require('./legacy-label.cjs');
var spinner_wrapper = require('../components/spinner.wrapper.cjs');

/**
 * @slot {"name": "label", "description": "Shows a label. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 * @slot {"name": "", "description": "Default slot for the input." }
 * @slot {"name": "message", "description": "Shows a state message. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 */
class DSRRadioButtonWrapper extends react.Component {
    host;
    initialLoading = false;
    input;
    render() {
        const { namedSlotChildren, otherChildren } = splitChildren.splitChildren(this.props.children);
        const { disabled } = typeof otherChildren[0] === 'object' && 'props' in otherChildren[0] && otherChildren[0]?.props || {};
        const isLoading = this.props.loading && !(typeof otherChildren[0] === 'object' && 'props' in otherChildren[0] && (otherChildren[0]?.props.checked || otherChildren[0]?.props.defaultChecked)); // spinner is only displayed when radio is not checked already
        const style = minifyCss.minifyCss(stylesEntry.getRadioButtonWrapperCss(this.props.hideLabel, this.props.state, disabled, isLoading, this.props.theme));
        return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsxs("template", { shadowroot: "open", shadowrootmode: "open", children: [jsxRuntime.jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsxRuntime.jsxs("div", { className: "root", children: [jsxRuntime.jsx(legacyLabel.LegacyLabel, { hasLabel: this.props.label || namedSlotChildren.filter(({ props: { slot } }) => slot === 'label').length > 0, hasDescription: this.props.description || namedSlotChildren.filter(({ props: { slot } }) => slot === 'description').length > 0, host: null, label: this.props.label, isLoading: isLoading, isDisabled: disabled, formElement: typeof otherChildren[0] === 'object' && 'props' in otherChildren[0] && otherChildren[0]?.props }), jsxRuntime.jsxs("div", { className: "wrapper", children: [jsxRuntime.jsx("slot", {}), isLoading && (jsxRuntime.jsx(spinner_wrapper.PSpinner, { className: "spinner", size: "inherit", theme: this.props.theme, "aria-hidden": "true" }))] }), jsxRuntime.jsx(stateMessage.StateMessage, { hasMessage: (this.props.message || namedSlotChildren.filter(({ props: { slot } }) => slot === 'message').length > 0) && ['success', 'error'].includes(this.props.state), state: this.props.state, message: this.props.message, theme: this.props.theme, host: null }), jsxRuntime.jsx(loadingMessage.LoadingMessage, { loading: isLoading, initialLoading: this.props.initialLoading })] })] }), this.props.children] }));
    }
}

exports.DSRRadioButtonWrapper = DSRRadioButtonWrapper;
