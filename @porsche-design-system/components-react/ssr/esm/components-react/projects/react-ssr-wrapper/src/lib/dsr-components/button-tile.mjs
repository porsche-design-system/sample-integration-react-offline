import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { Component, createElement } from 'react';
import '../../provider.mjs';
import { splitChildren } from '../../splitChildren.mjs';
import { minifyCss } from '../../minifyCss.mjs';
import { getButtonTileCss as getComponentCss$1h } from '../../../../../../components/dist/styles/esm/styles-entry.mjs';
import { isDisabledOrLoading } from '../../../../../../components/dist/utils/esm/utils-entry.mjs';
import { PButton } from '../components/button.wrapper.mjs';
import { PButtonPure } from '../components/button-pure.wrapper.mjs';

/**
 * @slot {"name": "header", "description": "Renders a header section above the content area." }
 * @slot {"name": "", "description": "Default slot for the img or picture tag." }
 */
class DSRButtonTile extends Component {
    host;
    render() {
        splitChildren(this.props.children);
        const buttonProps = {
            theme: this.props.background,
            variant: 'secondary',
            iconSource: this.props.iconSource,
            type: this.props.type,
            disabled: this.props.disabled,
            loading: this.props.loading,
            aria: this.props.aria,
        };
        const button = (createElement(PButton, { ...buttonProps, icon: this.props.icon, key: "link-or-button", className: "link-or-button" }, this.props.label));
        const buttonPure = (createElement(PButtonPure, { ...buttonProps, key: "link-or-button-pure", className: "link-or-button-pure", hideLabel: true, icon: this.props.icon === 'none' ? 'arrow-right' : this.props.icon }, this.props.label));
        const style = minifyCss(getComponentCss$1h(isDisabledOrLoading(this.props.disabled, this.props.loading), this.props.aspectRatio, this.props.size, this.props.weight, this.props.background, this.props.align, this.props.compact, this.props.gradient, this.props.disabled));
        return (jsxs(Fragment, { children: [jsxs("template", { shadowroot: "open", shadowrootmode: "open", shadowrootdelegatesfocus: "true", children: [jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsxs("div", { className: "root", children: [jsx("slot", { name: "header" }), jsx("div", { className: "media", children: jsx("slot", {}) }), jsxs("div", { className: "footer", children: [jsx("p", { children: this.props.description }), typeof this.props.compact === 'boolean' ? (this.props.compact ? buttonPure : button) : [buttonPure, button]] })] })] }), this.props.children] }));
    }
}

export { DSRButtonTile };
