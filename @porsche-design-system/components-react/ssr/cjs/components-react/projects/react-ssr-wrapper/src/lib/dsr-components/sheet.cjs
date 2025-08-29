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
 * @slot {"name": "header", "description": "Renders a header section above the content area." }
 * @slot {"name": "", "description": "Default slot for the main content." }
 *
 * @controlled {"props": ["open"], "event": "dismiss"}
 */
class DSRSheet extends react.Component {
    host;
    dialog;
    scroller;
    hasHeader;
    render() {
        const { namedSlotChildren} = splitChildren.splitChildren(this.props.children);
        const hasHeader = namedSlotChildren.filter(({ props: { slot } }) => slot === 'header').length > 0;
        if (this.props.open) ;
        const style = minifyCss.minifyCss(stylesEntry.getSheetCss(this.props.open, this.props.dismissButton, this.props.theme));
        return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsxs("template", { shadowroot: "open", shadowrootmode: "open", children: [jsxRuntime.jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsxRuntime.jsx("dialog", { inert: !this.props.open, tabIndex: -1, ...utilsEntry.parseAndGetAriaAttributes({
                                'aria-modal': true,
                                ...(hasHeader && {
                                    'aria-label': namedSlotChildren.filter(({ props: { slot } }) => slot === 'header').length > 0 && namedSlotChildren.find(({ props: { slot } }) => slot === 'header')?.props.children,
                                }),
                                ...utilsEntry.parseAndGetAriaAttributes(this.props.aria),
                            }), children: jsxRuntime.jsx("div", { className: "scroller", children: jsxRuntime.jsxs("div", { className: "sheet", children: [this.props.dismissButton && (jsxRuntime.jsx(button_wrapper.PButton, { variant: "ghost", className: "dismiss", type: "button", hideLabel: true, icon: "close", theme: this.props.theme, children: "Dismiss sheet" })), hasHeader && jsxRuntime.jsx("slot", { name: "header" }), jsxRuntime.jsx("slot", {})] }) }) })] }), this.props.children] }));
    }
}

exports.DSRSheet = DSRSheet;
