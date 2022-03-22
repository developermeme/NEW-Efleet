import React from "react";
import { useEmailVerify } from "./hooks/useEmailVerify";
import { useOTPVerify } from "./hooks/useOTPVerify";
import "./Style.scss";

export default function OTPVerify() {
  const { getOTPValue, handleOnSubmitOTP, OTPError, OTP } = useOTPVerify();

  const { ResendOTP } = useEmailVerify();

  return (
    <div className="login-container u-h5">
      <div className="wrapper">
        <div className="title u-h3">
          <span>OTP </span>
        </div>
        <p>Please enter one time password to verify your account</p>
        {OTPError && (
          <div className=" form__alert alert alert--error u-h6">{OTPError}</div>
        )}
        <form action="#">
          <div className="form-row">
            <i className="fas fa-user"></i>
            <input
              value={OTP.OTP}
              type="number"
              placeholder="OTP"
              name="OTP"
              onChange={getOTPValue as any}
            />
          </div>
          <div className="resend u-h6" onClick={ResendOTP}>
            <span>Resend OTP ?</span>
          </div>
          <button type="submit" onClick={handleOnSubmitOTP}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
