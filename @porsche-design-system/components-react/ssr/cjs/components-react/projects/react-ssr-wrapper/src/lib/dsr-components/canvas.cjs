'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
require('../../provider.cjs');
var splitChildren = require('../../splitChildren.cjs');
var minifyCss = require('../../minifyCss.cjs');
var stylesEntry = require('../../../../../../components/dist/styles/esm/styles-entry.cjs');
var button_wrapper = require('../components/button.wrapper.cjs');
var crest_wrapper = require('../components/crest.wrapper.cjs');
var flyout_wrapper = require('../components/flyout.wrapper.cjs');
var wordmark_wrapper = require('../components/wordmark.wrapper.cjs');

/**
 * @slot {"name": "title", "description": "Renders the application name in the header section of the sidebar start area." }
 * @slot {"name": "header-start", "description": "Renders a **sticky** header section above the content area on the **start** side (**left** in **LTR** mode / **right** in **RTL** mode)." }
 * @slot {"name": "header-end", "description": "Renders a **sticky** header section above the content area on the **end** side (**right** in **LTR** mode / **left** in **RTL** mode)." }
 * @slot {"name": "", "description": "Default slot for the main content." }
 * @slot {"name": "footer", "description": "Renders a **sticky** footer section underneath the main content." }
 * @slot {"name": "sidebar-start", "description": "Renders a sidebar area on the **start** side (**left** in **LTR** mode / **right** in **RTL** mode). On mobile view it transforms into a flyout." }
 * @slot {"name": "sidebar-end", "description": "Renders a sidebar area on the **end** side (**right** in **LTR** mode / **left** in **RTL** mode). On mobile view it transforms into a flyout." }
 * @slot {"name": "sidebar-end-header", "description": "Renders in the header section of the sidebar end area." }
 * @slot {"name": "background", "description": "Can be used to pass a sticky media element <img/> or <video/> placed underneath the main content." }
 *
 * @experimental
 */
class DSRCanvas extends react.Component {
    host;
    isMediaQueryS = false;
    isMediaQueryM = false;
    hasTitle;
    hasSidebarEnd;
    hasSidebarEndHeader;
    hasFooter;
    hasBackground;
    // TODO: Produces bug when using text-field-wrapper which looses focus
    // private sidebarStart: any;
    // private sidebarEnd: any;
    // private root: any;
    // private header: any;
    // 
    render() {
        const { namedSlotChildren} = splitChildren.splitChildren(this.props.children);
        const hasTitle = namedSlotChildren.filter(({ props: { slot } }) => slot === 'title').length > 0;
        const hasSidebarEnd = namedSlotChildren.filter(({ props: { slot } }) => slot === 'sidebar-end').length > 0;
        const hasSidebarEndHeader = namedSlotChildren.filter(({ props: { slot } }) => slot === 'sidebar-end-header').length > 0;
        const hasFooter = namedSlotChildren.filter(({ props: { slot } }) => slot === 'footer').length > 0;
        const hasBackground = namedSlotChildren.filter(({ props: { slot } }) => slot === 'background').length > 0;
        const style = minifyCss.minifyCss(stylesEntry.getCanvasCss(this.props.theme, this.props.sidebarStartOpen, this.props.sidebarEndOpen));
        return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsxs("template", { shadowroot: "open", shadowrootmode: "open", children: [jsxRuntime.jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsxs("div", { className: "root", children: [jsxRuntime.jsxs("header", { className: "header", tabIndex: -1, children: [jsxRuntime.jsxs("div", { className: "blur", children: [jsxRuntime.jsx("div", {}), jsxRuntime.jsx("div", {}), jsxRuntime.jsx("div", {}), jsxRuntime.jsx("div", {}), jsxRuntime.jsx("div", {}), jsxRuntime.jsx("div", {}), jsxRuntime.jsx("div", {}), jsxRuntime.jsx("div", {})] }), jsxRuntime.jsxs("div", { className: "header__area header__area--start", children: [!this.props.sidebarStartOpen && (jsxRuntime.jsxs(button_wrapper.PButton, { theme: this.props.theme, icon: "sidebar", variant: "ghost", compact: true, "hide-label": "true", aria: { 'aria-expanded': this.props.sidebarStartOpen }, children: [this.props.sidebarStartOpen ? 'Close' : 'Open', " navigation sidebar"] })), jsxRuntime.jsx("slot", { name: "header-start" })] }), jsxRuntime.jsx(crest_wrapper.PCrest, { className: "header__crest" }), jsxRuntime.jsx(wordmark_wrapper.PWordmark, { className: "header__wordmark", size: "inherit", theme: this.props.theme }), jsxRuntime.jsx("div", { className: "header__area header__area--end", children: jsxRuntime.jsx("slot", { name: "header-end" }) })] }), this.props.isMediaQueryS && (jsxRuntime.jsx("aside", { className: "sidebar sidebar--start", inert: !this.props.sidebarStartOpen, "aria-label": `Navigation sidebar ${this.props.sidebarStartOpen ? 'open' : 'closed'}`, tabIndex: -1, children: jsxRuntime.jsxs("div", { className: "sidebar__scroller", children: [jsxRuntime.jsxs("div", { className: "sidebar__header sidebar__header--start", children: [jsxRuntime.jsxs(button_wrapper.PButton, { theme: this.props.theme, icon: "sidebar", variant: "ghost", compact: true, "hide-label": "true", aria: { 'aria-expanded': this.props.sidebarStartOpen }, children: [this.props.sidebarStartOpen ? 'Close' : 'Open', " navigation sidebar"] }), hasTitle && (jsxRuntime.jsx("h2", { children: jsxRuntime.jsx("slot", { name: "title" }) }))] }), jsxRuntime.jsx("div", { className: "sidebar__content", children: jsxRuntime.jsx("slot", { name: "sidebar-start" }) })] }) })), jsxRuntime.jsx("main", { className: "main", children: jsxRuntime.jsx("slot", {}) }), hasSidebarEnd && this.props.isMediaQueryM && (jsxRuntime.jsx("aside", { className: "sidebar sidebar--end", inert: !this.props.sidebarEndOpen, "aria-label": `Settings sidebar ${this.props.sidebarEndOpen ? 'open' : 'closed'}`, tabIndex: -1, children: jsxRuntime.jsxs("div", { className: "sidebar__scroller", children: [jsxRuntime.jsxs("div", { className: "sidebar__header sidebar__header--end", children: [jsxRuntime.jsx("slot", { name: "sidebar-end-header" }), jsxRuntime.jsxs(button_wrapper.PButton, { theme: this.props.theme, icon: "close", variant: "ghost", compact: true, "hide-label": "true", aria: { 'aria-expanded': this.props.sidebarEndOpen }, children: [this.props.sidebarEndOpen ? 'Close' : 'Open', " settings sidebar"] })] }), jsxRuntime.jsx("div", { className: "sidebar__content", children: jsxRuntime.jsx("slot", { name: "sidebar-end" }) })] }) })), hasFooter && (jsxRuntime.jsx("footer", { className: "footer", children: jsxRuntime.jsx("slot", { name: "footer" }) })), hasBackground && jsxRuntime.jsx("slot", { name: "background" })] }), !this.props.isMediaQueryS && (jsxRuntime.jsxs(flyout_wrapper.PFlyout, { className: "flyout-start", theme: this.props.theme, open: this.props.sidebarStartOpen, position: "start", children: [hasTitle && (jsxRuntime.jsx("h2", { slot: "header", children: jsxRuntime.jsx("slot", { name: "title" }) })), jsxRuntime.jsx("slot", { name: "sidebar-start" })] })), hasSidebarEnd && !this.props.isMediaQueryM && (jsxRuntime.jsxs(flyout_wrapper.PFlyout, { className: "flyout-end", theme: this.props.theme, open: this.props.sidebarEndOpen, position: "end", children: [hasSidebarEndHeader && jsxRuntime.jsx("slot", { slot: "header", name: "sidebar-end-header" }), jsxRuntime.jsx("slot", { name: "sidebar-end" })] }))] })] }), this.props.children] }));
    }
}

exports.DSRCanvas = DSRCanvas;
