import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { splitChildren } from '../../splitChildren.mjs';
import { Component } from 'react';
import { minifyCss } from '../../minifyCss.mjs';
import { getTextCss as getComponentCss$5 } from '../../../../../../components/dist/styles/esm/styles-entry.mjs';
import { getTextTagType } from '../../../../../../components/dist/utils/esm/utils-entry.mjs';

/**
 * @slot {"name": "", "description": "Default slot for the text to render." }
 */
class DSRText extends Component {
    host;
    render() {
        splitChildren(this.props.children);
        const colorDeprecationMap = {
            brand: 'primary',
            default: 'primary',
            'neutral-contrast-low': 'contrast-low',
            'neutral-contrast-medium': 'contrast-medium',
            'neutral-contrast-high': 'contrast-high',
            'notification-neutral': 'notification-info',
        };
        const weightDeprecationMap = {
            thin: 'regular',
            semibold: 'semi-bold',
        };
        const alignDeprecationMap = {
            left: 'start',
            right: 'end',
        };
        const TagType = getTextTagType(null, this.props.tag);
        const style = minifyCss(getComponentCss$5(this.props.size, (weightDeprecationMap[this.props.weight] || this.props.weight), (alignDeprecationMap[this.props.align] || this.props.align), (colorDeprecationMap[this.props.color] || this.props.color), this.props.ellipsis, this.props.theme));
        return (jsxs(Fragment, { children: [jsxs("template", { shadowroot: "open", shadowrootmode: "open", children: [jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsx(TagType, { className: "root", children: jsx("slot", {}) })] }), this.props.children] }));
    }
}

export { DSRText };
