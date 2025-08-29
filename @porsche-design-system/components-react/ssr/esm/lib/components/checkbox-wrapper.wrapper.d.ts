import type { BaseProps } from '../../BaseProps';
import type { BreakpointCustomizable, CheckboxWrapperState, Theme } from '../types';
export type PCheckboxWrapperProps = BaseProps & {
    /**
     * Show or hide label. For better accessibility it's recommended to show the label.
     */
    hideLabel?: BreakpointCustomizable<boolean>;
    /**
     * The label text.
     */
    label?: string;
    /**
     * @experimental Disables the checkbox and shows a loading indicator.
     */
    loading?: boolean;
    /**
     * The message styled depending on validation state.
     */
    message?: string;
    /**
     * The validation state.
     */
    state?: CheckboxWrapperState;
    /**
     * Adapts the color depending on the theme.
     */
    theme?: Theme;
};
/** @deprecated since v3.29.0, will be removed with next major release. Please use `p-checkbox` instead. */
export declare const PCheckboxWrapper: import("react").ForwardRefExoticComponent<import("react").DOMAttributes<{}> & Pick<import("react").HTMLAttributes<{}>, "suppressHydrationWarning" | "autoFocus" | "className" | "dir" | "hidden" | "id" | "inert" | "lang" | "slot" | "style" | "tabIndex" | "title" | "translate" | "role"> & {
    /**
     * Show or hide label. For better accessibility it's recommended to show the label.
     */
    hideLabel?: BreakpointCustomizable<boolean>;
    /**
     * The label text.
     */
    label?: string;
    /**
     * @experimental Disables the checkbox and shows a loading indicator.
     */
    loading?: boolean;
    /**
     * The message styled depending on validation state.
     */
    message?: string;
    /**
     * The validation state.
     */
    state?: CheckboxWrapperState;
    /**
     * Adapts the color depending on the theme.
     */
    theme?: Theme;
} & {
    children?: import("react").ReactNode | undefined;
} & import("react").RefAttributes<HTMLElement>>;
