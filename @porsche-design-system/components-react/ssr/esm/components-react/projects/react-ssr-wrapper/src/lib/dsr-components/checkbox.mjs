import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { Component } from 'react';
import '../../provider.mjs';
import { splitChildren } from '../../splitChildren.mjs';
import { minifyCss } from '../../minifyCss.mjs';
import { getCheckboxCss as getComponentCss$1c } from '../../../../../../components/dist/styles/esm/styles-entry.mjs';
import { descriptionId } from '../../../../../../components/dist/utils/esm/utils-entry.mjs';
import { LoadingMessage } from './loading-message.mjs';
import { Label } from './label.mjs';
import { messageId, StateMessage } from './state-message.mjs';
import { PSpinner } from '../components/spinner.wrapper.mjs';

/**
 * @slot {"name": "label", "description": "Shows a label. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 * @slot {"name": "message", "description": "Shows a state message. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 */
class DSRCheckbox extends Component {
    host;
    // The "name" property is reflected as an attribute to ensure compatibility with native form submission.
    // In the React wrapper, all props are synced as properties on the element ref, so reflecting "name" as an attribute ensures it is properly handled in the form submission process.
    internals;
    initialLoading = false;
    defaultChecked;
    checkboxInputElement;
    formResetCallback() {
        this.props.internals?.setFormValue(this.props.defaultChecked ? this.props.value : undefined);
    }
    formDisabledCallback() {
    }
    formStateRestoreCallback() {
    }
    render() {
        const { namedSlotChildren} = splitChildren(this.props.children);
        const id = 'checkbox';
        const style = minifyCss(getComponentCss$1c(this.props.hideLabel, this.props.state, this.props.disabled, this.props.loading, this.props.compact, this.props.theme));
        return (jsxs(Fragment, { children: [jsxs("template", { shadowroot: "open", shadowrootmode: "open", shadowrootdelegatesfocus: "true", children: [jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsxs("div", { className: "root", children: [jsx(Label, { hasLabel: this.props.label || namedSlotChildren.filter(({ props: { slot } }) => slot === 'label').length > 0, hasDescription: this.props.description || namedSlotChildren.filter(({ props: { slot } }) => slot === 'description').length > 0, host: null, htmlFor: id, label: this.props.label, isLoading: this.props.loading, isDisabled: this.props.disabled, isRequired: this.props.required }), jsxs("div", { className: "wrapper", children: [jsx("input", { type: "checkbox", id: id, "aria-describedby": `${descriptionId} ${messageId}`, "aria-invalid": this.props.state === 'error' ? 'true' : null, "aria-disabled": this.props.loading || this.props.disabled ? 'true' : null, checked: this.props.checked, form: this.props.form, value: this.props.value, name: this.props.name, onBlur: this.props.onBlur, required: this.props.required, disabled: this.props.disabled }), this.props.loading && (jsx(PSpinner, { className: "spinner", size: "inherit", theme: this.props.theme, "aria-hidden": "true" }))] }), jsx(StateMessage, { hasMessage: (this.props.message || namedSlotChildren.filter(({ props: { slot } }) => slot === 'message').length > 0) && ['success', 'error'].includes(this.props.state), state: this.props.state, message: this.props.message, theme: this.props.theme, host: null }), jsx(LoadingMessage, { loading: this.props.loading, initialLoading: this.props.initialLoading })] })] }), this.props.children] }));
    }
}

export { DSRCheckbox };
