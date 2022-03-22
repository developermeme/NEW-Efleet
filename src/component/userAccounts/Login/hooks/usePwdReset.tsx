import axios from "axios";
import React from "react";

import {
  LoginPage,
  useValidationInfoContext,
} from "../../../../context/ValidationContext";
import { onChange, onClick } from "../../../../helper/Properties";
import { handleErrorResponse } from "../../../../helper/Script";
import { useStorageValues } from "../../../../hooks/useLocalStorage";
import { user_baseURL } from "../../../../util/configFile";

import { validatePassword } from "../Script";
import { useHistory } from "react-router-dom";

export const usePwdReset = () => {
  const initialState = {
    password: "",
    cpassword: "",
  };

  const [password, setpassword] = React.useState(initialState);
  const [pwdError, setPwdError] = React.useState<string>("");

  const { handleLoginRoute, activeLoginPage } = useValidationInfoContext();
  const { loginEmail } = useStorageValues();

  const history = useHistory();

  const handlePasswordChange = (e: onChange) => {
    const name = e.target.name;
    const value = e.target.value;
    setpassword({ ...password, [name]: value });
  };

  React.useEffect(() => {
    if (pwdError === "") {
      return;
    }
    const timer = setTimeout(() => {
      setPwdError("");
    }, 5000);
    return () => clearTimeout(timer);
  }, [pwdError]);

  const handeValidate = () => {
    let fields = password;
    let formIsValid = true;
    let passwordError = "";

    const isValidpassword = validatePassword(fields.password);
    const isValidConfirmpassword = validatePassword(fields.cpassword);

    if (formIsValid && !isValidpassword.formIsValid) {
      passwordError = isValidpassword.error;
      formIsValid = false;
    } else if (formIsValid && !isValidConfirmpassword.formIsValid) {
      passwordError = isValidConfirmpassword.error;
      formIsValid = false;
    } else if (formIsValid && fields.password !== fields.cpassword) {
      formIsValid = false;
      passwordError = "New passwords do not match.";
    } else {
      passwordError = "";
      formIsValid = true;
    }
    setPwdError(passwordError);
    return formIsValid;
  };

  const requestOption: any = {
    emailId: loginEmail,
    password: password.password,
  };

  const handleUpdatePwdOnSubmit = async (e: onClick, page?: string) => {
    e.preventDefault();

    if (handeValidate()) {
      console.log("activeLoginPage", activeLoginPage);
      await axios
        .put(`${user_baseURL}/users/updateriderpassword`, requestOption)
        .then((res: any) => {
          if (LoginPage.UPDATEPASSWORD === activeLoginPage) {
            history.push("/Home");
          } else {
            handleLoginRoute(LoginPage.LOGIN);
          }
        })
        .catch((error: any) => {
          console.log(error);
          handleErrorResponse(error);
        });
    }
  };

  return { handlePasswordChange, handleUpdatePwdOnSubmit, password, pwdError };
};
