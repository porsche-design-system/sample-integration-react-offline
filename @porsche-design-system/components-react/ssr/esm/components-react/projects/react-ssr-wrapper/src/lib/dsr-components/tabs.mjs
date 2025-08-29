import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { Component } from 'react';
import '../../provider.mjs';
import { splitChildren } from '../../splitChildren.mjs';
import { minifyCss } from '../../minifyCss.mjs';
import { getTabsCss as getComponentCss$b } from '../../../../../../components/dist/styles/esm/styles-entry.mjs';
import { PTabsBar } from '../components/tabs-bar.wrapper.mjs';

/**
 * @slot {"name": "", "description": "Default slot for the `p-tabs-item` tags." }
 *
 * @controlled { "props": ["activeTabIndex"], "event": "update", "isInternallyMutated": true }
 */
class DSRTabs extends Component {
    host;
    tabsItemElements = [];
    render() {
        const { children, otherChildren } = splitChildren(this.props.children);
        const manipulatedChildren = children.map((child, i) => typeof child === 'object' && 'props' in child && otherChildren.includes(child)
            ? { ...child, props: { ...child.props, theme: this.props.theme, hidden: this.props.activeTabIndex !== i ? true : null } }
            : child);
        const style = minifyCss(getComponentCss$b());
        return (jsxs(Fragment, { children: [jsxs("template", { shadowroot: "open", shadowrootmode: "open", children: [jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsxs(Fragment, { children: [jsx(PTabsBar, { className: "root", size: this.props.size, weight: this.props.weight, theme: this.props.theme, gradientColorScheme: this.props.gradientColorScheme, gradientColor: this.props.gradientColor, activeTabIndex: this.props.activeTabIndex, children: otherChildren.map((tab, index) => (jsx("button", { type: "button", children: typeof tab === 'object' && 'props' in tab && tab.props.label }, index))) }), jsx("slot", {})] })] }), manipulatedChildren] }));
    }
}

export { DSRTabs };
