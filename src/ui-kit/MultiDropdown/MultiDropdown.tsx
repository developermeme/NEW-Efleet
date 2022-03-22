import React, { useState, useEffect } from "react";
import { Check, ChevronDown, ChevronUp, X } from "../../asset/Icons/Icons";
import "./Style.scss";

interface IProps {
  placeholder: string;
  multiple: boolean;
  options: {
    [name: string]: any;
  }[];
  handleFiltersChange: (value: string[]) => void;
}

const MultiDropdown = (props: IProps): JSX.Element => {
  const { placeholder, multiple, options, handleFiltersChange } = props;

  const [values, setValues] = useState<any[]>([]);
  const [focusedValue, setFocusedValue] = useState<number>(-1);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onClick = () => {
    setIsOpen(!isOpen);
  };

  const onHoverOption = (e: any) => {
    const { value } = e.currentTarget.dataset;
    const index = options.findIndex((option: any) => option.value === value);
    setFocusedValue(index);
  };

  const onDeleteOption = (value: string) => {
    const slicedData = values.filter((item, i) => item !== value);
    setValues(slicedData);
  };

  const onClickOption = (e: any) => {
    const { value } = e.currentTarget.dataset;
    const index = values.indexOf(value);

    if (index === -1) {
      if (!multiple) {
        setValues([value]);
        setIsOpen(false);
      } else {
        setValues([...values, value]);
      }
    } else {
      onDeleteOption(value);
    }
  };

  useEffect(() => {
    handleFiltersChange(values);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  const renderValues = () => {
    if (values.length === 0) {
      return <div className="placeholder">{placeholder}</div>;
    }
    if (multiple) {
      return values.map((value) => {
        return (
          <span key={value} className="multiple value">
            {value}
            <span
              data-value={value}
              onClick={() => onDeleteOption(value)}
              className="delete"
            >
              <X />
            </span>
          </span>
        );
      });
    }
    return <div className="value single">{values[0]}</div>;
  };

  const renderOption = (option: any, index: any) => {
    const selected = values.includes(option.value);
    let className = "option";
    if (selected) className += " selected";
    if (index === focusedValue) className += " focused";
    return (
      <div
        key={option.value}
        data-value={option.value}
        className={className}
        onMouseOver={onHoverOption}
        onClick={onClickOption}
      >
        {multiple ? (
          <span className="checkbox">{selected ? <Check /> : null}</span>
        ) : null}
        {option.value}
      </div>
    );
  };

  const renderOptions = () => {
    if (!isOpen) {
      return null;
    }
    return <div className="options">{options.map(renderOption)}</div>;
  };

  return (
    <div className="multi-select">
      <div className="select">
        <div className="selection" onClick={onClick}>
          {renderValues()}
          <span className="arrow">
            {isOpen ? <ChevronUp /> : <ChevronDown />}
          </span>
        </div>
        {renderOptions()}
      </div>
    </div>
  );
};

export default MultiDropdown;
