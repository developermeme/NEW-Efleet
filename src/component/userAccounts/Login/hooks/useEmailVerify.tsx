import axios from "axios";
import React from "react";
import { onChange, onClick } from "../../../../helper/Properties";
import {
  LoginPage,
  useValidationInfoContext,
} from "../../../../context/ValidationContext";
import { useStorageValues } from "../../../../hooks/useLocalStorage";
import { user_baseURL } from "../../../../util/configFile";
import { validateEmailId } from "../Script";

export type EmailVerify = {
  email: string;
  apiError?: "";
};

export const useEmailVerify = () => {
  const forgotPwdState = {
    email: "",
  };

  const [registeredEmail, setRegisteredEmail] =
    React.useState<EmailVerify>(forgotPwdState);
  const [emailError, setEmailError] = React.useState<string>("");

  const { handleLoginRoute } = useValidationInfoContext();
  const { loginEmail, setLoginEmail } = useStorageValues();

  const handleEmailInputChange = (e: onChange) => {
    const name = e.target.name;
    const value = e.target.value;
    setRegisteredEmail({ ...registeredEmail, [name]: value });
  };

  const handeValidate = () => {
    let fields = registeredEmail;
    let formIsValid = true;
    let userNameError = "";

    const isValidEmailId = validateEmailId(fields.email);
    formIsValid = isValidEmailId.formIsValid;
    userNameError = isValidEmailId.error;
    setEmailError(userNameError);
    return formIsValid;
  };

  React.useEffect(() => {
    if (emailError === "") {
      return;
    }
    const timer = setTimeout(() => {
      setEmailError("");
    }, 5000);
    return () => clearTimeout(timer);
  }, [emailError]);

  const ResendOTP = async () => {
    const reqOption = { emailId: registeredEmail.email || loginEmail };

    await axios
      .post(`${user_baseURL}/users/riderresetpass`, reqOption)
      .then((res: any) => {
        setLoginEmail(reqOption.emailId as any);
        handleLoginRoute(LoginPage.OTP);
      })
      .catch((error: any) => {
        console.log(error);
        setEmailError("Please Enter Registered Email");
      });
  };

  const handleForgotPasswordSubmit = (e: onClick) => {
    e.preventDefault();

    if (handeValidate()) {
      ResendOTP();
    }
  };
  return {
    registeredEmail,
    handleEmailInputChange,
    handleForgotPasswordSubmit,
    ResendOTP,
    emailError,
  };
};
