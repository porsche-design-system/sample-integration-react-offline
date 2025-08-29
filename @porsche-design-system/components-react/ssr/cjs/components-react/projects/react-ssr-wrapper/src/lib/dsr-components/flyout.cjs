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
 * @slot {"name": "header", "description": "Renders a sticky header section above the content area." }
 * @slot {"name": "", "description": "Default slot for the main content." }
 * @slot {"name": "footer", "description": "Shows a sticky footer section, flowing under the content area when scrollable." }
 * @slot {"name": "sub-footer", "description": "Shows a sub-footer section to display additional information below the footer. This slot is ideal for less critical content, such as legal information or FAQs, which provides further details to the user. It appears when scrolling to the end of the flyout or when there is available space to accommodate the content." }
 *
 * @controlled {"props": ["open"], "event": "dismiss"}
 */
class DSRFlyout extends react.Component {
    host;
    dialog;
    scroller;
    header;
    footer;
    hasHeader;
    hasFooter;
    hasSubFooter;
    render() {
        const { namedSlotChildren} = splitChildren.splitChildren(this.props.children);
        const positionDeprecationMap = {
            left: 'start',
            right: 'end',
        };
        const hasHeader = namedSlotChildren.filter(({ props: { slot } }) => slot === 'header').length > 0;
        const hasFooter = namedSlotChildren.filter(({ props: { slot } }) => slot === 'footer').length > 0;
        const hasSubFooter = namedSlotChildren.filter(({ props: { slot } }) => slot === 'sub-footer').length > 0;
        const style = minifyCss.minifyCss(stylesEntry.getFlyoutCss(this.props.open, (positionDeprecationMap[this.props.position] || this.props.position), hasHeader, hasFooter, hasSubFooter, this.props.footerBehavior, this.props.theme));
        return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsxs("template", { shadowroot: "open", shadowrootmode: "open", children: [jsxRuntime.jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsxRuntime.jsx("dialog", { tabIndex: -1, ...utilsEntry.parseAndGetAriaAttributes({
                                'aria-modal': true,
                                ...{ 'aria-label': hasHeader ? namedSlotChildren.find(({ props: { slot } }) => slot === 'header')?.props.children : 'Flyout' },
                                ...utilsEntry.parseAndGetAriaAttributes(this.props.aria),
                            }), children: jsxRuntime.jsx("div", { className: "scroller", children: jsxRuntime.jsxs("div", { className: "flyout", children: [jsxRuntime.jsx(button_wrapper.PButton, { variant: "ghost", className: "dismiss", type: "button", hideLabel: true, icon: "close", theme: this.props.theme, children: "Dismiss flyout" }), hasHeader && jsxRuntime.jsx("slot", { name: "header" }), jsxRuntime.jsx("slot", {}), hasFooter && jsxRuntime.jsx("slot", { name: "footer" }), hasSubFooter && jsxRuntime.jsx("slot", { name: "sub-footer" })] }) }) })] }), this.props.children] }));
    }
}

exports.DSRFlyout = DSRFlyout;
