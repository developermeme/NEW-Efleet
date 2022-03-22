import axios from "axios";
import React from "react";
import { validateEmailId, validatePassword } from "../Script";
import { auth, firestore } from "firebase";
import { onChange, onClick } from "../../../../helper/Properties";
import { useStorageValues } from "../../../../hooks/useLocalStorage";
import { user_baseURL } from "../../../../util/configFile";

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

  // Updating Logged In User in Firebase

  const user = {
    email: loginCredentials.emailId,
    password: "Meme@123",
  };

  const signin = () => {
    setSuccessMsg("Processing...");
    auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then((data: any) => {
        const db = firestore();
        const loggedInUser = {
          name: data.user.displayName,
          email: data.user.email,
          role: data.user.role,
          uid: data.user.uid,
        };
        db.collection("efleetusers")
          .doc(data.user.uid)
          .update({
            isOnline: true,
            lastseen: new Date(),
          })
          .then(() => {
            setSuccessMsg("Sucessfully logged in!");

            localStorage.setItem("user", JSON.stringify(loggedInUser));

            window.location.href = "/Home";
          })
          .catch((error) => {
            console.log(error);
            localStorage.clear();
            setLoginErrors(
              "Something Went Wrong!, Please Contact Support Team"
            );
          });
      })
      .catch((error) => {
        console.log(error);
        setLoginErrors("Please Contact Support Team");
      });
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
          console.log("Loginresp", response.data.userId);

          setLoginEmail(user.emailId as any);
          setLoginHubid(response.data.hubId);
          setLoginRole(response.data.role);
          setAdminUserId(response.data.userId);
          setHubLocation(response.data.hubLocation);
          // Ensure User is available in firebase
          signin();
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
