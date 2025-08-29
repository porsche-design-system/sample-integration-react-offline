import { Component, createElement } from 'react';
import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import '../../provider.mjs';
import { splitChildren } from '../../splitChildren.mjs';
import { minifyCss } from '../../minifyCss.mjs';
import { getTextFieldWrapperCss as getComponentCss$8 } from '../../../../../../components/dist/styles/esm/styles-entry.mjs';
import { isWithinForm, hasLocateAction, isType, showCustomCalendarOrTimeIndicator } from '../../../../../../components/dist/utils/esm/utils-entry.mjs';
import { PButtonPure } from '../components/button-pure.wrapper.mjs';
import { StateMessage } from './state-message.mjs';
import { LegacyLabel } from './legacy-label.mjs';
import { PIcon } from '../components/icon.wrapper.mjs';

/**
 * @slot {"name": "label", "description": "Shows a label. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 * @slot {"name": "description", "description": "Shows a description. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 * @slot {"name": "", "description": "Default slot for the input." }
 * @slot {"name": "message", "description": "Shows a state message. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 *
 * @deprecated since v3.29.0, will be removed with next major release. Please use one of the specific input components instead: `p-input-date`, `p-input-email`, `p-input-number`, `p-input-password`, `p-input-search`, `p-input-tel`, `p-input-text`, `p-input-time` or `p-input-url`.
 */
class DSRTextFieldWrapper extends Component {
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
        const { namedSlotChildren, otherChildren } = splitChildren(this.props.children);
        const { readOnly, disabled, type } = typeof otherChildren[0] === 'object' && 'props' in otherChildren[0] && otherChildren[0]?.props || {};
        const disabledOrReadOnly = disabled || readOnly;
        const buttonProps = {
            hideLabel: true,
            theme: this.props.theme,
            className: 'button',
        };
        const isSearch = isType(type, 'search');
        const isPassword = isType(type, 'password');
        const isCalendar = isType(type, 'date') || isType(type, 'week') || isType(type, 'month');
        const isTime = isType(type, 'time');
        isWithinForm(this.props.host);
        const hasAction = hasLocateAction(this.props.actionIcon);
        const isClearable = typeof otherChildren[0] === 'object' && 'props' in otherChildren[0] && !!otherChildren[0]?.props.value;
        const hasCounter = false; // hasCounterAndIsTypeText(otherChildren[0]?.props);
        const style = minifyCss(getComponentCss$8(disabled, readOnly, this.props.hideLabel, this.props.state, this.props.isCounterVisible, this.props.isCounterVisible ? 'suffix' : this.props.unitPosition, isPassword ? 'password' : type, this.props.showPasswordToggle, this.props.isWithinForm, this.props.submitButton, this.props.theme));
        return (jsxs(Fragment, { children: [jsxs("template", { shadowroot: "open", shadowrootmode: "open", children: [jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsxs("div", { className: "root", children: [jsx(LegacyLabel, { hasLabel: this.props.label || namedSlotChildren.filter(({ props: { slot } }) => slot === 'label').length > 0, hasDescription: this.props.description || namedSlotChildren.filter(({ props: { slot } }) => slot === 'description').length > 0, host: null, label: this.props.label, description: this.props.description, formElement: typeof otherChildren[0] === 'object' && 'props' in otherChildren[0] && otherChildren[0]?.props, isDisabled: disabled }), jsxs("div", { className: "wrapper", children: [jsx("slot", {}), hasCounter, (this.props.isCounterVisible) && (jsx("span", { className: "unit-counter", "aria-hidden": "true", children: this.props.unit })), isPassword && this.props.showPasswordToggle ? (jsx(PButtonPure, { ...buttonProps, type: "button", icon: this.props.showPassword ? 'view-off' : 'view', disabled: disabled, aria: { 'aria-pressed': this.props.showPassword ? 'true' : 'false' }, children: "Toggle password visibility" })) : showCustomCalendarOrTimeIndicator(isCalendar, isTime) ? (jsxs(PButtonPure, { ...buttonProps, type: "button", icon: isCalendar ? 'calendar' : 'clock', disabled: disabled, children: ["Show $", isCalendar ? 'date' : 'time', " picker"] })) : (isSearch && [
                                            // TODO: create an own component, which would fix SSR support too
                                            this.props.isWithinForm && this.props.submitButton ? (createElement(PButtonPure, { ...buttonProps, key: "btn-submit", type: "submit", icon: "search", disabled: disabledOrReadOnly }, "Search")) : (jsx(PIcon, { className: "icon", name: "search", color: "state-disabled", theme: this.props.theme, "aria-hidden": "true" }, "icon")),
                                            createElement(PButtonPure, { ...buttonProps, key: "btn-clear", type: "button", icon: "close", tabIndex: -1, hidden: !isClearable, disabled: disabledOrReadOnly }, "Clear field"),
                                            hasAction && (createElement(PButtonPure, { ...buttonProps, key: "btn-action", type: "button", icon: "locate", hidden: isClearable, disabled: disabledOrReadOnly, loading: this.props.actionLoading }, "Locate me")),
                                        ])] }), jsx(StateMessage, { hasMessage: (this.props.message || namedSlotChildren.filter(({ props: { slot } }) => slot === 'message').length > 0) && ['success', 'error'].includes(this.props.state), state: this.props.state, message: this.props.message, theme: this.props.theme, host: null })] })] }), this.props.children] }));
    }
}

export { DSRTextFieldWrapper };
