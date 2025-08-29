import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { Component } from 'react';
import '../../provider.mjs';
import { splitChildren } from '../../splitChildren.mjs';
import { minifyCss } from '../../minifyCss.mjs';
import { getCarouselCss as getComponentCss$1e } from '../../../../../../components/dist/styles/esm/styles-entry.mjs';
import { isInfinitePagination, parseAndGetAriaAttributes } from '../../../../../../components/dist/utils/esm/utils-entry.mjs';
import { PButtonPure } from '../components/button-pure.wrapper.mjs';
import { PLinkPure } from '../components/link-pure.wrapper.mjs';

/**
 * @slot {"name": "heading", "description": "Renders a heading above the carousel." }
 * @slot {"name": "description", "description": "Shows a footer section, flowing under the content area when scrollable." }
 * @slot {"name": "controls", "description": "Shows a sidebar area on the **start** side (**left** in **LTR** mode / **right** in **RTL** mode). On mobile view it transforms into a flyout." }
 * @slot {"name": "", "description": "Default slot for the carousel slides." }
 *
 * @controlled { "props": ["activeSlideIndex"], "event": "update", "isInternallyMutated": true }
 */
class DSRCarousel extends Component {
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
        const { namedSlotChildren, otherChildren } = splitChildren(this.props.children);
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
        const style = minifyCss(getComponentCss$1e(this.props.gradientColor, hasHeadingPropOrSlot, hasDescriptionPropOrSlot, hasControlsSlot, this.props.headingSize, this.props.width, 
        // flip boolean values of disablePagination since it is the inverse of pagination
        this.props.disablePagination
            ? typeof this.props.disablePagination === 'object'
                ? Object.fromEntries(Object.entries(this.props.disablePagination).map(([key, value]) => [key, !value]))
                : !this.props.disablePagination
            : this.props.pagination, isInfinitePagination(this.props.focusOnCenterSlide ? this.slides.length : this.props.amountOfPages), (alignHeaderDeprecationMap[this.props.alignHeader] ||
            this.props.alignHeader), this.props.theme, (this.props.slidesPerPage === 'auto' || typeof this.props.slidesPerPage === 'object' || this.props.slidesPerPage < otherChildren.length), this.props.alignControls));
        return (jsxs(Fragment, { children: [jsxs("template", { shadowroot: "open", shadowrootmode: "open", children: [jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsxs(Fragment, { children: [jsxs("div", { className: "header", children: [hasHeadingPropOrSlot &&
                                            (this.props.heading ? (jsx("h2", { className: "heading", id: headingId, children: this.props.heading })) : (jsx("div", { className: "heading", id: headingId, children: jsx("slot", { name: "heading" }) }))), hasDescriptionPropOrSlot && (this.props.description ? jsx("p", { children: this.props.description }) : jsx("slot", { name: "description" })), hasControlsSlot && jsx("slot", { name: "controls" }), jsxs("div", { className: "nav", children: [this.props.skipLinkTarget && (jsx(PLinkPure, { href: this.props.skipLinkTarget, theme: this.props.theme, icon: "arrow-last", className: "btn skip-link", alignLabel: "start", hideLabel: true, children: "Skip carousel entries" })), (this.props.slidesPerPage === 'auto' || typeof this.props.slidesPerPage === 'object' || this.props.slidesPerPage < otherChildren.length) && (jsx(PButtonPure, { ...btnProps, icon: "arrow-left" })), (this.props.slidesPerPage === 'auto' || typeof this.props.slidesPerPage === 'object' || this.props.slidesPerPage < otherChildren.length) && (jsx(PButtonPure, { ...btnProps, icon: "arrow-right" }))] })] }), jsx("div", { id: "splide", className: "splide", ...parseAndGetAriaAttributes({
                                        'aria-labelledby': hasHeadingPropOrSlot && !this.props.aria ? headingId : undefined,
                                        ...parseAndGetAriaAttributes(this.props.aria),
                                    }), children: jsx("div", { className: "splide__track", children: jsx("div", { className: "splide__list", children: otherChildren.map((_, i) => (jsx("div", { className: "splide__slide", tabIndex: 0, children: jsx("slot", { name: `slide-${i}` }) }, i))) }) }) }), (this.props.disablePagination ? this.props.disablePagination !== true : this.props.pagination) &&
                                    (this.props.slidesPerPage === 'auto' || typeof this.props.slidesPerPage === 'object' || this.props.slidesPerPage < otherChildren.length) && (jsx("div", { className: "pagination-container", "aria-hidden": "true", children: jsx("div", { className: "pagination" }) }))] })] }), this.props.children] }));
    }
    getPageCount = () => (this.props.focusOnCenterSlide ? this.slides.length : this.props.amountOfPages);
}

export { DSRCarousel };
