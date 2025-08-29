'use strict';

var react = require('react');
var jsxRuntime = require('react/jsx-runtime');
require('../../provider.cjs');
var splitChildren = require('../../splitChildren.cjs');
var minifyCss = require('../../minifyCss.cjs');
var stylesEntry = require('../../../../../../components/dist/styles/esm/styles-entry.cjs');
var utilsEntry = require('../../../../../../components/dist/utils/esm/utils-entry.cjs');
var buttonPure_wrapper = require('../components/button-pure.wrapper.cjs');
var stateMessage = require('./state-message.cjs');
var legacyLabel = require('./legacy-label.cjs');
var icon_wrapper = require('../components/icon.wrapper.cjs');

/**
 * @slot {"name": "label", "description": "Shows a label. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 * @slot {"name": "description", "description": "Shows a description. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 * @slot {"name": "", "description": "Default slot for the input." }
 * @slot {"name": "message", "description": "Shows a state message. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 *
 * @deprecated since v3.29.0, will be removed with next major release. Please use one of the specific input components instead: `p-input-date`, `p-input-email`, `p-input-number`, `p-input-password`, `p-input-search`, `p-input-tel`, `p-input-text`, `p-input-time` or `p-input-url`.
 */
class DSRTextFieldWrapper extends react.Component {
    host;
    showPassword = false;
    isClearable = false;
    input;
    unitOrCounterElement;
    ariaElement;
    isSearch;
    isPassword;
    isCalendar;
    isTime;
    isWithinForm;
    hasAction;
    hasCounter;
    isCounterVisible;
    hasUnit;
    eventListener;
    render() {
        const { namedSlotChildren, otherChildren } = splitChildren.splitChildren(this.props.children);
        const { readOnly, disabled, type } = typeof otherChildren[0] === 'object' && 'props' in otherChildren[0] && otherChildren[0]?.props || {};
        const disabledOrReadOnly = disabled || readOnly;
        const buttonProps = {
            hideLabel: true,
            theme: this.props.theme,
            className: 'button',
        };
        const isSearch = utilsEntry.isType(type, 'search');
        const isPassword = utilsEntry.isType(type, 'password');
        const isCalendar = utilsEntry.isType(type, 'date') || utilsEntry.isType(type, 'week') || utilsEntry.isType(type, 'month');
        const isTime = utilsEntry.isType(type, 'time');
        utilsEntry.isWithinForm(this.props.host);
        const hasAction = utilsEntry.hasLocateAction(this.props.actionIcon);
        const isClearable = typeof otherChildren[0] === 'object' && 'props' in otherChildren[0] && !!otherChildren[0]?.props.value;
        const hasCounter = false; // hasCounterAndIsTypeText(otherChildren[0]?.props);
        const style = minifyCss.minifyCss(stylesEntry.getTextFieldWrapperCss(disabled, readOnly, this.props.hideLabel, this.props.state, this.props.isCounterVisible, this.props.isCounterVisible ? 'suffix' : this.props.unitPosition, isPassword ? 'password' : type, this.props.showPasswordToggle, this.props.isWithinForm, this.props.submitButton, this.props.theme));
        return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsxs("template", { shadowroot: "open", shadowrootmode: "open", children: [jsxRuntime.jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsxRuntime.jsxs("div", { className: "root", children: [jsxRuntime.jsx(legacyLabel.LegacyLabel, { hasLabel: this.props.label || namedSlotChildren.filter(({ props: { slot } }) => slot === 'label').length > 0, hasDescription: this.props.description || namedSlotChildren.filter(({ props: { slot } }) => slot === 'description').length > 0, host: null, label: this.props.label, description: this.props.description, formElement: typeof otherChildren[0] === 'object' && 'props' in otherChildren[0] && otherChildren[0]?.props, isDisabled: disabled }), jsxRuntime.jsxs("div", { className: "wrapper", children: [jsxRuntime.jsx("slot", {}), hasCounter, (this.props.isCounterVisible) && (jsxRuntime.jsx("span", { className: "unit-counter", "aria-hidden": "true", children: this.props.unit })), isPassword && this.props.showPasswordToggle ? (jsxRuntime.jsx(buttonPure_wrapper.PButtonPure, { ...buttonProps, type: "button", icon: this.props.showPassword ? 'view-off' : 'view', disabled: disabled, aria: { 'aria-pressed': this.props.showPassword ? 'true' : 'false' }, children: "Toggle password visibility" })) : utilsEntry.showCustomCalendarOrTimeIndicator(isCalendar, isTime) ? (jsxRuntime.jsxs(buttonPure_wrapper.PButtonPure, { ...buttonProps, type: "button", icon: isCalendar ? 'calendar' : 'clock', disabled: disabled, children: ["Show $", isCalendar ? 'date' : 'time', " picker"] })) : (isSearch && [
                                            // TODO: create an own component, which would fix SSR support too
                                            this.props.isWithinForm && this.props.submitButton ? (react.createElement(buttonPure_wrapper.PButtonPure, { ...buttonProps, key: "btn-submit", type: "submit", icon: "search", disabled: disabledOrReadOnly }, "Search")) : (jsxRuntime.jsx(icon_wrapper.PIcon, { className: "icon", name: "search", color: "state-disabled", theme: this.props.theme, "aria-hidden": "true" }, "icon")),
                                            react.createElement(buttonPure_wrapper.PButtonPure, { ...buttonProps, key: "btn-clear", type: "button", icon: "close", tabIndex: -1, hidden: !isClearable, disabled: disabledOrReadOnly }, "Clear field"),
                                            hasAction && (react.createElement(buttonPure_wrapper.PButtonPure, { ...buttonProps, key: "btn-action", type: "button", icon: "locate", hidden: isClearable, disabled: disabledOrReadOnly, loading: this.props.actionLoading }, "Locate me")),
                                        ])] }), jsxRuntime.jsx(stateMessage.StateMessage, { hasMessage: (this.props.message || namedSlotChildren.filter(({ props: { slot } }) => slot === 'message').length > 0) && ['success', 'error'].includes(this.props.state), state: this.props.state, message: this.props.message, theme: this.props.theme, host: null })] })] }), this.props.children] }));
    }
}

exports.DSRTextFieldWrapper = DSRTextFieldWrapper;
