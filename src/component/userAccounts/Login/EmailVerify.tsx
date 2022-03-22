import React from "react";
import { Link } from "react-router-dom";
import {
  LoginPage,
  useValidationInfoContext,
} from "../../../context/ValidationContext";

import { useEmailVerify } from "./hooks/useEmailVerify";
import "./Style.scss";

export default function EmailVerify() {
  const {
    registeredEmail,
    handleEmailInputChange,
    handleForgotPasswordSubmit,
    emailError,
  } = useEmailVerify();

  const { handleLoginRoute } = useValidationInfoContext();

  return (
    <div className="login-container u-h5">
      <div className="wrapper">
        <div className="title u-h3">
          <span>Forgot Password</span>
        </div>
        <p>Please enter your registered e-mail or mobile number</p>
        {emailError && (
          <p className="alert alert--error form__alert u-h6">{emailError}</p>
        )}
        <form action="#">
          <div className="form-row">
            <i className="fas fa-user"></i>
            <input
              type="email"
              placeholder="e-mail"
              name="email"
              value={registeredEmail.email}
              onChange={handleEmailInputChange as any}
            />
          </div>
          <button type="submit" onClick={handleForgotPasswordSubmit as any}>
            Submit
          </button>

          <div className="form__footer u-h6">
            <span>Remember your password? &nbsp;</span>
            <Link
              to="/"
              onClick={() => {
                handleLoginRoute(LoginPage.LOGIN);
              }}
            >
              Back to login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
