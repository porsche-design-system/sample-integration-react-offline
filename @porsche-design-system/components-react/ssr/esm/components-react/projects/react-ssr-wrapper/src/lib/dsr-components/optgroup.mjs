import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { splitChildren } from '../../splitChildren.mjs';
import { Component } from 'react';
import { minifyCss } from '../../minifyCss.mjs';
import { getOptgroupCss as getComponentCss$C } from '../../../../../../components/dist/styles/esm/styles-entry.mjs';

/**
 * @slot {"name": "", "description": "Default slot for the optgroup content." }
 */
class DSROptgroup extends Component {
    host;
    render() {
        splitChildren(this.props.children);
        const { theme = 'light', hidden } = this.props;
        const labelId = 'label';
        const style = minifyCss(getComponentCss$C(this.props.disabled, theme));
        return (jsxs(Fragment, { children: [jsxs("template", { shadowroot: "open", shadowrootmode: "open", children: [jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsx(Fragment, { children: jsxs("div", { role: "group", "aria-disabled": this.props.disabled ? 'true' : null, "aria-hidden": hidden ? 'true' : null, "aria-labelledby": labelId, children: [jsx("span", { id: labelId, role: "presentation", children: this.props.label }), jsx("slot", {})] }) })] }), this.props.children] }));
    }
}

export { DSROptgroup };
