'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
require('../../provider.cjs');
var minifyCss = require('../../minifyCss.cjs');
var stylesEntry = require('../../../../../../components/dist/styles/esm/styles-entry.cjs');
var utilsEntry = require('../../../../../../components/dist/utils/esm/utils-entry.cjs');

class DSRSelectWrapperDropdown extends react.Component {
    host;
    isOpen = this.props.isOpenOverride;
    optionMaps = [];
    searchString = '';
    inputOrButtonElement;
    popoverElement;
    hasNativePopoverSupport = utilsEntry.getHasNativePopoverSupport();
    cleanUpAutoUpdate;
    get selectedIndex() {
        return 0;
    }
    render() {
        // TODO: part won't be needed as soon as button/input of select-wrapper-dropdown is part of shadow dom of select-wrapper itself
        const part = 'select-wrapper-dropdown';
        const inputId = 'filter';
        this.props.description && 'description';
        const buttonId = 'value';
        const style = minifyCss.minifyCss(stylesEntry.getSelectWrapperDropdownCss(this.isOpen, this.props.state, this.props.disabled, this.props.filter, this.props.theme));
        return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: jsxRuntime.jsxs("template", { shadowroot: "open", shadowrootmode: "open", shadowrootdelegatesfocus: "true", children: [jsxRuntime.jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsxRuntime.jsx(jsxRuntime.Fragment, { children: this.props.filter ? ([
                            jsxRuntime.jsx("input", { id: inputId, type: "text", role: "combobox", disabled: this.props.disabled, placeholder: utilsEntry.getSelectedOptionMap(this.optionMaps)?.value || null, autoComplete: "off", defaultValue: this.searchString }, "input"),
                            /* biome-ignore lint/a11y/noStaticElementInteractions: ok */
                            jsxRuntime.jsx("span", { 
                                /* @ts-ignore */
                                part: part }, "span"),
                        ]) : (jsxRuntime.jsx("button", { 
                            /* @ts-ignore */
                            part: part, type: "button", role: "combobox", id: buttonId, disabled: this.props.disabled })) })] }) }));
    }
}

exports.DSRSelectWrapperDropdown = DSRSelectWrapperDropdown;
