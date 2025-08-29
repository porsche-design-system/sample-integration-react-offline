import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { splitChildren } from '../../splitChildren.mjs';
import { Component } from 'react';
import { minifyCss } from '../../minifyCss.mjs';
import { getMultiSelectOptionCss as getComponentCss$D } from '../../../../../../components/dist/styles/esm/styles-entry.mjs';

/**
 * @slot {"name": "", "description": "Default slot for the option text." }
 */
class DSRMultiSelectOption extends Component {
    host;
    render() {
        splitChildren(this.props.children);
        const { theme = 'light', selected: isSelected, highlighted, hidden } = this.props;
        const isDisabled = this.props.disabled || this.props.disabledParent;
        const style = minifyCss(getComponentCss$D(theme, isDisabled, isSelected));
        return (jsxs(Fragment, { children: [jsxs("template", { shadowroot: "open", shadowrootmode: "open", children: [jsx("style", { dangerouslySetInnerHTML: { __html: style } })
                        // TODO: get rid of ARIA sprouting and use `elementInternals` API when AXE-CORE supports it: https://github.com/dequelabs/axe-core/issues/4259
                        , "// TODO: get rid of ARIA sprouting and use `elementInternals` API when AXE-CORE supports it: https://github.com/dequelabs/axe-core/issues/4259", jsx(Fragment, { children: jsxs("div", { className: Object.entries({
                                    option: true,
                                    'option--selected': isSelected,
                                    'option--highlighted': highlighted,
                                    'option--disabled': isDisabled,
                                }).map(([key, value]) => value && key).filter(Boolean).join(' '), children: [jsx("span", { className: "checkbox-wrapper", children: jsx("span", { className: "checkbox", "aria-hidden": "true" }) }), jsx("slot", { slot: "label" })] }) })] }), this.props.children] }));
    }
}

export { DSRMultiSelectOption };
