import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { Component } from 'react';
import '../../provider.mjs';
import { splitChildren } from '../../splitChildren.mjs';
import { minifyCss } from '../../minifyCss.mjs';
import { getPinCodeCss as getComponentCss$z } from '../../../../../../components/dist/styles/esm/styles-entry.mjs';
import { labelId, descriptionId, isCurrentInput } from '../../../../../../components/dist/utils/esm/utils-entry.mjs';
import { LoadingMessage } from './loading-message.mjs';
import { Label } from './label.mjs';
import { messageId, StateMessage } from './state-message.mjs';
import { PSpinner } from '../components/spinner.wrapper.mjs';

/**
 * @slot {"name": "label", "description": "Shows a label. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 * @slot {"name": "description", "description": "Shows a description. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 * @slot {"name": "message", "description": "Shows a state message. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 *
 * @controlled { "props": ["value"], "event": "update", "isInternallyMutated": true }
 */
class DSRPinCode extends Component {
    host;
    // The "name" property is reflected as an attribute to ensure compatibility with native form submission.
    // In the React wrapper, all props are synced as properties on the element ref, so reflecting "name" as an attribute ensures it is properly handled in the form submission process.
    internals;
    initialLoading = false;
    defaultValue;
    inputElements = [];
    formResetCallback() {
        this.props.internals?.setFormValue(this.props.defaultValue);
    }
    formDisabledCallback() {
    }
    formStateRestoreCallback() {
    }
    render() {
        const { namedSlotChildren} = splitChildren(this.props.children);
        // reset array of input elements
        this.inputElements = [];
        const currentInputId = 'current-input';
        const style = minifyCss(getComponentCss$z(this.props.hideLabel, this.props.state, this.props.disabled, this.props.loading, this.props.length, this.props.theme));
        return (jsxs(Fragment, { children: [jsxs("template", { shadowroot: "open", shadowrootmode: "open", shadowrootdelegatesfocus: "true", children: [jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsxs("div", { className: "root", children: [jsx(Label, { hasLabel: this.props.label || namedSlotChildren.filter(({ props: { slot } }) => slot === 'label').length > 0, hasDescription: this.props.description || namedSlotChildren.filter(({ props: { slot } }) => slot === 'description').length > 0, host: null, label: this.props.label, description: this.props.description, htmlFor: currentInputId, isRequired: this.props.required, isLoading: this.props.loading, isDisabled: this.props.disabled }), jsxs("div", { className: "wrapper", children: [Array.from(new Array(this.props.length), (_, index) => (jsx("input", { name: this.props.name, form: this.props.form, ...(isCurrentInput(index, this.props.value, this.props.length) && { id: currentInputId }), type: this.props.type === 'number' ? 'text' : this.props.type, "aria-label": `${index + 1}-${this.props.length}`, "aria-describedby": `${labelId} ${descriptionId} ${messageId}`, "aria-invalid": this.props.state === 'error' ? 'true' : null, "aria-disabled": this.props.loading ? 'true' : null, autoComplete: "one-time-code", pattern: "\\d*", inputMode: "numeric" // get numeric keyboard on mobile
                                            , defaultValue: this.props.value[index] === ' ' ? null : this.props.value[index], disabled: this.props.disabled, required: this.props.required }, index))), this.props.loading && (jsx(PSpinner, { className: "spinner", size: "inherit", theme: this.props.theme, "aria-hidden": "true" }))] }), jsx(StateMessage, { hasMessage: (this.props.message || namedSlotChildren.filter(({ props: { slot } }) => slot === 'message').length > 0) && ['success', 'error'].includes(this.props.state), state: this.props.state, message: this.props.message, theme: this.props.theme, host: null }), jsx(LoadingMessage, { loading: this.props.loading, initialLoading: this.props.initialLoading })] })] }), this.props.children] }));
    }
}

export { DSRPinCode };
