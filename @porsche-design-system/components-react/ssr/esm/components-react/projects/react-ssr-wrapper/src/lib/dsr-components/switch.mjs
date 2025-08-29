import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { Component } from 'react';
import '../../provider.mjs';
import { splitChildren } from '../../splitChildren.mjs';
import { minifyCss } from '../../minifyCss.mjs';
import { getSwitchCss as getComponentCss$l } from '../../../../../../components/dist/styles/esm/styles-entry.mjs';
import { getSwitchButtonAriaAttributes } from '../../../../../../components/dist/utils/esm/utils-entry.mjs';
import { loadingId, LoadingMessage } from './loading-message.mjs';
import { PSpinner } from '../components/spinner.wrapper.mjs';

/**
 * @slot {"name": "", "description": "Default slot for the label." }
 *
 * @controlled {"props": ["checked"], "event": "update"}
 */
class DSRSwitch extends Component {
    host;
    initialLoading = false;
    render() {
        splitChildren(this.props.children);
        const style = minifyCss(getComponentCss$l(this.props.alignLabel, this.props.hideLabel, this.props.stretch, this.props.checked, this.props.disabled, this.props.loading, this.props.compact, this.props.theme));
        return (jsxs(Fragment, { children: [jsxs("template", { shadowroot: "open", shadowrootmode: "open", shadowrootdelegatesfocus: "true", children: [jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsxs(Fragment, { children: [jsx("button", { ...getSwitchButtonAriaAttributes(this.props.disabled, this.props.loading, this.props.checked), id: "switch", type: "button", role: "switch", "aria-labelledby": "label" // only relevant for axe-core because of https://github.com/dequelabs/axe-core/issues/1393
                                    , "aria-describedby": this.props.loading ? loadingId : undefined, children: jsx("span", { className: "toggle", children: this.props.loading && (jsx(PSpinner, { className: "spinner", size: "inherit", theme: this.props.theme, "aria-hidden": "true" })) }) }), jsx("label", { id: "label", htmlFor: "switch", children: jsx("slot", {}) }), jsx(LoadingMessage, { loading: this.props.loading, initialLoading: this.props.initialLoading })] })] }), this.props.children] }));
    }
}

export { DSRSwitch };
