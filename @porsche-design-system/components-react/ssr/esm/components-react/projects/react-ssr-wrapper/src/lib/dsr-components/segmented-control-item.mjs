import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { Component } from 'react';
import '../../provider.mjs';
import { splitChildren } from '../../splitChildren.mjs';
import { minifyCss } from '../../minifyCss.mjs';
import { getSegmentedControlItemCss as getComponentCss$v } from '../../../../../../components/dist/styles/esm/styles-entry.mjs';
import { getSegmentedControlItemAriaAttributes, getIconColor } from '../../../../../../components/dist/utils/esm/utils-entry.mjs';
import { PIcon } from '../components/icon.wrapper.mjs';

/**
 * @slot {"name": "", "description": "Default slot for the content." }
 */
class DSRSegmentedControlItem extends Component {
    host;
    render() {
        const { children} = splitChildren(this.props.children);
        // this additional validation is still needed because undefined is allowed with current propTypes
        const hasIcon = !!this.props.icon || !!this.props.iconSource;
        const hasSlottedContent = !!children.length;
        const isDisabled = this.props.disabled || this.props.disabledParent;
        const style = minifyCss(getComponentCss$v(isDisabled, this.props.selected, hasIcon, hasSlottedContent, this.props.theme || 'light' // default as fallback
        ));
        return (jsxs(Fragment, { children: [jsxs("template", { shadowroot: "open", shadowrootmode: "open", shadowrootdelegatesfocus: "true", children: [jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsx(Fragment, { children: jsxs("button", { type: "button", ...getSegmentedControlItemAriaAttributes(this.props.selected, this.props.disabled, this.props.aria), children: [this.props.label && jsx("span", { children: this.props.label }), hasIcon && (jsx(PIcon, { className: "icon", size: "inherit", name: this.props.icon, source: this.props.iconSource, color: getIconColor(this.props.disabled), theme: this.props.theme || 'light', "aria-hidden": "true" })), jsx("slot", {})] }) })] }), this.props.children] }));
    }
}

export { DSRSegmentedControlItem };
