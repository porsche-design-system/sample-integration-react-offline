import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { Component } from 'react';
import '../../provider.mjs';
import { splitChildren } from '../../splitChildren.mjs';
import { minifyCss } from '../../minifyCss.mjs';
import { getStepperHorizontalItemCss as getComponentCss$n } from '../../../../../../components/dist/styles/esm/styles-entry.mjs';
import { isStateCompleteOrWarning, getStepperHorizontalIconName } from '../../../../../../components/dist/utils/esm/utils-entry.mjs';
import { PIcon } from '../components/icon.wrapper.mjs';

/**
 * @slot {"name": "", "description": "Default slot for the content." }
 */
class DSRStepperHorizontalItem extends Component {
    host;
    render() {
        splitChildren(this.props.children);
        const style = minifyCss(getComponentCss$n(this.props.state, this.props.disabled, this.props.theme || 'light'));
        return (jsxs(Fragment, { children: [jsxs("template", { shadowroot: "open", shadowrootmode: "open", shadowrootdelegatesfocus: "true", children: [jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsx(Fragment, { children: jsxs("button", { type: "button", "aria-disabled": !this.props.state || this.props.disabled ? 'true' : null, "aria-current": this.props.state === 'current' ? 'step' : null, children: [isStateCompleteOrWarning(this.props.state) && (jsx(PIcon, { className: "icon", name: getStepperHorizontalIconName(this.props.state), size: "inherit", theme: this.props.theme || 'light', color: this.props.disabled ? 'state-disabled' : `notification-${getStepperHorizontalIconName(this.props.state)}`, "aria-hidden": "true" })), this.props.state && jsxs("span", { className: "sr-only", children: [this.props.state, ": "] }), jsx("slot", {})] }) })] }), this.props.children] }));
    }
}

export { DSRStepperHorizontalItem };
