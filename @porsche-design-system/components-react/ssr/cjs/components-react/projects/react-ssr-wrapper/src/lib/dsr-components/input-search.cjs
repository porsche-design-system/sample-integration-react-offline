'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
require('../../provider.cjs');
var splitChildren = require('../../splitChildren.cjs');
var minifyCss = require('../../minifyCss.cjs');
var stylesEntry = require('../../../../../../components/dist/styles/esm/styles-entry.cjs');
var buttonPure_wrapper = require('../components/button-pure.wrapper.cjs');
var icon_wrapper = require('../components/icon.wrapper.cjs');
var inputBase = require('./input-base.cjs');

/**
 * @slot {"name": "label", "description": "Shows a label. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed."}
 * @slot {"name": "description", "description": "Shows a description. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed."}
 * @slot {"name": "message", "description": "Shows a state message. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed."}
 * @slot {"name": "start", "description": "Shows content at the start of the input (e.g. icon)."}
 * @slot {"name": "end", "description": "Shows content at the end of the input (e.g. search button)."}
 */
class DSRInputSearch extends react.Component {
    host;
    // The "name" property is reflected as an attribute to ensure compatibility with native form submission.
    // In the React wrapper, all props are synced as properties on the element ref, so reflecting "name" as an attribute ensures it is properly handled in the form submission process.
    internals;
    isClearable = false;
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
        splitChildren.splitChildren(this.props.children);
        const style = minifyCss.minifyCss(stylesEntry.getInputSearchCss(this.props.disabled, this.props.loading, this.props.hideLabel, this.props.state, this.props.compact, this.props.readOnly, this.props.theme, this.props.clear));
        return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsxs("template", { shadowroot: "open", shadowrootmode: "open", shadowrootdelegatesfocus: "true", children: [jsxRuntime.jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsxRuntime.jsx(inputBase.InputBase, { children: this.props.children, host: null, label: this.props.label, description: this.props.description, id: "input-search", name: this.props.name, form: this.props.form, type: "search", required: this.props.required, placeholder: this.props.placeholder, value: this.props.value, readOnly: this.props.readOnly, autoComplete: this.props.autoComplete, disabled: this.props.disabled, state: this.props.state, message: this.props.message, theme: this.props.theme, loading: this.props.loading, initialLoading: this.props.initialLoading, ...(this.props.indicator && {
                                start: jsxRuntime.jsx(icon_wrapper.PIcon, { "aria-hidden": "true", name: "search", color: "state-disabled", theme: this.props.theme }),
                            }), ...(this.props.clear && {
                                end: (jsxRuntime.jsx(buttonPure_wrapper.PButtonPure, { tabIndex: -1, hideLabel: true, theme: this.props.theme, className: "button", type: "button", icon: "close", hidden: !this.props.isClearable, disabled: this.props.readOnly || this.props.disabled, children: "Clear field" })),
                            }) })] }), this.props.children] }));
    }
}

exports.DSRInputSearch = DSRInputSearch;
