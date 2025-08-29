import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { Component } from 'react';
import '../../provider.mjs';
import { splitChildren } from '../../splitChildren.mjs';
import { minifyCss } from '../../minifyCss.mjs';
import { getButtonCss as getComponentCss$1g } from '../../../../../../components/dist/styles/esm/styles-entry.mjs';
import { hasVisibleIcon, getButtonAriaAttributes } from '../../../../../../components/dist/utils/esm/utils-entry.mjs';
import { loadingId, LoadingMessage } from './loading-message.mjs';
import { PIcon } from '../components/icon.wrapper.mjs';
import { PSpinner } from '../components/spinner.wrapper.mjs';

/**
 * @slot {"name": "", "description": "Default slot for the button label." }
 */
class DSRButton extends Component {
    host;
    // In the React wrapper, all props are synced as properties on the element ref, so reflecting "form" as an attribute ensures it is properly handled in the form submission process.
    internals;
    initialLoading = false;
    render() {
        splitChildren(this.props.children);
        const style = minifyCss(getComponentCss$1g(this.props.icon, this.props.iconSource, this.props.variant, this.props.hideLabel, this.props.disabled, this.props.loading, this.props.compact, this.props.theme));
        return (jsxs(Fragment, { children: [jsxs("template", { shadowroot: "open", shadowrootmode: "open", shadowrootdelegatesfocus: "true", children: [jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsxs(Fragment, { children: [jsxs("button", { ...getButtonAriaAttributes(this.props.disabled, this.props.loading, this.props.aria), className: "root", type: this.props.type, name: this.props.name, value: this.props.value, "aria-describedby": this.props.loading ? loadingId : undefined, children: [this.props.loading && (jsx(PSpinner, { className: "spinner", size: "inherit", theme: this.props.theme, "aria-hidden": "true" })), hasVisibleIcon(this.props.icon, this.props.iconSource) && (jsx(PIcon, { className: "icon", size: "inherit", name: this.props.iconSource ? undefined : this.props.icon, source: this.props.iconSource, color: this.props.disabled ? (this.props.variant === 'primary' ? 'contrast-high' : 'state-disabled') : 'primary', theme: this.props.theme, "aria-hidden": "true" })), jsx("span", { className: "label", children: jsx("slot", {}) })] }), jsx(LoadingMessage, { loading: this.props.loading, initialLoading: this.props.initialLoading })] })] }), this.props.children] }));
    }
}

export { DSRButton };
