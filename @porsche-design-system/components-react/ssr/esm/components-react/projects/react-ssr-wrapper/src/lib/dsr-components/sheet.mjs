import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { Component } from 'react';
import '../../provider.mjs';
import { splitChildren } from '../../splitChildren.mjs';
import { minifyCss } from '../../minifyCss.mjs';
import { getSheetCss as getComponentCss$p } from '../../../../../../components/dist/styles/esm/styles-entry.mjs';
import { parseAndGetAriaAttributes } from '../../../../../../components/dist/utils/esm/utils-entry.mjs';
import { PButton } from '../components/button.wrapper.mjs';

/**
 * @slot {"name": "header", "description": "Renders a header section above the content area." }
 * @slot {"name": "", "description": "Default slot for the main content." }
 *
 * @controlled {"props": ["open"], "event": "dismiss"}
 */
class DSRSheet extends Component {
    host;
    dialog;
    scroller;
    hasHeader;
    render() {
        const { namedSlotChildren} = splitChildren(this.props.children);
        const hasHeader = namedSlotChildren.filter(({ props: { slot } }) => slot === 'header').length > 0;
        if (this.props.open) ;
        const style = minifyCss(getComponentCss$p(this.props.open, this.props.dismissButton, this.props.theme));
        return (jsxs(Fragment, { children: [jsxs("template", { shadowroot: "open", shadowrootmode: "open", children: [jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsx("dialog", { inert: !this.props.open, tabIndex: -1, ...parseAndGetAriaAttributes({
                                'aria-modal': true,
                                ...(hasHeader && {
                                    'aria-label': namedSlotChildren.filter(({ props: { slot } }) => slot === 'header').length > 0 && namedSlotChildren.find(({ props: { slot } }) => slot === 'header')?.props.children,
                                }),
                                ...parseAndGetAriaAttributes(this.props.aria),
                            }), children: jsx("div", { className: "scroller", children: jsxs("div", { className: "sheet", children: [this.props.dismissButton && (jsx(PButton, { variant: "ghost", className: "dismiss", type: "button", hideLabel: true, icon: "close", theme: this.props.theme, children: "Dismiss sheet" })), hasHeader && jsx("slot", { name: "header" }), jsx("slot", {})] }) }) })] }), this.props.children] }));
    }
}

export { DSRSheet };
