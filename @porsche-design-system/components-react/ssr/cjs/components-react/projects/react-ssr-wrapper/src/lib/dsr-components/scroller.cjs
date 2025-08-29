'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
require('../../provider.cjs');
var splitChildren = require('../../splitChildren.cjs');
var minifyCss = require('../../minifyCss.cjs');
var stylesEntry = require('../../../../../../components/dist/styles/esm/styles-entry.cjs');
var utilsEntry = require('../../../../../../components/dist/utils/esm/utils-entry.cjs');
var button_wrapper = require('../components/button.wrapper.cjs');

/**
 * @slot {"name": "", "description": "Default slot for the scroller content." }
 */
class DSRScroller extends react.Component {
    host;
    isPrevHidden = true;
    isNextHidden = true;
    intersectionObserver;
    scrollAreaElement;
    render() {
        splitChildren.splitChildren(this.props.children);
        const renderPrevNextButton = (direction) => {
            return (jsxRuntime.jsx("div", { className: direction === 'next' ? 'action-next' : 'action-prev', children: jsxRuntime.jsx(button_wrapper.PButton, { className: "action-button", variant: "ghost", "hide-label": "true", icon: direction === 'next' ? 'arrow-head-right' : 'arrow-head-left', type: "button", tabIndex: -1, theme: this.props.theme, dir: "ltr" // Otherwise icon will be flipped which doesn't make sense in this use case
                    , children: direction }) }, direction));
        };
        const style = minifyCss.minifyCss(stylesEntry.getScrollerCss(this.isNextHidden, this.isPrevHidden, this.props.scrollIndicatorPosition || this.props.alignScrollIndicator, this.props.scrollbar, this.props.theme));
        return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsxs("template", { shadowroot: "open", shadowrootmode: "open", children: [jsxRuntime.jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsxRuntime.jsxs("div", { className: "root", children: [jsxRuntime.jsx("div", { className: utilsEntry.scrollAreaClass, children: jsxRuntime.jsxs("div", { className: "scroll-wrapper", role: utilsEntry.parseAndGetAriaAttributes(this.props.aria)?.role || null, tabIndex: utilsEntry.isScrollable(this.isPrevHidden, this.isNextHidden) ? 0 : null, children: [jsxRuntime.jsx("slot", {}), jsxRuntime.jsx("div", { className: "trigger" }), jsxRuntime.jsx("div", { className: "trigger" })] }) }), ['prev', 'next'].map(renderPrevNextButton)] })] }), this.props.children] }));
    }
}

exports.DSRScroller = DSRScroller;
