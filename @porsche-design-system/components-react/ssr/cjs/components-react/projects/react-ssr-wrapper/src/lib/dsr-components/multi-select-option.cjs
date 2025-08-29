'use strict';

var jsxRuntime = require('react/jsx-runtime');
var splitChildren = require('../../splitChildren.cjs');
var react = require('react');
var minifyCss = require('../../minifyCss.cjs');
var stylesEntry = require('../../../../../../components/dist/styles/esm/styles-entry.cjs');

/**
 * @slot {"name": "", "description": "Default slot for the option text." }
 */
class DSRMultiSelectOption extends react.Component {
    host;
    render() {
        splitChildren.splitChildren(this.props.children);
        const { theme = 'light', selected: isSelected, highlighted, hidden } = this.props;
        const isDisabled = this.props.disabled || this.props.disabledParent;
        const style = minifyCss.minifyCss(stylesEntry.getMultiSelectOptionCss(theme, isDisabled, isSelected));
        return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsxs("template", { shadowroot: "open", shadowrootmode: "open", children: [jsxRuntime.jsx("style", { dangerouslySetInnerHTML: { __html: style } })
                        // TODO: get rid of ARIA sprouting and use `elementInternals` API when AXE-CORE supports it: https://github.com/dequelabs/axe-core/issues/4259
                        , "// TODO: get rid of ARIA sprouting and use `elementInternals` API when AXE-CORE supports it: https://github.com/dequelabs/axe-core/issues/4259", jsxRuntime.jsx(jsxRuntime.Fragment, { children: jsxRuntime.jsxs("div", { className: Object.entries({
                                    option: true,
                                    'option--selected': isSelected,
                                    'option--highlighted': highlighted,
                                    'option--disabled': isDisabled,
                                }).map(([key, value]) => value && key).filter(Boolean).join(' '), children: [jsxRuntime.jsx("span", { className: "checkbox-wrapper", children: jsxRuntime.jsx("span", { className: "checkbox", "aria-hidden": "true" }) }), jsxRuntime.jsx("slot", { slot: "label" })] }) })] }), this.props.children] }));
    }
}

exports.DSRMultiSelectOption = DSRMultiSelectOption;
