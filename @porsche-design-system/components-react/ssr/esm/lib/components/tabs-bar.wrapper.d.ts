import type { BaseProps } from '../../BaseProps';
import type { TabsBarGradientColor, TabsBarGradientColorScheme, TabsBarUpdateEventDetail, BreakpointCustomizable, TabsBarSize, Theme, TabsBarWeight } from '../types';
export type PTabsBarProps = BaseProps & {
    /**
     * Defines which tab to be visualized as selected (zero-based numbering), undefined if none should be selected.
     */
    activeTabIndex?: number | undefined;
    /**
     * @deprecated since v3.29.0, will be removed with next major release. Adapts the background gradient color of prev and next button.
     */
    gradientColor?: TabsBarGradientColor;
    /**
     * @deprecated since v3.0.0, will be removed with next major release. Adapts the background gradient color of prev and next button.
     */
    gradientColorScheme?: TabsBarGradientColorScheme;
    /**
     * @deprecated since v3.0.0, will be removed with next major release, use `update` event instead. Emitted when active tab is changed.
     */
    onTabChange?: (event: CustomEvent<TabsBarUpdateEventDetail>) => void;
    /**
     * Emitted when active tab is changed.
     */
    onUpdate?: (event: CustomEvent<TabsBarUpdateEventDetail>) => void;
    /**
     * The text size.
     */
    size?: BreakpointCustomizable<TabsBarSize>;
    /**
     * Adapts the color when used on dark background.
     */
    theme?: Theme;
    /**
     * The text weight.
     */
    weight?: TabsBarWeight;
};
export declare const PTabsBar: import("react").ForwardRefExoticComponent<import("react").DOMAttributes<{}> & Pick<import("react").HTMLAttributes<{}>, "suppressHydrationWarning" | "autoFocus" | "className" | "dir" | "hidden" | "id" | "inert" | "lang" | "slot" | "style" | "tabIndex" | "title" | "translate" | "role"> & {
    /**
     * Defines which tab to be visualized as selected (zero-based numbering), undefined if none should be selected.
     */
    activeTabIndex?: number | undefined;
    /**
     * @deprecated since v3.29.0, will be removed with next major release. Adapts the background gradient color of prev and next button.
     */
    gradientColor?: TabsBarGradientColor;
    /**
     * @deprecated since v3.0.0, will be removed with next major release. Adapts the background gradient color of prev and next button.
     */
    gradientColorScheme?: TabsBarGradientColorScheme;
    /**
     * @deprecated since v3.0.0, will be removed with next major release, use `update` event instead. Emitted when active tab is changed.
     */
    onTabChange?: (event: CustomEvent<TabsBarUpdateEventDetail>) => void;
    /**
     * Emitted when active tab is changed.
     */
    onUpdate?: (event: CustomEvent<TabsBarUpdateEventDetail>) => void;
    /**
     * The text size.
     */
    size?: BreakpointCustomizable<TabsBarSize>;
    /**
     * Adapts the color when used on dark background.
     */
    theme?: Theme;
    /**
     * The text weight.
     */
    weight?: TabsBarWeight;
} & {
    children?: import("react").ReactNode | undefined;
} & import("react").RefAttributes<HTMLElement>>;
