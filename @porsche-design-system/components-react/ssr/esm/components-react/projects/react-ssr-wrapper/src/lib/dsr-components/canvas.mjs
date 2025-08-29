import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { Component } from 'react';
import '../../provider.mjs';
import { splitChildren } from '../../splitChildren.mjs';
import { minifyCss } from '../../minifyCss.mjs';
import { getCanvasCss as getComponentCss$1f } from '../../../../../../components/dist/styles/esm/styles-entry.mjs';
import { PButton } from '../components/button.wrapper.mjs';
import { PCrest } from '../components/crest.wrapper.mjs';
import { PFlyout } from '../components/flyout.wrapper.mjs';
import { PWordmark } from '../components/wordmark.wrapper.mjs';

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
class DSRCanvas extends Component {
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
        const { namedSlotChildren} = splitChildren(this.props.children);
        const hasTitle = namedSlotChildren.filter(({ props: { slot } }) => slot === 'title').length > 0;
        const hasSidebarEnd = namedSlotChildren.filter(({ props: { slot } }) => slot === 'sidebar-end').length > 0;
        const hasSidebarEndHeader = namedSlotChildren.filter(({ props: { slot } }) => slot === 'sidebar-end-header').length > 0;
        const hasFooter = namedSlotChildren.filter(({ props: { slot } }) => slot === 'footer').length > 0;
        const hasBackground = namedSlotChildren.filter(({ props: { slot } }) => slot === 'background').length > 0;
        const style = minifyCss(getComponentCss$1f(this.props.theme, this.props.sidebarStartOpen, this.props.sidebarEndOpen));
        return (jsxs(Fragment, { children: [jsxs("template", { shadowroot: "open", shadowrootmode: "open", children: [jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsxs(Fragment, { children: [jsxs("div", { className: "root", children: [jsxs("header", { className: "header", tabIndex: -1, children: [jsxs("div", { className: "blur", children: [jsx("div", {}), jsx("div", {}), jsx("div", {}), jsx("div", {}), jsx("div", {}), jsx("div", {}), jsx("div", {}), jsx("div", {})] }), jsxs("div", { className: "header__area header__area--start", children: [!this.props.sidebarStartOpen && (jsxs(PButton, { theme: this.props.theme, icon: "sidebar", variant: "ghost", compact: true, "hide-label": "true", aria: { 'aria-expanded': this.props.sidebarStartOpen }, children: [this.props.sidebarStartOpen ? 'Close' : 'Open', " navigation sidebar"] })), jsx("slot", { name: "header-start" })] }), jsx(PCrest, { className: "header__crest" }), jsx(PWordmark, { className: "header__wordmark", size: "inherit", theme: this.props.theme }), jsx("div", { className: "header__area header__area--end", children: jsx("slot", { name: "header-end" }) })] }), this.props.isMediaQueryS && (jsx("aside", { className: "sidebar sidebar--start", inert: !this.props.sidebarStartOpen, "aria-label": `Navigation sidebar ${this.props.sidebarStartOpen ? 'open' : 'closed'}`, tabIndex: -1, children: jsxs("div", { className: "sidebar__scroller", children: [jsxs("div", { className: "sidebar__header sidebar__header--start", children: [jsxs(PButton, { theme: this.props.theme, icon: "sidebar", variant: "ghost", compact: true, "hide-label": "true", aria: { 'aria-expanded': this.props.sidebarStartOpen }, children: [this.props.sidebarStartOpen ? 'Close' : 'Open', " navigation sidebar"] }), hasTitle && (jsx("h2", { children: jsx("slot", { name: "title" }) }))] }), jsx("div", { className: "sidebar__content", children: jsx("slot", { name: "sidebar-start" }) })] }) })), jsx("main", { className: "main", children: jsx("slot", {}) }), hasSidebarEnd && this.props.isMediaQueryM && (jsx("aside", { className: "sidebar sidebar--end", inert: !this.props.sidebarEndOpen, "aria-label": `Settings sidebar ${this.props.sidebarEndOpen ? 'open' : 'closed'}`, tabIndex: -1, children: jsxs("div", { className: "sidebar__scroller", children: [jsxs("div", { className: "sidebar__header sidebar__header--end", children: [jsx("slot", { name: "sidebar-end-header" }), jsxs(PButton, { theme: this.props.theme, icon: "close", variant: "ghost", compact: true, "hide-label": "true", aria: { 'aria-expanded': this.props.sidebarEndOpen }, children: [this.props.sidebarEndOpen ? 'Close' : 'Open', " settings sidebar"] })] }), jsx("div", { className: "sidebar__content", children: jsx("slot", { name: "sidebar-end" }) })] }) })), hasFooter && (jsx("footer", { className: "footer", children: jsx("slot", { name: "footer" }) })), hasBackground && jsx("slot", { name: "background" })] }), !this.props.isMediaQueryS && (jsxs(PFlyout, { className: "flyout-start", theme: this.props.theme, open: this.props.sidebarStartOpen, position: "start", children: [hasTitle && (jsx("h2", { slot: "header", children: jsx("slot", { name: "title" }) })), jsx("slot", { name: "sidebar-start" })] })), hasSidebarEnd && !this.props.isMediaQueryM && (jsxs(PFlyout, { className: "flyout-end", theme: this.props.theme, open: this.props.sidebarEndOpen, position: "end", children: [hasSidebarEndHeader && jsx("slot", { slot: "header", name: "sidebar-end-header" }), jsx("slot", { name: "sidebar-end" })] }))] })] }), this.props.children] }));
    }
}

export { DSRCanvas };
