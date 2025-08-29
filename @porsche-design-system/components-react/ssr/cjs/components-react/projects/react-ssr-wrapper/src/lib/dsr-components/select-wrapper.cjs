'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
require('../../provider.cjs');
var splitChildren = require('../../splitChildren.cjs');
var minifyCss = require('../../minifyCss.cjs');
var stylesEntry = require('../../../../../../components/dist/styles/esm/styles-entry.cjs');
var utilsEntry = require('../../../../../../components/dist/utils/esm/utils-entry.cjs');
var stateMessage = require('./state-message.cjs');
var legacyLabel = require('./legacy-label.cjs');
var icon_wrapper = require('../components/icon.wrapper.cjs');
var selectWrapperDropdown_wrapper = require('../components/select-wrapper-dropdown.wrapper.cjs');

/**
 * @slot {"name": "label", "description": "Shows a label. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 * @slot {"name": "description", "description": "Shows a description. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 * @slot {"name": "", "description": "Default slot for the `select` tag." }
 * @slot {"name": "message", "description": "Shows a state message. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 *
 * @deprecated since v3.29.0, will be removed with next major release. Please use `p-select` instead.
 */
class DSRSelectWrapper extends react.Component {
    host;
    select;
    iconElement;
    render() {
        const hasCustomDropdown = utilsEntry.isCustomDropdown(this.props.filter, this.props.native);
        const { namedSlotChildren, otherChildren } = splitChildren.splitChildren(this.props.children);
        const { disabled } = typeof otherChildren[0] === 'object' && 'props' in otherChildren[0] && otherChildren[0]?.props || {};
        const style = minifyCss.minifyCss(stylesEntry.getSelectWrapperCss(disabled, hasCustomDropdown, this.props.hideLabel, this.props.state, this.props.theme));
        return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsxs("template", { shadowroot: "open", shadowrootmode: "open", shadowrootdelegatesfocus: "true", children: [jsxRuntime.jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsxRuntime.jsxs("div", { className: "root", children: [jsxRuntime.jsx(legacyLabel.LegacyLabel, { hasLabel: this.props.label || namedSlotChildren.filter(({ props: { slot } }) => slot === 'label').length > 0, hasDescription: this.props.description || namedSlotChildren.filter(({ props: { slot } }) => slot === 'description').length > 0, host: null, label: this.props.label, description: this.props.description, isDisabled: disabled, formElement: typeof otherChildren[0] === 'object' && 'props' in otherChildren[0] && otherChildren[0]?.props }), jsxRuntime.jsxs("div", { className: "wrapper", children: [jsxRuntime.jsx("slot", {}), jsxRuntime.jsx(icon_wrapper.PIcon, { className: "icon", name: "arrow-head-down", theme: this.props.theme, color: disabled ? 'state-disabled' : 'primary', "aria-hidden": "true" }), hasCustomDropdown && !disabled && (jsxRuntime.jsx(selectWrapperDropdown_wrapper.PSelectWrapperDropdown, { className: "dropdown", selectRef: typeof otherChildren[0] === 'object' && 'props' in otherChildren[0] && otherChildren[0]?.props, label: this.props.label || namedSlotChildren.find(({ props: { slot } }) => slot === 'label')?.props.children, message: this.props.message || namedSlotChildren.find(({ props: { slot } }) => slot === 'message')?.props.children, description: this.props.description || namedSlotChildren.find(({ props: { slot } }) => slot === 'description')?.props.children, state: this.props.state, direction: this.props.dropdownDirection, filter: this.props.filter, theme: this.props.theme, required: false, disabled: disabled, onOpenChange: (isOpen) => this.props.iconElement.classList.toggle('icon--open', isOpen) }))] }), jsxRuntime.jsx(stateMessage.StateMessage, { hasMessage: (this.props.message || namedSlotChildren.filter(({ props: { slot } }) => slot === 'message').length > 0) && ['success', 'error'].includes(this.props.state), state: this.props.state, message: this.props.message, theme: this.props.theme, host: null })] })] }), this.props.children] }));
    }
}

exports.DSRSelectWrapper = DSRSelectWrapper;
