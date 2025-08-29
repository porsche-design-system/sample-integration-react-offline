import type { BaseProps } from '../../BaseProps';
import type { SelectWrapperDropdownDirection, BreakpointCustomizable, SelectWrapperState, Theme } from '../types';
export type PSelectWrapperProps = BaseProps & {
    /**
     * The description text.
     */
    description?: string;
    /**
     * Changes the direction to which the dropdown list appears.
     */
    dropdownDirection?: SelectWrapperDropdownDirection;
    /**
     * Filters select options by typing a character
     */
    filter?: boolean;
    /**
     * Show or hide label. For better accessibility it is recommended to show the label.
     */
    hideLabel?: BreakpointCustomizable<boolean>;
    /**
     * The label text.
     */
    label?: string;
    /**
     * The message styled depending on validation state.
     */
    message?: string;
    /**
     * Forces rendering of native browser select dropdown
     */
    native?: boolean;
    /**
     * The validation state.
     */
    state?: SelectWrapperState;
    /**
     * Adapts the select color depending on the theme.
     */
    theme?: Theme;
};
/** @deprecated since v3.29.0, will be removed with next major release. Please use `p-select` instead. */
export declare const PSelectWrapper: import("react").ForwardRefExoticComponent<import("react").DOMAttributes<{}> & Pick<import("react").HTMLAttributes<{}>, "suppressHydrationWarning" | "autoFocus" | "className" | "dir" | "hidden" | "id" | "inert" | "lang" | "slot" | "style" | "tabIndex" | "title" | "translate" | "role"> & {
    /**
     * The description text.
     */
    description?: string;
    /**
     * Changes the direction to which the dropdown list appears.
     */
    dropdownDirection?: SelectWrapperDropdownDirection;
    /**
     * Filters select options by typing a character
     */
    filter?: boolean;
    /**
     * Show or hide label. For better accessibility it is recommended to show the label.
     */
    hideLabel?: BreakpointCustomizable<boolean>;
    /**
     * The label text.
     */
    label?: string;
    /**
     * The message styled depending on validation state.
     */
    message?: string;
    /**
     * Forces rendering of native browser select dropdown
     */
    native?: boolean;
    /**
     * The validation state.
     */
    state?: SelectWrapperState;
    /**
     * Adapts the select color depending on the theme.
     */
    theme?: Theme;
} & {
    children?: import("react").ReactNode | undefined;
} & import("react").RefAttributes<HTMLElement>>;
