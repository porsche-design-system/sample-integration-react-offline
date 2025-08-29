import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { Component } from 'react';
import { minifyCss } from '../../minifyCss.mjs';
import { getCrestCss as getComponentCss$1a } from '../../../../../../components/dist/styles/esm/styles-entry.mjs';
import { buildCrestSrcSet, crestSize, buildCrestImgSrc, parseAndGetAriaAttributes } from '../../../../../../components/dist/utils/esm/utils-entry.mjs';

const { width, height } = crestSize;
class DSRCrest extends Component {
    host;
    render() {
        const picture = (jsxs("picture", { children: [jsx("source", { srcSet: buildCrestSrcSet('webp'), type: "image/webp" }, "webp"), jsx("source", { srcSet: buildCrestSrcSet('png'), type: "image/png" }, "png"), jsx("img", { src: buildCrestImgSrc(), width: width, height: height, alt: "Porsche" })] }));
        const style = minifyCss(getComponentCss$1a());
        return (jsx(Fragment, { children: jsxs("template", { shadowroot: "open", shadowrootmode: "open", shadowrootdelegatesfocus: "true", children: [jsx("style", { dangerouslySetInnerHTML: { __html: style } }), jsx(Fragment, { children: this.props.href === undefined ? (picture) : (jsx("a", { href: this.props.href, target: this.props.target, ...parseAndGetAriaAttributes(this.props.aria), children: picture })) })] }) }));
    }
}

export { DSRCrest };
