import React, { ReactChildren, ReactChild } from "react";
import "./card.scss";

interface ICard {
  children: ReactChild | ReactChildren;
}

const Card = (props: ICard) => {
  return <div className="card">{props.children}</div>;
};

export default Card;
