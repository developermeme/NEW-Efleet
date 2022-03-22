import React from "react";
import Spinner from "../../asset/Images/spinner.gif";
import "./Style.scss";

const FullPageLoader = () => {
  return (
    <div className="fp-container">
      <img src={Spinner} className="fp-loader" alt="loading" />
    </div>
  );
};

export default FullPageLoader;
