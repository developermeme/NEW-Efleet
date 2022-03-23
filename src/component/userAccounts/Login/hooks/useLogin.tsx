import axios from "axios";
import React from "react";
import { validateEmailId, validatePassword } from "../Script";
import { onChange, onClick } from "../../../../helper/Properties";
import { useStorageValues } from "../../../../hooks/useLocalStorage";
import { user_baseURL } from "../../../../util/configFile";
import {
  signInAuthUserWithEmailAndPassword,
  updateUserDocumentFromAuth,
} from "../../../../redux/firebase/firebase";

export type loginState = {
  emailId: string;
  password: string;
  apiError?: string;
};

export const useLogin = () => {
  const loginInitialState: loginState = {
    emailId: "",
    password: "",
  };

  const [loginCredentials, setLoginCredentials] =
    React.useState<loginState>(loginInitialState);
  const [loginErrors, setLoginErrors] = React.useState<string>("");
  const [successMsg, setSuccessMsg] = React.useState("");

  const handleLoginFormChange = (e: onChange) => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginCredentials({ ...loginCredentials, [name]: value });
  };

  const {
    setLoginEmail,
    setLoginHubid,
    setLoginRole,
    setAdminUserId,
    setHubLocation,
  } = useStorageValues();

  const handleLoginValidation = () => {
    let fields = loginCredentials;
    let formIsValid = true;
    let errors = "";

    const isValidEmailId = validateEmailId(fields.emailId);
    const isValidPassword = validatePassword(fields.password);

    if (formIsValid && !isValidEmailId.formIsValid) {
      errors = isValidEmailId.error;
      formIsValid = false;
    } else if (formIsValid && !isValidPassword.formIsValid) {
      errors = isValidPassword.error;
      formIsValid = false;
    } else {
      errors = "";
      formIsValid = true;
    }
    setLoginErrors(errors);
    return formIsValid;
  };

  const onFocusEvent = () => {
    setLoginErrors("");
  };

  React.useEffect(() => {
    if (loginErrors === "") {
      return;
    }
    const timer = setTimeout(() => {
      setLoginErrors("");
    }, 3000);
    return () => clearTimeout(timer);
  }, [loginErrors]);

  const updateUserData = async (user: any) => {
    try {
      const additionalInformation = {
        isOnline: true,
        lastSeen: Date.now(),
      };
      await updateUserDocumentFromAuth(user, additionalInformation);
      setSuccessMsg("Sucessfully logged in!");
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      console.log("error", error);
      localStorage.clear();
      setLoginErrors(
        "Please contact support team, error While updating user data"
      );
    }
  };

  const handleUserFirebaseLogin = async () => {
    setSuccessMsg("Processing...");
    const password = "Meme@123";
    try {
      const { user } = (await signInAuthUserWithEmailAndPassword(
        loginCredentials.emailId,
        password
      )) as any;
      await updateUserData(user);
      window.location.href = "/Home";
    } catch (error: any) {
      switch (error.code) {
        case "auth/wrong-password":
          setLoginErrors("Incorrect password for email");
          break;
        case "auth/user-not-found":
          setLoginErrors("No user associated with this email");
          break;
        default:
          console.log(error);
          setLoginErrors("Something went wrong!, please contact support team");
      }
    }
  };

  const handleLoginSubmit = async (e: onClick) => {
    e.preventDefault();

    const user = {
      emailId: loginCredentials.emailId,
      password: loginCredentials.password,
    };

    if (handleLoginValidation()) {
      await axios
        .post(`${user_baseURL}/users/login`, user)
        .then((response: any) => {
          setLoginEmail(user.emailId as any);
          setLoginHubid(response.data.hubId);
          setLoginRole(response.data.role);
          setAdminUserId(response.data.userId);
          setHubLocation(response.data.hubLocation);

          // Ensure User is available in firebase
          handleUserFirebaseLogin();
        })
        .catch((error: any) => {
          console.log(error);
          setLoginErrors("Incorrect Credentials");
        });
    }
  };

  return {
    loginCredentials,
    loginErrors,
    handleLoginFormChange,
    handleLoginSubmit,
    successMsg,
    onFocusEvent,
  };
};
