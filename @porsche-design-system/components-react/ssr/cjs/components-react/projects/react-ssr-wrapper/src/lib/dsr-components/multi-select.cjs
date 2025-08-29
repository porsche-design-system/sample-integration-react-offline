'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
require('../../provider.cjs');
var splitChildren = require('../../splitChildren.cjs');
var minifyCss = require('../../minifyCss.cjs');
var stylesEntry = require('../../../../../../components/dist/styles/esm/styles-entry.cjs');
var utilsEntry = require('../../../../../../components/dist/utils/esm/utils-entry.cjs');
var buttonPure_wrapper = require('../components/button-pure.wrapper.cjs');
var label = require('./label.cjs');
var stateMessage = require('./state-message.cjs');
var icon_wrapper = require('../components/icon.wrapper.cjs');
var inputSearch_wrapper = require('../components/input-search.wrapper.cjs');
var noResultsOption = require('./no-results-option.cjs');

/**
 * @slot {"name": "label", "description": "Shows a label. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 * @slot {"name": "description", "description": "Shows a description. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 * @slot {"name": "", "description": "Default slot for the p-multi-select-option tags." }
 * @slot {"name": "message", "description": "Shows a state message. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 *
 * @controlled { "props": ["value"], "event": "update", "isInternallyMutated": true }
 */
class DSRMultiSelect extends react.Component {
    host;
    // The "name" property is reflected as an attribute to ensure compatibility with native form submission.
    // In the React wrapper, all props are synced as properties on the element ref, so reflecting "name" as an attribute ensures it is properly handled in the form submission process.
    isOpen = false;
    hasFilterResults = true;
    internals;
    defaultValue;
    multiSelectOptions = [];
    multiSelectOptgroups = [];
    buttonElement;
    inputSearchElement;
    inputSearchInputElement;
    listboxElement;
    resetButtonElement;
    preventOptionUpdate = false; // Used to prevent value watcher from updating options when options are already updated
    popoverElement;
    hasNativePopoverSupport = utilsEntry.getHasNativePopoverSupport();
    cleanUpAutoUpdate;
    currentlyHighlightedOption = null;
    get currentValue() {
        return utilsEntry.getSelectedOptionValues(splitChildren.splitChildren(this.props.children).otherChildren);
    }
    setFormValue(value) {
        const formData = new FormData();
        for (const val of value) {
            formData.append(this.props.name, val);
        }
        this.props.internals?.setFormValue(formData);
    }
    formDisabledCallback() {
    }
    formStateRestoreCallback() {
    }
    formResetCallback() {
        this.props.setFormValue(this.props.defaultValue);
    }
    render() {
        const { namedSlotChildren, otherChildren } = splitChildren.splitChildren(this.props.children);
        const buttonId = 'button';
        const popoverId = 'list';
        const descriptionId = this.props.description ? 'description' : undefined;
        const selectMessageId = (this.props.message || namedSlotChildren.filter(({ props: { slot } }) => slot === 'message').length > 0) && ['success', 'error'].includes(this.props.state) ? stateMessage.messageId : undefined;
        const ariaDescribedBy = [descriptionId, selectMessageId].filter(Boolean).join(' ');
        const style = minifyCss.minifyCss(stylesEntry.getMultiSelectCss(this.props.isOpen, this.props.disabled, this.props.hideLabel, this.props.state, this.props.compact, this.props.theme));
        return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsxs("template", { shadowroot: "open", shadowrootmode: "open", shadowrootdelegatesfocus: "true", children: [jsxRuntime.jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsxRuntime.jsxs("div", { className: "root", children: [jsxRuntime.jsx(label.Label, { hasLabel: this.props.label || namedSlotChildren.filter(({ props: { slot } }) => slot === 'label').length > 0, hasDescription: this.props.description || namedSlotChildren.filter(({ props: { slot } }) => slot === 'description').length > 0, host: null, label: this.props.label, description: this.props.description, htmlFor: buttonId, isRequired: this.props.required, isDisabled: this.props.disabled }), jsxRuntime.jsxs("button", { "aria-invalid": this.props.state === 'error' ? 'true' : null, type: "button", role: "combobox", id: buttonId, ...utilsEntry.getComboboxAriaAttributes(this.props.isOpen, this.props.required, utilsEntry.labelId, ariaDescribedBy, popoverId), disabled: this.props.disabled, children: [jsxRuntime.jsx("span", { children: utilsEntry.getSelectedOptionsString(otherChildren) }), this.props.currentValue && (jsxRuntime.jsx(buttonPure_wrapper.PButtonPure, { type: "button", className: "button", icon: "close", hideLabel: true, theme: this.props.theme, disabled: this.props.disabled, children: "Reset selection" })), jsxRuntime.jsx(icon_wrapper.PIcon, { className: "icon", name: "arrow-head-down", theme: this.props.theme, color: this.props.disabled ? 'state-disabled' : 'primary', "aria-hidden": "true" })] }), jsxRuntime.jsxs("div", { id: popoverId, popover: "manual", tabIndex: -1, role: "dialog", "aria-label": this.props.label, "aria-hidden": this.props.isOpen ? null : 'true', children: [jsxRuntime.jsx(inputSearch_wrapper.PInputSearch, { className: "filter", name: "filter", label: "Filter options", hideLabel: true, autoComplete: "off", clear: true, indicator: true, compact: true, theme: this.props.theme }), jsxRuntime.jsxs("div", { className: "options", role: "listbox", "aria-label": this.props.label, "aria-multiselectable": "true", onPointerMove: this.props.onPointerMove, children: [!this.props.hasFilterResults && jsxRuntime.jsx(noResultsOption.NoResultsOption, {}), jsxRuntime.jsx("slot", {})] })] }), jsxRuntime.jsx(stateMessage.StateMessage, { hasMessage: (this.props.message || namedSlotChildren.filter(({ props: { slot } }) => slot === 'message').length > 0) && ['success', 'error'].includes(this.props.state), state: this.props.state, message: this.props.message, theme: this.props.theme, host: null })] })] }), this.props.children] }));
    }
}

exports.DSRMultiSelect = DSRMultiSelect;
