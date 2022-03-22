import * as React from "react";
import { IButtonProps } from "./IButtonProps";
import classNames from "classnames";
import "./TextButton.scss";

/**
 * Responsible for rendering Button view
 *
 * @param props The props passed to the component
 * @returns The TextButton
 */
export const TextButton: React.FC<IButtonProps> = (
  props: IButtonProps
): JSX.Element => {
  const {
    ariaLabel,
    className,
    "data-testid": dataTestId,
    disabled,
    id,
    items,
    onClick,
    onKeyUp,
    title,
    type,
    isprimary,
    isSecondary,
  } = props;

  const classes: string = classNames(
    "opm-button",
    { "primary-button": isprimary },
    { "secondary-button": isSecondary },
    className
  );

  return (
    <button
      aria-label={ariaLabel}
      className={classes}
      data-testid={dataTestId}
      disabled={disabled}
      id={id}
      onClick={onClick}
      onKeyUp={onKeyUp}
      title={title}
      type={type || "button"}
    >
      {items}
    </button>
  );
};
