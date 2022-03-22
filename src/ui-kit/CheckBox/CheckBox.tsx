import React from "react";
import "./CheckBox.scss";

export interface ICheckboxProps {
  id: string;
  name?: string;
  ariaLabel?: string;
  disabled?: boolean;
  isValid?: boolean;
  checked?: boolean;
  onBlur?: (e: React.SyntheticEvent<any>) => void;
  onChange?: (e: React.SyntheticEvent<any>, item?: any) => void;
  onFocus?: (e: React.SyntheticEvent<any>) => void;
  readOnly?: boolean;
  value?: string;
}

function CheckBox(props: ICheckboxProps) {
  const { id, onBlur, onChange, onFocus, value, checked } = props;

  // console.log(checked);

  return (
    <div className="form-checkbox">
      <input
        id={id}
        type="checkbox"
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        checked={checked}
      />
      <label htmlFor={id}>{id}</label>
    </div>
  );
}

export default CheckBox;
