import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { Component } from 'react';
import '../../provider.mjs';
import { splitChildren } from '../../splitChildren.mjs';
import { minifyCss } from '../../minifyCss.mjs';
import { getTabsBarCss as getComponentCss$d } from '../../../../../../components/dist/styles/esm/styles-entry.mjs';
import { PScroller } from '../components/scroller.wrapper.mjs';

/**
 * @slot {"name": "", "description": "Default slot for the `button` or `a` tags which will be rendered as tabs." }
 *
 * @controlled {"props": ["activeTabIndex"], "event": "update"}
 */
class DSRTabsBar extends Component {
    host;
    tabElements = [];
    internalTabIndex = this.props.activeTabIndex; // to not override and mutate external prop value
    barElement;
    scrollerElement;
    direction = 'next';
    hasPTabsParent;
    areTabsButtons;
    render() {
        const { children, otherChildren } = splitChildren(this.props.children);
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
        const style = minifyCss(getComponentCss$d(this.props.size, (deprecationMap[this.props.weight] || this.props.weight), this.props.theme));
        return (jsxs(Fragment, { children: [jsxs("template", { shadowroot: "open", shadowrootmode: "open", children: [jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsxs(PScroller, { className: "scroller", ...(this.props.areTabsButtons && { aria: { role: 'tablist' } }), theme: this.props.theme, gradientColorScheme: this.props.gradientColorScheme, gradientColor: this.props.gradientColor, alignScrollIndicator: "top", children: [jsx("slot", {}), jsx("span", { className: "bar" })] })] }), manipulatedChildren] }));
    }
}

export { DSRTabsBar };
