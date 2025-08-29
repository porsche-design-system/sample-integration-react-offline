import type { BaseProps } from '../../BaseProps';
import type { ScrollerAlignScrollIndicator, SelectedAriaAttributes, ScrollerAriaAttribute, ScrollerGradientColor, ScrollerGradientColorScheme, ScrollerScrollIndicatorPosition, ScrollerScrollToPosition, Theme } from '../types';
export type PScrollerProps = BaseProps & {
    /**
     * Sets the vertical position of scroll indicator.
     */
    alignScrollIndicator?: ScrollerAlignScrollIndicator;
    /**
     * Add ARIA role.
     */
    aria?: SelectedAriaAttributes<ScrollerAriaAttribute>;
    /**
     * @deprecated since v3.29.0, will be removed with next major release. Adapts the background gradient color of prev and next button.
     */
    gradientColor?: ScrollerGradientColor;
    /**
     * @deprecated since v3.0.0, will be removed with next major release. Adapts the background gradient color of prev and next button.
     */
    gradientColorScheme?: ScrollerGradientColorScheme;
    /**
     * @deprecated since v3.0.0, will be removed with next major release, use `alignScrollIndicator` instead. Sets the vertical position of scroll indicator
     */
    scrollIndicatorPosition?: ScrollerScrollIndicatorPosition;
    /**
     * Scrolls the scroll area to the left either smooth or immediately.
     */
    scrollToPosition?: ScrollerScrollToPosition;
    /**
     * Specifies if scrollbar should be shown.
     */
    scrollbar?: boolean;
    /**
     * Adapts the color when used on dark background.
     */
    theme?: Theme;
};
export declare const PScroller: import("react").ForwardRefExoticComponent<import("react").DOMAttributes<{}> & Pick<import("react").HTMLAttributes<{}>, "suppressHydrationWarning" | "autoFocus" | "className" | "dir" | "hidden" | "id" | "inert" | "lang" | "slot" | "style" | "tabIndex" | "title" | "translate" | "role"> & {
    /**
     * Sets the vertical position of scroll indicator.
     */
    alignScrollIndicator?: ScrollerAlignScrollIndicator;
    /**
     * Add ARIA role.
     */
    aria?: SelectedAriaAttributes<ScrollerAriaAttribute>;
    /**
     * @deprecated since v3.29.0, will be removed with next major release. Adapts the background gradient color of prev and next button.
     */
    gradientColor?: ScrollerGradientColor;
    /**
     * @deprecated since v3.0.0, will be removed with next major release. Adapts the background gradient color of prev and next button.
     */
    gradientColorScheme?: ScrollerGradientColorScheme;
    /**
     * @deprecated since v3.0.0, will be removed with next major release, use `alignScrollIndicator` instead. Sets the vertical position of scroll indicator
     */
    scrollIndicatorPosition?: ScrollerScrollIndicatorPosition;
    /**
     * Scrolls the scroll area to the left either smooth or immediately.
     */
    scrollToPosition?: ScrollerScrollToPosition;
    /**
     * Specifies if scrollbar should be shown.
     */
    scrollbar?: boolean;
    /**
     * Adapts the color when used on dark background.
     */
    theme?: Theme;
} & {
    children?: import("react").ReactNode | undefined;
} & import("react").RefAttributes<HTMLElement>>;
