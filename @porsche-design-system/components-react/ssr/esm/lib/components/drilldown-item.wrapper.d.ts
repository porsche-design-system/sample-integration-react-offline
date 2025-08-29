import type { BaseProps } from '../../BaseProps';
export type PDrilldownItemProps = BaseProps & {
    /**
     * Private property set by the component itself.
     */
    cascade?: boolean;
    /**
     * Unique identifier which controls if this item should be shown when the active-identifier on the drilldown is set to this value.
     */
    identifier: string;
    /**
     * Renders back button, header section on mobile view and cascade button to reach a deeper level of the navigation structure.
     */
    label?: string;
    /**
     * Private property set by the component itself.
     */
    primary?: boolean;
    /**
     * Private property set by the component itself.
     */
    secondary?: boolean;
};
export declare const PDrilldownItem: import("react").ForwardRefExoticComponent<import("react").DOMAttributes<{}> & Pick<import("react").HTMLAttributes<{}>, "suppressHydrationWarning" | "autoFocus" | "className" | "dir" | "hidden" | "id" | "inert" | "lang" | "slot" | "style" | "tabIndex" | "title" | "translate" | "role"> & {
    /**
     * Private property set by the component itself.
     */
    cascade?: boolean;
    /**
     * Unique identifier which controls if this item should be shown when the active-identifier on the drilldown is set to this value.
     */
    identifier: string;
    /**
     * Renders back button, header section on mobile view and cascade button to reach a deeper level of the navigation structure.
     */
    label?: string;
    /**
     * Private property set by the component itself.
     */
    primary?: boolean;
    /**
     * Private property set by the component itself.
     */
    secondary?: boolean;
} & {
    children?: import("react").ReactNode | undefined;
} & import("react").RefAttributes<HTMLElement>>;
