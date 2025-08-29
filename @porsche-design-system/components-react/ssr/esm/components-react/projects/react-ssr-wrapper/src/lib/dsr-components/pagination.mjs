import { jsx, Fragment, jsxs } from 'react/jsx-runtime';
import { Component } from 'react';
import '../../provider.mjs';
import { minifyCss } from '../../minifyCss.mjs';
import { getPaginationCss as getComponentCss$A } from '../../../../../../components/dist/styles/esm/styles-entry.mjs';
import { getTotalPages, createPaginationItems, getCurrentActivePage, ItemType } from '../../../../../../components/dist/utils/esm/utils-entry.mjs';
import { PIcon } from '../components/icon.wrapper.mjs';

/**
 * @controlled { "props": ["activePage"], "event": "update", "isInternallyMutated": true }
 */
class DSRPagination extends Component {
    host;
    render() {
        const pageTotal = getTotalPages(this.props.totalItemsCount, this.props.itemsPerPage);
        const paginationItems = createPaginationItems({
            activePage: getCurrentActivePage(this.props.activePage, pageTotal),
            pageTotal,
            showLastPage: this.props.showLastPage,
        });
        const style = minifyCss(getComponentCss$A(this.props.activePage, pageTotal, this.props.showLastPage, this.props.theme));
        return (jsx(Fragment, { children: jsxs("template", { shadowroot: "open", shadowrootmode: "open", shadowrootdelegatesfocus: "true", children: [jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsx("nav", { "aria-label": this.props.allyLabel || this.props.intl.root, children: jsx("ul", { children: paginationItems.map((pageModel, index) => {
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
                                    case ItemType.PREVIOUS:
                                        return (jsx("li", { className: "prev", children: jsx("span", { ...spanProps, "aria-label": this.props.allyLabelPrev || this.props.intl.prev, "aria-disabled": isActive ? null : 'true', children: jsx(PIcon, { ...iconProps, name: "arrow-left" }) }) }, "prev"));
                                    case ItemType.ELLIPSIS:
                                        return (jsx("li", { className: Object.entries({ ellip: true, [`ellip-${index === 2 ? 'start' : 'end'}`]: true }).map(([key, value]) => value && key).filter(Boolean).join(' '), children: jsx("span", { className: "ellipsis" }) }, "ellip"));
                                    case ItemType.PAGE:
                                        return (jsx("li", { className: Object.entries({
                                                current: isActive,
                                                'current-1': isBeforeCurrent,
                                                'current+1': isAfterCurrent,
                                                'current-2': isBeforeBeforeCurrent,
                                                'current+2': isAfterAfterCurrent,
                                            }).map(([key, value]) => value && key).filter(Boolean).join(' '), children: jsx("span", { ...spanProps, tabIndex: 0, "aria-label": `${this.props.allyLabelPage || this.props.intl.page} ${value}`, "aria-current": isActive ? 'page' : null, children: value }) }, value));
                                    case ItemType.NEXT:
                                        return (jsx("li", { className: "next", children: jsx("span", { ...spanProps, "aria-label": this.props.allyLabelNext || this.props.intl.next, "aria-disabled": isActive ? null : 'true', children: jsx(PIcon, { ...iconProps, name: "arrow-right" }) }) }, "next"));
                                }
                            }) }) })] }) }));
    }
}

export { DSRPagination };
