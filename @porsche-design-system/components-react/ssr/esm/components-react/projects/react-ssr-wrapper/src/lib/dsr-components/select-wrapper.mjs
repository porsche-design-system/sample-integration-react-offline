import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { Component } from 'react';
import '../../provider.mjs';
import { splitChildren } from '../../splitChildren.mjs';
import { minifyCss } from '../../minifyCss.mjs';
import { getSelectWrapperCss as getComponentCss$s } from '../../../../../../components/dist/styles/esm/styles-entry.mjs';
import { isCustomDropdown } from '../../../../../../components/dist/utils/esm/utils-entry.mjs';
import { StateMessage } from './state-message.mjs';
import { LegacyLabel } from './legacy-label.mjs';
import { PIcon } from '../components/icon.wrapper.mjs';
import { PSelectWrapperDropdown } from '../components/select-wrapper-dropdown.wrapper.mjs';

/**
 * @slot {"name": "label", "description": "Shows a label. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 * @slot {"name": "description", "description": "Shows a description. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 * @slot {"name": "", "description": "Default slot for the `select` tag." }
 * @slot {"name": "message", "description": "Shows a state message. Only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) is allowed." }
 *
 * @deprecated since v3.29.0, will be removed with next major release. Please use `p-select` instead.
 */
class DSRSelectWrapper extends Component {
    host;
    select;
    iconElement;
    render() {
        const hasCustomDropdown = isCustomDropdown(this.props.filter, this.props.native);
        const { namedSlotChildren, otherChildren } = splitChildren(this.props.children);
        const { disabled } = typeof otherChildren[0] === 'object' && 'props' in otherChildren[0] && otherChildren[0]?.props || {};
        const style = minifyCss(getComponentCss$s(disabled, hasCustomDropdown, this.props.hideLabel, this.props.state, this.props.theme));
        return (jsxs(Fragment, { children: [jsxs("template", { shadowroot: "open", shadowrootmode: "open", shadowrootdelegatesfocus: "true", children: [jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsxs("div", { className: "root", children: [jsx(LegacyLabel, { hasLabel: this.props.label || namedSlotChildren.filter(({ props: { slot } }) => slot === 'label').length > 0, hasDescription: this.props.description || namedSlotChildren.filter(({ props: { slot } }) => slot === 'description').length > 0, host: null, label: this.props.label, description: this.props.description, isDisabled: disabled, formElement: typeof otherChildren[0] === 'object' && 'props' in otherChildren[0] && otherChildren[0]?.props }), jsxs("div", { className: "wrapper", children: [jsx("slot", {}), jsx(PIcon, { className: "icon", name: "arrow-head-down", theme: this.props.theme, color: disabled ? 'state-disabled' : 'primary', "aria-hidden": "true" }), hasCustomDropdown && !disabled && (jsx(PSelectWrapperDropdown, { className: "dropdown", selectRef: typeof otherChildren[0] === 'object' && 'props' in otherChildren[0] && otherChildren[0]?.props, label: this.props.label || namedSlotChildren.find(({ props: { slot } }) => slot === 'label')?.props.children, message: this.props.message || namedSlotChildren.find(({ props: { slot } }) => slot === 'message')?.props.children, description: this.props.description || namedSlotChildren.find(({ props: { slot } }) => slot === 'description')?.props.children, state: this.props.state, direction: this.props.dropdownDirection, filter: this.props.filter, theme: this.props.theme, required: false, disabled: disabled, onOpenChange: (isOpen) => this.props.iconElement.classList.toggle('icon--open', isOpen) }))] }), jsx(StateMessage, { hasMessage: (this.props.message || namedSlotChildren.filter(({ props: { slot } }) => slot === 'message').length > 0) && ['success', 'error'].includes(this.props.state), state: this.props.state, message: this.props.message, theme: this.props.theme, host: null })] })] }), this.props.children] }));
    }
}

export { DSRSelectWrapper };
