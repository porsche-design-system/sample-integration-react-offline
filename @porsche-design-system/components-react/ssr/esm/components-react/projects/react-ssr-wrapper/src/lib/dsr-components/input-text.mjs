import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { splitChildren } from '../../splitChildren.mjs';
import { Component } from 'react';
import { minifyCss } from '../../minifyCss.mjs';
import { getInputTextCss as getComponentCss$O } from '../../../../../../components/dist/styles/esm/styles-entry.mjs';
import { InputBase } from './input-base.mjs';

/**
 * @slot {"name": "label", "description": "Shows a label. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed."}
 * @slot {"name": "description", "description": "Shows a description. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed."}
 * @slot {"name": "message", "description": "Shows a state message. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed."}
 * @slot {"name": "start", "description": "Shows content at the start of the input (e.g. unit prefix)."}
 * @slot {"name": "end", "description": "Shows content at the end of the input (e.g. toggle button, unit suffix)."}
 */
class DSRInputText extends Component {
    host;
    // The "name" property is reflected as an attribute to ensure compatibility with native form submission.
    // In the React wrapper, all props are synced as properties on the element ref, so reflecting "name" as an attribute ensures it is properly handled in the form submission process.
    internals;
    initialLoading = false;
    inputElement;
    defaultValue;
    formResetCallback() {
        // triggers value watcher
    }
    formDisabledCallback() {
    }
    formStateRestoreCallback() {
    }
    render() {
        splitChildren(this.props.children);
        const style = minifyCss(getComponentCss$O(this.props.disabled, this.props.loading, this.props.hideLabel, this.props.state, this.props.compact, this.props.readOnly, this.props.theme, this.props.counter));
        return (jsxs(Fragment, { children: [jsxs("template", { shadowroot: "open", shadowrootmode: "open", shadowrootdelegatesfocus: "true", children: [jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsx(InputBase, { children: this.props.children, host: null, label: this.props.label, description: this.props.description, id: "input-text", name: this.props.name, form: this.props.form, type: "text", required: this.props.required, placeholder: this.props.placeholder, maxLength: this.props.maxLength, minLength: this.props.minLength, value: this.props.value, readOnly: this.props.readOnly, autoComplete: this.props.autoComplete, disabled: this.props.disabled, state: this.props.state, message: this.props.message, theme: this.props.theme, spellCheck: this.props.spellCheck, loading: this.props.loading, initialLoading: this.props.initialLoading, ...(this.props.counter && {
                                end: (jsxs(Fragment, { children: [jsx("span", { className: "sr-only", "aria-live": "polite", children: this.props.maxLength
                                                ? `You have ${this.props.maxLength - this.props.value.length} out of ${this.props.maxLength} characters left`
                                                : `${this.props.value.length} characters entered` }), jsx("span", { className: "counter", "aria-hidden": "true", children: this.props.maxLength ? `${this.props.value.length}/${this.props.maxLength}` : `${this.props.value.length}` })] })),
                            }) })] }), this.props.children] }));
    }
}

export { DSRInputText };
