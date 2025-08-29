'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
require('../../provider.cjs');
var splitChildren = require('../../splitChildren.cjs');
var minifyCss = require('../../minifyCss.cjs');
var stylesEntry = require('../../../../../../components/dist/styles/esm/styles-entry.cjs');
var tabsBar_wrapper = require('../components/tabs-bar.wrapper.cjs');

/**
 * @slot {"name": "", "description": "Default slot for the `p-tabs-item` tags." }
 *
 * @controlled { "props": ["activeTabIndex"], "event": "update", "isInternallyMutated": true }
 */
class DSRTabs extends react.Component {
    host;
    tabsItemElements = [];
    render() {
        const { children, otherChildren } = splitChildren.splitChildren(this.props.children);
        const manipulatedChildren = children.map((child, i) => typeof child === 'object' && 'props' in child && otherChildren.includes(child)
            ? { ...child, props: { ...child.props, theme: this.props.theme, hidden: this.props.activeTabIndex !== i ? true : null } }
            : child);
        const style = minifyCss.minifyCss(stylesEntry.getTabsCss());
        return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsxs("template", { shadowroot: "open", shadowrootmode: "open", children: [jsxRuntime.jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx(tabsBar_wrapper.PTabsBar, { className: "root", size: this.props.size, weight: this.props.weight, theme: this.props.theme, gradientColorScheme: this.props.gradientColorScheme, gradientColor: this.props.gradientColor, activeTabIndex: this.props.activeTabIndex, children: otherChildren.map((tab, index) => (jsxRuntime.jsx("button", { type: "button", children: typeof tab === 'object' && 'props' in tab && tab.props.label }, index))) }), jsxRuntime.jsx("slot", {})] })] }), manipulatedChildren] }));
    }
}

exports.DSRTabs = DSRTabs;
