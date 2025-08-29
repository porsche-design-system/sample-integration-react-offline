'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
require('../../provider.cjs');
var splitChildren = require('../../splitChildren.cjs');
var minifyCss = require('../../minifyCss.cjs');
var stylesEntry = require('../../../../../../components/dist/styles/esm/styles-entry.cjs');
var scroller_wrapper = require('../components/scroller.wrapper.cjs');

/**
 * @slot {"name": "", "description": "Default slot for the `button` or `a` tags which will be rendered as tabs." }
 *
 * @controlled {"props": ["activeTabIndex"], "event": "update"}
 */
class DSRTabsBar extends react.Component {
    host;
    tabElements = [];
    internalTabIndex = this.props.activeTabIndex; // to not override and mutate external prop value
    barElement;
    scrollerElement;
    direction = 'next';
    hasPTabsParent;
    areTabsButtons;
    render() {
        const { children, otherChildren } = splitChildren.splitChildren(this.props.children);
        const manipulatedChildren = children.map((child, i) => typeof child === 'object' && 'props' in child && otherChildren.includes(child)
            ? child.type === 'button'
                ? {
                    ...child,
                    props: {
                        ...child.props,
                        role: 'tab',
                        tabIndex: (this.props.activeTabIndex || 0) === i ? '0' : '-1',
                        'aria-selected': this.props.activeTabIndex === i ? 'true' : 'false',
                    },
                }
                : child.type === 'a'
                    ? {
                        ...child,
                        props: {
                            ...child.props,
                            'aria-current': this.props.activeTabIndex === i ? 'true' : 'false',
                        },
                    }
                    : child
            : child);
        const deprecationMap = {
            semibold: 'semi-bold',
        };
        const style = minifyCss.minifyCss(stylesEntry.getTabsBarCss(this.props.size, (deprecationMap[this.props.weight] || this.props.weight), this.props.theme));
        return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsxs("template", { shadowroot: "open", shadowrootmode: "open", children: [jsxRuntime.jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsxRuntime.jsxs(scroller_wrapper.PScroller, { className: "scroller", ...(this.props.areTabsButtons && { aria: { role: 'tablist' } }), theme: this.props.theme, gradientColorScheme: this.props.gradientColorScheme, gradientColor: this.props.gradientColor, alignScrollIndicator: "top", children: [jsxRuntime.jsx("slot", {}), jsxRuntime.jsx("span", { className: "bar" })] })] }), manipulatedChildren] }));
    }
}

exports.DSRTabsBar = DSRTabsBar;
