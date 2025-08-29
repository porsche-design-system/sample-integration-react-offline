import type { BaseProps } from '../../BaseProps';
import type { TabsGradientColor, TabsGradientColorScheme, TabsUpdateEventDetail, BreakpointCustomizable, TabsSize, Theme, TabsWeight } from '../types';
export type PTabsProps = BaseProps & {
    /**
     * Defines which tab to be visualized as selected (zero-based numbering).
     */
    activeTabIndex?: number;
    /**
     * @deprecated since v3.29.0, will be removed with next major release. Adapts the background gradient color of prev and next button.
     */
    gradientColor?: TabsGradientColor;
    /**
     * @deprecated since v3.0.0, will be removed with next major release, use `gradientColor` instead. Adapts the background gradient color of prev and next button.
     */
    gradientColorScheme?: TabsGradientColorScheme;
    /**
     * @deprecated since v3.0.0, will be removed with next major release, use `update` event instead. Emitted when active tab is changed.
     */
    onTabChange?: (event: CustomEvent<TabsUpdateEventDetail>) => void;
    /**
     * Emitted when active tab is changed.
     */
    onUpdate?: (event: CustomEvent<TabsUpdateEventDetail>) => void;
    /**
     * The text size.
     */
    size?: BreakpointCustomizable<TabsSize>;
    /**
     * Adapts the color when used on dark background.
     */
    theme?: Theme;
    /**
     * The text weight.
     */
    weight?: TabsWeight;
};
export declare const PTabs: import("react").ForwardRefExoticComponent<import("react").DOMAttributes<{}> & Pick<import("react").HTMLAttributes<{}>, "suppressHydrationWarning" | "autoFocus" | "className" | "dir" | "hidden" | "id" | "inert" | "lang" | "slot" | "style" | "tabIndex" | "title" | "translate" | "role"> & {
    /**
     * Defines which tab to be visualized as selected (zero-based numbering).
     */
    activeTabIndex?: number;
    /**
     * @deprecated since v3.29.0, will be removed with next major release. Adapts the background gradient color of prev and next button.
     */
    gradientColor?: TabsGradientColor;
    /**
     * @deprecated since v3.0.0, will be removed with next major release, use `gradientColor` instead. Adapts the background gradient color of prev and next button.
     */
    gradientColorScheme?: TabsGradientColorScheme;
    /**
     * @deprecated since v3.0.0, will be removed with next major release, use `update` event instead. Emitted when active tab is changed.
     */
    onTabChange?: (event: CustomEvent<TabsUpdateEventDetail>) => void;
    /**
     * Emitted when active tab is changed.
     */
    onUpdate?: (event: CustomEvent<TabsUpdateEventDetail>) => void;
    /**
     * The text size.
     */
    size?: BreakpointCustomizable<TabsSize>;
    /**
     * Adapts the color when used on dark background.
     */
    theme?: Theme;
    /**
     * The text weight.
     */
    weight?: TabsWeight;
} & {
    children?: import("react").ReactNode | undefined;
} & import("react").RefAttributes<HTMLElement>>;
