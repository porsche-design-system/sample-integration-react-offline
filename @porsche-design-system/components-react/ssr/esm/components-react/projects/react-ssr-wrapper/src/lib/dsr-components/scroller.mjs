import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { Component } from 'react';
import '../../provider.mjs';
import { splitChildren } from '../../splitChildren.mjs';
import { minifyCss } from '../../minifyCss.mjs';
import { getScrollerCss as getComponentCss$w } from '../../../../../../components/dist/styles/esm/styles-entry.mjs';
import { scrollAreaClass, parseAndGetAriaAttributes, isScrollable } from '../../../../../../components/dist/utils/esm/utils-entry.mjs';
import { PButton } from '../components/button.wrapper.mjs';

/**
 * @slot {"name": "", "description": "Default slot for the scroller content." }
 */
class DSRScroller extends Component {
    host;
    isPrevHidden = true;
    isNextHidden = true;
    intersectionObserver;
    scrollAreaElement;
    render() {
        splitChildren(this.props.children);
        const renderPrevNextButton = (direction) => {
            return (jsx("div", { className: direction === 'next' ? 'action-next' : 'action-prev', children: jsx(PButton, { className: "action-button", variant: "ghost", "hide-label": "true", icon: direction === 'next' ? 'arrow-head-right' : 'arrow-head-left', type: "button", tabIndex: -1, theme: this.props.theme, dir: "ltr" // Otherwise icon will be flipped which doesn't make sense in this use case
                    , children: direction }) }, direction));
        };
        const style = minifyCss(getComponentCss$w(this.isNextHidden, this.isPrevHidden, this.props.scrollIndicatorPosition || this.props.alignScrollIndicator, this.props.scrollbar, this.props.theme));
        return (jsxs(Fragment, { children: [jsxs("template", { shadowroot: "open", shadowrootmode: "open", children: [jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsxs("div", { className: "root", children: [jsx("div", { className: scrollAreaClass, children: jsxs("div", { className: "scroll-wrapper", role: parseAndGetAriaAttributes(this.props.aria)?.role || null, tabIndex: isScrollable(this.isPrevHidden, this.isNextHidden) ? 0 : null, children: [jsx("slot", {}), jsx("div", { className: "trigger" }), jsx("div", { className: "trigger" })] }) }), ['prev', 'next'].map(renderPrevNextButton)] })] }), this.props.children] }));
    }
}

export { DSRScroller };
