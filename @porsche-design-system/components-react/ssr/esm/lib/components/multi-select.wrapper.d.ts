import type { BaseProps } from '../../BaseProps';
import type { MultiSelectDropdownDirection, BreakpointCustomizable, MultiSelectUpdateEventDetail, MultiSelectState, Theme } from '../types';
export type PMultiSelectProps = BaseProps & {
    /**
     * Displays as compact version.
     */
    compact?: boolean;
    /**
     * The description text.
     */
    description?: string;
    /**
     * Disables the multi-select
     */
    disabled?: boolean;
    /**
     * Changes the direction to which the dropdown list appears.
     */
    dropdownDirection?: MultiSelectDropdownDirection;
    /**
     * The id of a form element the multi-select should be associated with.
     */
    form?: string;
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
     * The name of the control.
     */
    name: string;
    /**
     * Emitted when the selection is changed.
     */
    onUpdate?: (event: CustomEvent<MultiSelectUpdateEventDetail>) => void;
    /**
     * A Boolean attribute indicating that an option with a non-empty string value must be selected.
     */
    required?: boolean;
    /**
     * The validation state.
     */
    state?: MultiSelectState;
    /**
     * Adapts the multi-select color depending on the theme.
     */
    theme?: Theme;
    /**
     * The selected values.
     */
    value?: string[];
};
export declare const PMultiSelect: import("react").ForwardRefExoticComponent<import("react").DOMAttributes<{}> & Pick<import("react").HTMLAttributes<{}>, "suppressHydrationWarning" | "autoFocus" | "className" | "dir" | "hidden" | "id" | "inert" | "lang" | "slot" | "style" | "tabIndex" | "title" | "translate" | "role"> & {
    /**
     * Displays as compact version.
     */
    compact?: boolean;
    /**
     * The description text.
     */
    description?: string;
    /**
     * Disables the multi-select
     */
    disabled?: boolean;
    /**
     * Changes the direction to which the dropdown list appears.
     */
    dropdownDirection?: MultiSelectDropdownDirection;
    /**
     * The id of a form element the multi-select should be associated with.
     */
    form?: string;
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
     * The name of the control.
     */
    name: string;
    /**
     * Emitted when the selection is changed.
     */
    onUpdate?: (event: CustomEvent<MultiSelectUpdateEventDetail>) => void;
    /**
     * A Boolean attribute indicating that an option with a non-empty string value must be selected.
     */
    required?: boolean;
    /**
     * The validation state.
     */
    state?: MultiSelectState;
    /**
     * Adapts the multi-select color depending on the theme.
     */
    theme?: Theme;
    /**
     * The selected values.
     */
    value?: string[];
} & {
    children?: import("react").ReactNode | undefined;
} & import("react").RefAttributes<HTMLElement>>;
