import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { Component } from 'react';
import '../../provider.mjs';
import { splitChildren } from '../../splitChildren.mjs';
import { minifyCss } from '../../minifyCss.mjs';
import { getButtonPureCss as getComponentCss$1i } from '../../../../../../components/dist/styles/esm/styles-entry.mjs';
import { isDisabledOrLoading, hasVisibleIcon, getButtonPureAriaAttributes } from '../../../../../../components/dist/utils/esm/utils-entry.mjs';
import { loadingId, LoadingMessage } from './loading-message.mjs';
import { PIcon } from '../components/icon.wrapper.mjs';
import { PSpinner } from '../components/spinner.wrapper.mjs';

/**
 * @slot {"name": "", "description": "Default slot for the button label." }
 */
class DSRButtonPure extends Component {
    host;
    // In the React wrapper, all props are synced as properties on the element ref, so reflecting "form" as an attribute ensures it is properly handled in the form submission process.
    internals;
    initialLoading = false;
    get isDisabledOrLoading() {
        return isDisabledOrLoading(this.props.disabled, this.props.loading);
    }
    // this stops click events when button is disabled
    render() {
        splitChildren(this.props.children);
        const hasIcon = hasVisibleIcon(this.props.icon, this.props.iconSource);
        const iconProps = {
            className: 'icon',
            size: 'inherit',
            theme: this.props.theme,
        };
        const style = minifyCss(getComponentCss$1i(this.props.icon, this.props.iconSource, this.props.active, this.props.loading, this.isDisabledOrLoading, this.props.stretch, this.props.size, this.props.hideLabel, this.props.alignLabel, this.props.underline, this.props.theme));
        return (jsxs(Fragment, { children: [jsxs("template", { shadowroot: "open", shadowrootmode: "open", shadowrootdelegatesfocus: "true", children: [jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsxs(Fragment, { children: [jsxs("button", { ...getButtonPureAriaAttributes(this.props.disabled, this.props.loading, this.props.aria), className: "root", type: this.props.type, name: this.props.name, value: this.props.value, "aria-describedby": this.props.loading ? loadingId : undefined, children: [this.props.loading ? (jsx(PSpinner, { ...iconProps, "aria-hidden": "true" })) : (hasIcon && (jsx(PIcon, { ...iconProps, name: this.props.icon, source: this.props.iconSource, color: this.isDisabledOrLoading ? 'state-disabled' : 'primary', theme: this.props.theme, "aria-hidden": "true" }))), jsx("span", { className: "label", children: jsx("slot", {}) })] }), jsx(LoadingMessage, { loading: this.props.loading, initialLoading: this.props.initialLoading })] })] }), this.props.children] }));
    }
}

export { DSRButtonPure };
