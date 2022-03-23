import React, { useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {
  RegisterPage,
  ValidationContext,
} from "../../../../context/ValidationContext";
import { IRootState } from "../../../../redux/reducer/CombineReducer";
import { onClick } from "../../../../helper/Properties";
import { IDocsRegister } from "../../../../redux/slice/user-slice/Types";
import { user_baseURL } from "../../../../util/configFile";
import { setDocsData } from "../../../../redux/slice/user-slice/Slice";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  deleteUserDocumentFromAuth,
} from "../../../../redux/firebase/firebase";

function useDocumentForm() {
  const { handleRegisterRoute } = useContext(ValidationContext) as any;
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  // Initial Value From Redux
  const { userData } = useSelector((state: IRootState) => state);
  const UserCredentials = userData && userData.UserCredentials;
  const hubCredentials = userData && userData.hubCredentials;

  const countrycode = userData && userData.countryCode;

  let credentials = { ...UserCredentials };
  credentials.phoneNumber = (countrycode as string) + credentials.phoneNumber;

  const dispatch = useDispatch();

  const history = useHistory();

  const initialDocs: IDocsRegister = {
    idProof: undefined,
    bussinessCertificate: undefined,
    hubProof: undefined,
  };

  const [docsCredentials, setDocsCredentials] =
    useState<IDocsRegister>(initialDocs);
  const [errors, setErrors] = React.useState<string | undefined>(undefined);
  const [successMsg, setSuccessMsg] = React.useState<string | undefined>(
    undefined
  );

  const handleDocsFormChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.files[0];
    setDocsCredentials({ ...docsCredentials, [name]: value });
  };

  const onFocusEvent = () => {
    setErrors("");
  };

  useEffect(() => {
    if (errors === "" || successMsg === "") {
      return;
    }
    const timer = setTimeout(() => {
      setErrors("");
      setSuccessMsg("");
    }, 5000);
    return () => clearTimeout(timer);
  }, [errors, successMsg]);

  const handleDocsvalidate = () => {
    let fields = docsCredentials;
    let errors = "";
    let formIsValid = true;

    // eslint-disable-next-line array-callback-return
    Object.entries(fields).map(([key, value]) => {
      if (formIsValid && !value) {
        formIsValid = false;
        errors = `Please enter valid ${key}`;
      }
    });
    setErrors(errors);
    return formIsValid;
  };

  let formatted_address: any;
  const api = "AIzaSyDmWLF7ThVnAkVzH3uVBvb1n_FiGaUBKwc";

  const getGeoLocation = async () => {
    if (hubCredentials) {
      formatted_address = Object.values(hubCredentials).reduce(function (
        result,
        data
      ) {
        return result.concat(data) + ", ";
      },
      "");

      // Making API Call to get Lat and Lng
      await axios
        .get(
          "https://maps.googleapis.com/maps/api/geocode/json?address=" +
            formatted_address +
            "&key=" +
            api
        )
        .then((response: any) => {
          console.log("data", response.data.results);
          // eslint-disable-next-line array-callback-return
          response.data.results.map((data: any) => {
            setLatitude(data.geometry.location.lat);
            setLongitude(data.geometry.location.lng);
          });
        });
    }
  };

  useEffect(() => {
    getGeoLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signup = async (loggedInUser: any) => {
    // Register User In Efleet Backend
    const docdata = {
      ...credentials,
      ...hubCredentials,
      ...docsCredentials,
      hubLatitute: latitude,
      hubLongitude: longitude,
    };

    let hubRegisterFormData: any = new FormData();

    Object.entries(docdata).map(([key, value]) => {
      hubRegisterFormData.append(key, value);
      return value;
    });

    await axios
      .post(`${user_baseURL}/users/hubadminreg`, hubRegisterFormData)
      .then((response: any) => {
        setSuccessMsg("User logged in successfully...!");
        localStorage.setItem("user", JSON.stringify(loggedInUser));
        history.push("/");
      })
      .catch(async (error: any) => {
        setErrors("Something Went Wrong , try Later");
        try {
          await deleteUserDocumentFromAuth(loggedInUser);
          console.log("deleted Successfully");
        } catch (error) {
          console.log("Couldn't delete the User In fire base");
        }
      });
  };

  const userdata = {
    name: UserCredentials?.userName,
    role: UserCredentials?.role,
    id: UserCredentials?.phoneNumber,
    phone: UserCredentials?.phoneNumber,
    isOnline: true,
    lastSeen: Date.now(),
  };

  const addUserData = async (user: any) => {
    setSuccessMsg("Processing...");
    try {
      await createUserDocumentFromAuth(user, userdata);
      await signup(user);
      // localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      console.log("user details update encountered an error", error);
      setErrors("User data update encountered an error");
    }
  };

  const handleRegisterSubmit = async (e: onClick) => {
    e.preventDefault();

    const password = "Meme@123";

    if (handleDocsvalidate()) {
      dispatch(setDocsData(docsCredentials));
      getGeoLocation();
      // signupInFirebase(userdata);

      try {
        const { user } = (await createAuthUserWithEmailAndPassword(
          UserCredentials?.emailId,
          password
        )) as any;

        addUserData(user);
      } catch (error: any) {
        if (error.code === "auth/email-already-in-use") {
          setErrors("Cannot create user, email already in use");
        } else {
          setErrors("user creation encountered an error");
          console.log("user creation encountered an error", error);
        }
      }
    }
  };

  const handleDocsFormBack = (e: onClick) => {
    e.preventDefault();
    handleRegisterRoute(RegisterPage.HUBFORM);
  };

  return {
    docsCredentials,
    errors,
    successMsg,
    onFocusEvent,
    handleDocsFormChange,
    handleDocsFormBack,
    handleRegisterSubmit,
  };
}

export default useDocumentForm;
