import { IProps } from "../IProps";

export type ButtonType = "button" | "reset" | "submit";

/**
 * Represents the common needed for the button component
 */
export interface IButtonProps extends IProps {
  /**
   * The aria label
   */
  ariaLabel?: string;

  /**
   * Sets the button to a disabled state
   */
  disabled?: boolean;

  /**
   * The address that the link should navigate to on click
   */
  href?: string;

  /**
   * The on click callback function
   */
  onClick?: (e?: React.SyntheticEvent<any>) => void;

  /**
   * The callback function when a key is pressed
   */
  onKeyUp?: (e: React.KeyboardEvent) => void;

  /**
   * The title of the button
   */
  title?: string;

  /**
   * The type of button
   *
   * @default "button"
   */
  type?: ButtonType;

  /**
   * The classes to use
   */
  classesName?: string;
  /**
   * The items contained in the button
   */
  items: any;

  isprimary?: boolean;

  isSecondary?: boolean;
}
