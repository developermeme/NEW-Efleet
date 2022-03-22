import React, { useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { auth, firestore } from "firebase";
import {
  RegisterPage,
  ValidationContext,
} from "../../../../context/ValidationContext";
import { IRootState } from "../../../../redux/reducer/CombineReducer";
import { onClick } from "../../../../helper/Properties";
import { IDocsRegister } from "../../../../redux/slice/user-slice/Types";
import { user_baseURL } from "../../../../util/configFile";
import { setDocsData } from "../../../../redux/slice/user-slice/Slice";
import { useStorageValues } from "../../../../hooks/Index";

function useDocumentForm() {
  const { handleRegisterRoute } = useContext(ValidationContext) as any;
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const { LoginHubid } = useStorageValues();

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

  const signup = async (loggedInUser: any, currentUser: any) => {
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
        console.log("User logged in successfully...!");
        localStorage.setItem("user", JSON.stringify(loggedInUser));
        history.push("/");
      })
      .catch((error: any) => {
        setErrors("Something Went Wrong , try Later");
        if (error.response!.status === 501 || 500) {
          history.push("/");
        } else {
          const user = currentUser;
          user
            .delete()
            .then(() => {
              console.log("deleted Successfully");
            })
            .catch((error: any) =>
              console.log("Couldn't delete the User In fire base")
            );
        }
      });
  };

  // Register User In FireBase

  const signupInFirebase = async (user: any) => {
    setSuccessMsg("Processing...");
    const db = firestore();

    auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((data: any) => {
        const currentUser = auth().currentUser as any;

        const loggedInUser = {
          name: user.name,
          email: user.email,
          uid: data.user.uid,
          role: user.role,
        };
        console.log(loggedInUser, "registerHubid");
        currentUser
          .updateProfile({
            displayName: user.name,
          })
          .then(() => {
            if (loggedInUser.role === "RIDER") {
              var x = (LoginHubid as any) || "";
            } else {
              x = "";
            }
            db.collection("efleetusers")
              .doc(data.user.uid)

              .set({
                ...loggedInUser,
                hubid: x,
                createdAt: new Date(),
                lastseen: new Date(),
                isOnline: true,
              })
              .then(() => {
                if (loggedInUser.role === "ADMIN" && "SUPER_ADMIN") {
                  signup(loggedInUser, currentUser);
                  console.log("User Stored in  firebase in successfully...!");
                } else {
                  console.log("Rider Stored in  firebase in successfully...!");
                }
              })
              .catch((error) => {
                setErrors("Error Occurs While Adding Fields Error");
                console.log("Adding Extra Fields Error", error);
              });
          })
          .catch((error: any) => {
            setErrors("Update Profile Error");
            console.log("Update Profile Error", error);
          });
      })
      .catch((error) => {
        setErrors("Error Occurs While Registering");
        console.log(error);
      });
  };

  const userdata = {
    name: UserCredentials?.userName,
    email: UserCredentials?.emailId,
    password: "Meme@123",
    role: UserCredentials?.role,
  };

  const handleRegisterSubmit = async (e: onClick) => {
    e.preventDefault();

    if (handleDocsvalidate()) {
      dispatch(setDocsData(docsCredentials));
      getGeoLocation();
      signupInFirebase(userdata);
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
    signupInFirebase,
    onFocusEvent,
    handleDocsFormChange,
    handleDocsFormBack,
    handleRegisterSubmit,
  };
}

export default useDocumentForm;
