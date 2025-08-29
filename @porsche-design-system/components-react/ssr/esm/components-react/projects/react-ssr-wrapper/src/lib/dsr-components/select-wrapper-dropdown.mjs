import { jsx, Fragment, jsxs } from 'react/jsx-runtime';
import { Component } from 'react';
import '../../provider.mjs';
import { minifyCss } from '../../minifyCss.mjs';
import { getSelectWrapperDropdownCss as getComponentCss$t } from '../../../../../../components/dist/styles/esm/styles-entry.mjs';
import { getHasNativePopoverSupport, getSelectedOptionMap } from '../../../../../../components/dist/utils/esm/utils-entry.mjs';

class DSRSelectWrapperDropdown extends Component {
    host;
    isOpen = this.props.isOpenOverride;
    optionMaps = [];
    searchString = '';
    inputOrButtonElement;
    popoverElement;
    hasNativePopoverSupport = getHasNativePopoverSupport();
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
        const style = minifyCss(getComponentCss$t(this.isOpen, this.props.state, this.props.disabled, this.props.filter, this.props.theme));
        return (jsx(Fragment, { children: jsxs("template", { shadowroot: "open", shadowrootmode: "open", shadowrootdelegatesfocus: "true", children: [jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsx(Fragment, { children: this.props.filter ? ([
                            jsx("input", { id: inputId, type: "text", role: "combobox", disabled: this.props.disabled, placeholder: getSelectedOptionMap(this.optionMaps)?.value || null, autoComplete: "off", defaultValue: this.searchString }, "input"),
                            /* biome-ignore lint/a11y/noStaticElementInteractions: ok */
                            jsx("span", { 
                                /* @ts-ignore */
                                part: part }, "span"),
                        ]) : (jsx("button", { 
                            /* @ts-ignore */
                            part: part, type: "button", role: "combobox", id: buttonId, disabled: this.props.disabled })) })] }) }));
    }
}

export { DSRSelectWrapperDropdown };
