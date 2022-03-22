import axios from "axios";
import React, { useState } from "react";
import { Countries } from "../../../helper/json/Countries";
import { onClick } from "../../../helper/Properties";
import { user_baseURL } from "../../../util/configFile";
import useRiders from "../useRiders";
import {
  validateEmailId,
  validateMobileNumber,
  validateName,
} from "../../userAccounts/Login/Script";

import usePayment from "../../payments/paymentDetails/usePayment";
import { useStorageValues } from "../../../hooks/Index";
import useDocumentForm from "../../userAccounts/Register/hooks/useDocumentForm";

type inputType = string | undefined;

export type File = {
  name: string;
  lastModified: number;
  size: number;
  type: string;
};

export interface IAddRider {
  userName: inputType;
  vehicleOwned: inputType;
  emailId: inputType;
  role: inputType;
  phoneNumber: inputType;
  adminUserId: inputType;
  bankName: inputType;
  accNumber: inputType;
  ifscCode: inputType;
  hubId: any;
  hubName: inputType;
  riderStatus: inputType;
  proof: File | undefined | string;
  img: File | undefined | string;
}

function useAddRider(enableEditRider: boolean) {
  const { handleaddnewPayment } = usePayment();
  const { fetchRider, selectedRider } = useRiders();
  const { signupInFirebase } = useDocumentForm();
  const { LoginHubid, adminUserId, hubLocation } = useStorageValues();

  const initialAddRider: IAddRider = {
    userName: undefined,
    vehicleOwned: undefined,
    emailId: undefined,
    role: "RIDER",
    phoneNumber: undefined,
    adminUserId: `${adminUserId}`,
    bankName: undefined,
    accNumber: undefined,
    ifscCode: undefined,
    hubId: LoginHubid || "",
    hubName: `${hubLocation}` || undefined,
    riderStatus: "Offline",
    proof: undefined,
    img: undefined,
  };

  const initialEditRider = selectedRider &&
    enableEditRider && {
      userName: selectedRider.userName,
      vehicleOwned: selectedRider.vehicleOwned,
      emailId: selectedRider.emailId,
      phoneNumber: selectedRider.phoneNumber?.slice(
        selectedRider.phoneNumber.length - 10
      ),
      adminUserId: `${adminUserId}`,
      bankName: selectedRider.bankName,
      accNumber: selectedRider.accNumber,
      ifscCode: selectedRider.ifscCode,
      userId: selectedRider.userId,
    };

  const initialRiderDetails = enableEditRider
    ? initialEditRider
    : initialAddRider;

  const countryCode1 = selectedRider?.phoneNumber.slice(
    0,
    selectedRider.phoneNumber?.length - 10
  );

  const selectedCountry = Countries.find(
    (x: any) => x.dialCode === countryCode1
  );

  const initialCountry = enableEditRider ? selectedCountry?.name : undefined;

  const [riderDetails, setRiderDetails] = useState<IAddRider | any>(
    initialRiderDetails
  );
  const [errors, setErrors] = React.useState<string | undefined>(undefined);
  const [country, setCountry] = React.useState<string | undefined>(
    initialCountry
  );
  const [successMsg, setSuccessMsg] = React.useState("");

  const handleOnChange = (e: any) => {
    const name = e.target.name;
    if (name === "proof" || name === "img") {
      const value = e.target.files[0];
      setRiderDetails({ ...riderDetails, [name]: value });
    } else {
      const value = e.target.value;
      setRiderDetails({ ...riderDetails, [name]: value });
    }
  };

  const handleOnClick = (e: onClick | any) => {
    e.preventDefault();
    const value = e.target.value;
    setRiderDetails({ ...riderDetails, vehicleOwned: value });
  };

  const onFocusEvent = () => {
    setErrors("");
  };

  const handleCountrySelect = (e: any) => {
    e.preventDefault();
    setCountry(e.target.value);
  };

  const region = Countries.find((item: any, index) => item.name === country);

  const countryCode = region?.dialCode;

  React.useEffect(() => {
    if (errors === "") {
      return;
    }
    const timer = setTimeout(() => {
      setErrors("");
    }, 5000);
    return () => clearTimeout(timer);
  }, [errors]);

  const handleFormvalidate = () => {
    let fields = riderDetails;
    let errors = "";
    let formIsValid = true;

    const isValidFirstName = validateName(fields.userName, "rider name");
    const isValidEmailId = validateEmailId(fields.emailId);
    const isValidMobileNumber = validateMobileNumber(fields.phoneNumber);

    Object.entries(fields).map(([key, value]) => {
      if (formIsValid && !value) {
        formIsValid = false;
        errors = `Please enter valid ${key}`;
      }
      return value;
    });

    if (formIsValid && !isValidFirstName.formIsValid) {
      errors = isValidFirstName.error;
      formIsValid = false;
    }
    if (formIsValid && !isValidEmailId.formIsValid) {
      errors = isValidEmailId.error;
      formIsValid = false;
    }
    if (formIsValid && !isValidMobileNumber.formIsValid) {
      errors = isValidMobileNumber.error;
      formIsValid = false;
    }
    if (formIsValid && !country) {
      formIsValid = false;
      errors = "Please select your country";
    }

    // eslint-disable-next-line array-callback-return

    setErrors(errors);
    return formIsValid;
  };

  const handleFormSubmit = async (e: onClick) => {
    e.preventDefault();
    if (handleFormvalidate()) {
      setSuccessMsg("Processing...");
      let formData: any = new FormData();

      // Appending Data
      Object.entries(riderDetails).map(([key, value]) => {
        if (key === "phoneNumber") {
          formData.append(key, `${countryCode}${value}`);
        } else {
          formData.append(key, value);
        }
        return value;
      });

      if (enableEditRider) {
        await axios
          .put(`${user_baseURL}/users/updateriderbyid`, formData, {
            headers: {
              "Content-Type": "multipart/form-data,application/json",
            },
          })
          .then((response: any) => {
            setSuccessMsg("Rider Added Successfully...");
            fetchRider();
          })
          .catch((error: any) => {
            setErrors("Error while adding riders, Please try again");
          });
      } else {
        await axios
          .post(`${user_baseURL}/users/rider`, formData, {
            headers: {
              "Content-Type": "multipart/form-data,application/json",
            },
          })
          .then((response: any) => {
            setSuccessMsg("Rider Added Successfully...");
            fetchRider();
            const loggedInRider = {
              name: response.data.user.userName,
              email: response.data.user.emailId,
              password: "Meme@123",
              hubid: response.data.user.hubId,
              role: response.data.user.role,
            };
            console.log(loggedInRider, "kkkkkkkkkkkkkkkkkk");
            signupInFirebase(loggedInRider);
            handleaddnewPayment(response);
          })
          .catch((error: any) =>
            setErrors("Error while adding riders, Please try again")
          );
      }
    }
  };

  return {
    errors,
    country,
    successMsg,
    riderDetails,
    onFocusEvent,
    handleOnClick,
    handleOnChange,
    handleFormSubmit,
    handleCountrySelect,
  };
}

export default useAddRider;
