
import React from "react";
import { Link } from "react-router-dom";
import { LoginPage, useValidationInfoContext } from "../../../context/ValidationContext";


import { useLogin } from "./hooks/useLogin";
import { getToast } from "./Script";
import "./Style.scss";

const AccountLogin = () => {
  const {
    loginCredentials,
    loginErrors,
    successMsg,
    handleLoginSubmit,
    handleLoginFormChange,
    onFocusEvent,
  } = useLogin();

  const { handleLoginRoute } = useValidationInfoContext();
  
  const toast = getToast(successMsg, loginErrors as string);

  return (
    <div className="login-container u-h5">
      <div className="wrapper">
        <div className="title u-h3">
          <span>Login</span>
        </div>

        {toast.message && (
          <p className={`alert ${toast.classname} form__alert u-h6`}>
            {toast.message}
          </p>
        )}

        <form action="#" onSubmit={handleLoginSubmit as any}>
          <div className="form-row">
            <i className="fas fa-user"></i>
            <input
              type="text"
              placeholder="Email"
              name="emailId"
              value={loginCredentials.emailId}
              onChange={handleLoginFormChange}
              onFocus={onFocusEvent}
            />
          </div>
          <div className="form-row">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={loginCredentials.password}
              onChange={handleLoginFormChange as any}
              onFocus={onFocusEvent}
            />
          </div>
          <div
            className="pass u-h6"
            onClick={() => {
              handleLoginRoute(LoginPage.EMAIL);
            }}
          >
            <span>Forgot password?</span>
          </div>
          <button type="submit">Submit</button>
          <div className="form__footer u-h6">
            <span>Don't have an account ? &nbsp;</span>
            <Link to="/Register" >
              Create One
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountLogin;
