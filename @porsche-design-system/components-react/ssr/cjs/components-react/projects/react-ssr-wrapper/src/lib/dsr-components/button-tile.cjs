'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
require('../../provider.cjs');
var splitChildren = require('../../splitChildren.cjs');
var minifyCss = require('../../minifyCss.cjs');
var stylesEntry = require('../../../../../../components/dist/styles/esm/styles-entry.cjs');
var utilsEntry = require('../../../../../../components/dist/utils/esm/utils-entry.cjs');
var button_wrapper = require('../components/button.wrapper.cjs');
var buttonPure_wrapper = require('../components/button-pure.wrapper.cjs');

/**
 * @slot {"name": "header", "description": "Renders a header section above the content area." }
 * @slot {"name": "", "description": "Default slot for the img or picture tag." }
 */
class DSRButtonTile extends react.Component {
    host;
    render() {
        splitChildren.splitChildren(this.props.children);
        const buttonProps = {
            theme: this.props.background,
            variant: 'secondary',
            iconSource: this.props.iconSource,
            type: this.props.type,
            disabled: this.props.disabled,
            loading: this.props.loading,
            aria: this.props.aria,
        };
        const button = (react.createElement(button_wrapper.PButton, { ...buttonProps, icon: this.props.icon, key: "link-or-button", className: "link-or-button" }, this.props.label));
        const buttonPure = (react.createElement(buttonPure_wrapper.PButtonPure, { ...buttonProps, key: "link-or-button-pure", className: "link-or-button-pure", hideLabel: true, icon: this.props.icon === 'none' ? 'arrow-right' : this.props.icon }, this.props.label));
        const style = minifyCss.minifyCss(stylesEntry.getButtonTileCss(utilsEntry.isDisabledOrLoading(this.props.disabled, this.props.loading), this.props.aspectRatio, this.props.size, this.props.weight, this.props.background, this.props.align, this.props.compact, this.props.gradient, this.props.disabled));
        return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsxs("template", { shadowroot: "open", shadowrootmode: "open", shadowrootdelegatesfocus: "true", children: [jsxRuntime.jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsxRuntime.jsxs("div", { className: "root", children: [jsxRuntime.jsx("slot", { name: "header" }), jsxRuntime.jsx("div", { className: "media", children: jsxRuntime.jsx("slot", {}) }), jsxRuntime.jsxs("div", { className: "footer", children: [jsxRuntime.jsx("p", { children: this.props.description }), typeof this.props.compact === 'boolean' ? (this.props.compact ? buttonPure : button) : [buttonPure, button]] })] })] }), this.props.children] }));
    }
}

exports.DSRButtonTile = DSRButtonTile;
