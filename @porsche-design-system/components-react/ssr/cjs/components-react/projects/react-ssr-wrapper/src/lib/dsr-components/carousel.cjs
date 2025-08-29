'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
require('../../provider.cjs');
var splitChildren = require('../../splitChildren.cjs');
var minifyCss = require('../../minifyCss.cjs');
var stylesEntry = require('../../../../../../components/dist/styles/esm/styles-entry.cjs');
var utilsEntry = require('../../../../../../components/dist/utils/esm/utils-entry.cjs');
var buttonPure_wrapper = require('../components/button-pure.wrapper.cjs');
var linkPure_wrapper = require('../components/link-pure.wrapper.cjs');

/**
 * @slot {"name": "heading", "description": "Renders a heading above the carousel." }
 * @slot {"name": "description", "description": "Shows a footer section, flowing under the content area when scrollable." }
 * @slot {"name": "controls", "description": "Shows a sidebar area on the **start** side (**left** in **LTR** mode / **right** in **RTL** mode). On mobile view it transforms into a flyout." }
 * @slot {"name": "", "description": "Default slot for the carousel slides." }
 *
 * @controlled { "props": ["activeSlideIndex"], "event": "update", "isInternallyMutated": true }
 */
class DSRCarousel extends react.Component {
    host;
    amountOfPages;
    splide;
    container;
    btnPrev;
    btnNext;
    paginationEl;
    slides = [];
    get splideSlides() {
        return this.props.splide.Components.Elements.slides;
    }
    get hasNavigation() {
        return this.props.slidesPerPage === 'auto' || this.props.amountOfPages > 1;
    }
    render() {
        const { namedSlotChildren, otherChildren } = splitChildren.splitChildren(this.props.children);
        const alignHeaderDeprecationMap = {
            left: 'start',
        };
        const hasHeadingPropOrSlot = (this.props.heading || namedSlotChildren.filter(({ props: { slot } }) => slot === 'heading').length > 0);
        const hasDescriptionPropOrSlot = (this.props.description || namedSlotChildren.filter(({ props: { slot } }) => slot === 'description').length > 0);
        const hasControlsSlot = namedSlotChildren.filter(({ props: { slot } }) => slot === 'controls').length > 0;
        const btnProps = {
            className: 'btn',
            type: 'button',
            hideLabel: true,
            theme: this.props.theme,
            // 'aria-controls': 'splide-track', // TODO: cross shadow dom? use native button tag instead of p-button-pure?
        };
        const headingId = 'heading';
        const style = minifyCss.minifyCss(stylesEntry.getCarouselCss(this.props.gradientColor, hasHeadingPropOrSlot, hasDescriptionPropOrSlot, hasControlsSlot, this.props.headingSize, this.props.width, 
        // flip boolean values of disablePagination since it is the inverse of pagination
        this.props.disablePagination
            ? typeof this.props.disablePagination === 'object'
                ? Object.fromEntries(Object.entries(this.props.disablePagination).map(([key, value]) => [key, !value]))
                : !this.props.disablePagination
            : this.props.pagination, utilsEntry.isInfinitePagination(this.props.focusOnCenterSlide ? this.slides.length : this.props.amountOfPages), (alignHeaderDeprecationMap[this.props.alignHeader] ||
            this.props.alignHeader), this.props.theme, (this.props.slidesPerPage === 'auto' || typeof this.props.slidesPerPage === 'object' || this.props.slidesPerPage < otherChildren.length), this.props.alignControls));
        return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsxs("template", { shadowroot: "open", shadowrootmode: "open", children: [jsxRuntime.jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsxs("div", { className: "header", children: [hasHeadingPropOrSlot &&
                                            (this.props.heading ? (jsxRuntime.jsx("h2", { className: "heading", id: headingId, children: this.props.heading })) : (jsxRuntime.jsx("div", { className: "heading", id: headingId, children: jsxRuntime.jsx("slot", { name: "heading" }) }))), hasDescriptionPropOrSlot && (this.props.description ? jsxRuntime.jsx("p", { children: this.props.description }) : jsxRuntime.jsx("slot", { name: "description" })), hasControlsSlot && jsxRuntime.jsx("slot", { name: "controls" }), jsxRuntime.jsxs("div", { className: "nav", children: [this.props.skipLinkTarget && (jsxRuntime.jsx(linkPure_wrapper.PLinkPure, { href: this.props.skipLinkTarget, theme: this.props.theme, icon: "arrow-last", className: "btn skip-link", alignLabel: "start", hideLabel: true, children: "Skip carousel entries" })), (this.props.slidesPerPage === 'auto' || typeof this.props.slidesPerPage === 'object' || this.props.slidesPerPage < otherChildren.length) && (jsxRuntime.jsx(buttonPure_wrapper.PButtonPure, { ...btnProps, icon: "arrow-left" })), (this.props.slidesPerPage === 'auto' || typeof this.props.slidesPerPage === 'object' || this.props.slidesPerPage < otherChildren.length) && (jsxRuntime.jsx(buttonPure_wrapper.PButtonPure, { ...btnProps, icon: "arrow-right" }))] })] }), jsxRuntime.jsx("div", { id: "splide", className: "splide", ...utilsEntry.parseAndGetAriaAttributes({
                                        'aria-labelledby': hasHeadingPropOrSlot && !this.props.aria ? headingId : undefined,
                                        ...utilsEntry.parseAndGetAriaAttributes(this.props.aria),
                                    }), children: jsxRuntime.jsx("div", { className: "splide__track", children: jsxRuntime.jsx("div", { className: "splide__list", children: otherChildren.map((_, i) => (jsxRuntime.jsx("div", { className: "splide__slide", tabIndex: 0, children: jsxRuntime.jsx("slot", { name: `slide-${i}` }) }, i))) }) }) }), (this.props.disablePagination ? this.props.disablePagination !== true : this.props.pagination) &&
                                    (this.props.slidesPerPage === 'auto' || typeof this.props.slidesPerPage === 'object' || this.props.slidesPerPage < otherChildren.length) && (jsxRuntime.jsx("div", { className: "pagination-container", "aria-hidden": "true", children: jsxRuntime.jsx("div", { className: "pagination" }) }))] })] }), this.props.children] }));
    }
    getPageCount = () => (this.props.focusOnCenterSlide ? this.slides.length : this.props.amountOfPages);
}

exports.DSRCarousel = DSRCarousel;
