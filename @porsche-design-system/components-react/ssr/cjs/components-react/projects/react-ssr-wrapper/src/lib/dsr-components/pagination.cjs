'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
require('../../provider.cjs');
var minifyCss = require('../../minifyCss.cjs');
var stylesEntry = require('../../../../../../components/dist/styles/esm/styles-entry.cjs');
var utilsEntry = require('../../../../../../components/dist/utils/esm/utils-entry.cjs');
var icon_wrapper = require('../components/icon.wrapper.cjs');

/**
 * @controlled { "props": ["activePage"], "event": "update", "isInternallyMutated": true }
 */
class DSRPagination extends react.Component {
    host;
    render() {
        const pageTotal = utilsEntry.getTotalPages(this.props.totalItemsCount, this.props.itemsPerPage);
        const paginationItems = utilsEntry.createPaginationItems({
            activePage: utilsEntry.getCurrentActivePage(this.props.activePage, pageTotal),
            pageTotal,
            showLastPage: this.props.showLastPage,
        });
        const style = minifyCss.minifyCss(stylesEntry.getPaginationCss(this.props.activePage, pageTotal, this.props.showLastPage, this.props.theme));
        return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: jsxRuntime.jsxs("template", { shadowroot: "open", shadowrootmode: "open", shadowrootdelegatesfocus: "true", children: [jsxRuntime.jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsxRuntime.jsx("nav", { "aria-label": this.props.allyLabel || this.props.intl.root, children: jsxRuntime.jsx("ul", { children: paginationItems.map((pageModel, index) => {
                                const { type, isActive, value, isBeforeCurrent, isAfterCurrent, isBeforeBeforeCurrent, isAfterAfterCurrent, } = pageModel;
                                const spanProps = {
                                    role: 'button',
                                    tabIndex: isActive ? 0 : null,
                                };
                                const iconProps = {
                                    theme: this.props.theme,
                                    color: isActive ? 'primary' : 'state-disabled',
                                    'aria-hidden': 'true',
                                };
                                switch (type) {
                                    case utilsEntry.ItemType.PREVIOUS:
                                        return (jsxRuntime.jsx("li", { className: "prev", children: jsxRuntime.jsx("span", { ...spanProps, "aria-label": this.props.allyLabelPrev || this.props.intl.prev, "aria-disabled": isActive ? null : 'true', children: jsxRuntime.jsx(icon_wrapper.PIcon, { ...iconProps, name: "arrow-left" }) }) }, "prev"));
                                    case utilsEntry.ItemType.ELLIPSIS:
                                        return (jsxRuntime.jsx("li", { className: Object.entries({ ellip: true, [`ellip-${index === 2 ? 'start' : 'end'}`]: true }).map(([key, value]) => value && key).filter(Boolean).join(' '), children: jsxRuntime.jsx("span", { className: "ellipsis" }) }, "ellip"));
                                    case utilsEntry.ItemType.PAGE:
                                        return (jsxRuntime.jsx("li", { className: Object.entries({
                                                current: isActive,
                                                'current-1': isBeforeCurrent,
                                                'current+1': isAfterCurrent,
                                                'current-2': isBeforeBeforeCurrent,
                                                'current+2': isAfterAfterCurrent,
                                            }).map(([key, value]) => value && key).filter(Boolean).join(' '), children: jsxRuntime.jsx("span", { ...spanProps, tabIndex: 0, "aria-label": `${this.props.allyLabelPage || this.props.intl.page} ${value}`, "aria-current": isActive ? 'page' : null, children: value }) }, value));
                                    case utilsEntry.ItemType.NEXT:
                                        return (jsxRuntime.jsx("li", { className: "next", children: jsxRuntime.jsx("span", { ...spanProps, "aria-label": this.props.allyLabelNext || this.props.intl.next, "aria-disabled": isActive ? null : 'true', children: jsxRuntime.jsx(icon_wrapper.PIcon, { ...iconProps, name: "arrow-right" }) }) }, "next"));
                                }
                            }) }) })] }) }));
    }
}

exports.DSRPagination = DSRPagination;
