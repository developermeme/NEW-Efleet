import axios from "axios";
import React from "react";
import { onChange, onClick } from "../../../../helper/Properties";
import {
  LoginPage,
  useValidationInfoContext,
} from "../../../../context/ValidationContext";
import { useStorageValues } from "../../../../hooks/useLocalStorage";
import { user_baseURL } from "../../../../util/configFile";

export type OTP = {
  OTP: string;
  apiError?: string;
};

export const useOTPVerify = () => {
  const initialState: OTP = {
    OTP: "",
  };

  const [OTP, setOTP] = React.useState<OTP>(initialState);
  const [OTPError, setOTPError] = React.useState<string>("");
  const [otpSuccessMsg, setOtpSuccessMsg] = React.useState("");

  const { handleLoginRoute } = useValidationInfoContext();
  const { loginEmail } = useStorageValues();

  const getOTPValue = (e: onChange) => {
    const name = e.target.name;
    const value = e.target.value;
    setOTP({ ...OTP, [name]: value });
  };

  React.useEffect(() => {
    if (OTPError === "") {
      return;
    }
    const timer = setTimeout(() => {
      setOTPError("");
    }, 5000);
    return () => clearTimeout(timer);
  }, [OTPError]);

  const handeValidate = () => {
    let fields = OTP;
    let formIsValid = true;
    let otpError = "";

    if (!fields.OTP) {
      formIsValid = false;
      otpError = "Please enter an OTP.";
    }

    if (fields.OTP.length !== 6) {
      formIsValid = false;
      otpError = "Invalid OTP, Please try again.";
    }
    setOTPError(otpError);
    return formIsValid;
  };

  let requestOption = { emailId: loginEmail, otp: OTP.OTP };

  const handleOnSubmitOTP = async (e: onClick) => {
    e.preventDefault();

    if (handeValidate()) {
      console.log("Call OTP");
      await axios
        .post(`${user_baseURL}/users/otpcheck`, requestOption)
        .then((res: any) => {
          console.log(res);
          if (res) {
            setOtpSuccessMsg("Verified successfully!");
            handleLoginRoute(LoginPage.PASSWORD);
          }
        })
        .catch((error: any) => {
          console.log(error);
          if (error.response.status === 409) {
            setOTPError("Invalid OTP");
          } else {
            // handleErrorResponse(error);
            setOTPError("Something Went Wrong");
          }
        });
    }
  };
  return { OTP, getOTPValue, handleOnSubmitOTP, OTPError, otpSuccessMsg };
};
