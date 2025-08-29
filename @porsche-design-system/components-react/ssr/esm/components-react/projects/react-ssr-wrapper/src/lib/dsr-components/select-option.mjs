import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { Component } from 'react';
import '../../provider.mjs';
import { splitChildren } from '../../splitChildren.mjs';
import { minifyCss } from '../../minifyCss.mjs';
import { getSelectOptionCss as getComponentCss$r } from '../../../../../../components/dist/styles/esm/styles-entry.mjs';
import { PIcon } from '../components/icon.wrapper.mjs';

/**
 * @slot {"name": "", "description": "Default slot for the option content." }
 */
class DSRSelectOption extends Component {
    host;
    render() {
        splitChildren(this.props.children);
        const { theme = 'light', selected: isSelected, highlighted, hidden } = this.props;
        const isDisabled = this.props.disabled || this.props.disabledParent;
        const style = minifyCss(getComponentCss$r(theme));
        return (jsxs(Fragment, { children: [jsxs("template", { shadowroot: "open", shadowrootmode: "open", children: [jsx("style", { dangerouslySetInnerHTML: { __html: style } })
                        // TODO: get rid of ARIA sprouting and use `elementInternals` API when AXE-CORE supports it: https://github.com/dequelabs/axe-core/issues/4259
                        , "// TODO: get rid of ARIA sprouting and use `elementInternals` API when AXE-CORE supports it: https://github.com/dequelabs/axe-core/issues/4259", jsx(Fragment, { children: jsxs("div", { className: Object.entries({
                                    option: true,
                                    'option--selected': isSelected,
                                    'option--highlighted': highlighted,
                                    'option--disabled': isDisabled,
                                }).map(([key, value]) => value && key).filter(Boolean).join(' '), children: [jsx("slot", {}), isSelected && (jsx(PIcon, { className: "icon", "aria-hidden": "true", name: "check", color: isDisabled ? 'state-disabled' : 'primary', theme: theme }))] }) })] }), this.props.children] }));
    }
}

export { DSRSelectOption };
