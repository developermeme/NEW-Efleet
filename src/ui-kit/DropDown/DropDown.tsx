import React, { useState } from "react";
import "./DropDown.scss";

interface IProps {
  items: string[];
  text: string;
  handleText: (e: any) => void;
}

export const DropDown = (props: IProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { items, text, handleText } = props;

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const ItemList = () => {
    const list = items.map((item: string) => (
      <div
        onClick={handleText}
        className="dropdown__item"
        key={item.toString()}
      >
        {item}
      </div>
    ));

    return <div className="dropdown__items"> {list} </div>;
  };

  return (
    <div
      className={isOpen ? "dropdown active" : "dropdown"}
      onClick={handleClick}
    >
      <div className="dropdown__text">{!text ? "Assign Rider" : text}</div>
      {<ItemList />}
    </div>
  );
};
