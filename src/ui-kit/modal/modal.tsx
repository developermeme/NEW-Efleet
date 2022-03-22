import React, { ReactChildren, ReactChild } from "react";
import ReactDom from "react-dom";
import "./modal.scss";
import { FaTimes } from "react-icons/fa";
import { onClick } from "../../helper/Properties";

interface IModal {
  onClose: (e: onClick) => void;
  children: ReactChild | ReactChildren;
  visibilty: boolean;
  header?: string;
  classname?: string;
}

const Modal = (props: IModal) => {
  const { onClose, children, visibilty, header, classname } = props;

  const ModalWrapper = () => {
    return (
      <div
        className={`modal-wrapper ${visibilty && "active"} ${classname || ""}`}
      >
        <div className="backdrop" onClick={onClose} />
        <div className="modal__container">
          <div className="modal__header">
            <h4 className="modal__title">{header}</h4>
            <button className="modal__close-btn" onClick={onClose}>
              <FaTimes></FaTimes>
            </button>
          </div>
          <div className="modal__content">{children}</div>
        </div>
      </div>
    );
  };

  const portalElement: HTMLElement = document.getElementById(
    "overlays"
  ) as HTMLElement;

  return (
    <React.Fragment>
      {ReactDom.createPortal(<ModalWrapper />, portalElement)}
    </React.Fragment>
  );
};

export default Modal;
