import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  RegisterPage,
  ValidationContext,
} from "../../../../context/ValidationContext";
import {
  validateEmailId,
  validateMobileNumber,
  validateName,
} from "../../Login/Script";
import { IRootState } from "../../../../redux/reducer/CombineReducer";
import { Countries } from "../../../../helper/json/Countries";
import { onChange, onClick } from "../../../../helper/Properties";
import { IuserRegister } from "../../../../redux/slice/user-slice/Types";
import {
  setCountryCode,
  setUserData,
} from "../../../../redux/slice/user-slice/Slice";

function useUserForm() {
  const { handleRegisterRoute } = useContext(ValidationContext) as any;

  // Initial Value From Redux
  const { userData } = useSelector((state: IRootState) => state);
  const userDetails = userData && userData.UserCredentials;
  const dispatch = useDispatch();
  console.log("ud", userDetails);
  const initialUserCredentials: IuserRegister = {
    userName: undefined,
    emailId: undefined,
    phoneNumber: undefined,
    country: undefined,
    role: "ADMIN",
    hubName: undefined,
  };

  const [UserCredentials, setUserCredentials] = React.useState<IuserRegister>(
    userDetails || initialUserCredentials
  );
  const [selectedCountry, setSelectedCountry] = React.useState<
    string | undefined
  >(userDetails?.country || undefined);

  const [errors, setErrors] = React.useState<string>("");

  const countries: string[] = Countries.map((item: any) => {
    return item.name;
  });

  const handleOnChange = (e: onChange) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserCredentials({ ...UserCredentials, [name]: value });
  };

  const onFocusEvent = () => {
    setErrors("");
  };

  React.useEffect(() => {
    if (errors === "") {
      return;
    }
    const timer = setTimeout(() => {
      setErrors("");
    }, 5000);
    return () => clearTimeout(timer);
  }, [errors]);

  const handleCountrySelect = (e: any) => {
    e.preventDefault();
    setSelectedCountry(e.target.value);
    setUserCredentials({
      ...UserCredentials,
      country: e.target.value,
    });
  };

  React.useEffect(() => {
    const regionList = Countries.find(
      (item: any, index) => item.name === selectedCountry
    );
    dispatch(setCountryCode(regionList?.dialCode as string));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCountry]);

  const handleUserFormvalidate = () => {
    let fields = UserCredentials;
    let errors = "";
    let formIsValid = true;

    const isValidFirstName = validateName(fields.userName, "name");
    const isValidEmailId = validateEmailId(fields.emailId);
    const isValidMobileNumber = validateMobileNumber(fields.phoneNumber);

    if (formIsValid && !isValidFirstName.formIsValid) {
      errors = isValidFirstName.error;
      formIsValid = false;
    } else if (formIsValid && !isValidEmailId.formIsValid) {
      errors = isValidEmailId.error;
      formIsValid = false;
    } else if (formIsValid && (!fields.hubName || !fields.role)) {
      formIsValid = false;
      errors = "Please enter the required fields";
    } else if (formIsValid && !isValidMobileNumber.formIsValid) {
      errors = isValidMobileNumber.error;
      formIsValid = false;
    } else if (formIsValid && selectedCountry === undefined) {
      formIsValid = false;
      errors = "Please select your country";
    } else {
      errors = "";
      formIsValid = true;
    }
    setErrors(errors);
    return formIsValid;
  };

  const handleUserFormSubmit = (e: onClick) => {
    e.preventDefault();
    if (handleUserFormvalidate()) {
      handleRegisterRoute(RegisterPage.HUBFORM);
      dispatch(setUserData(UserCredentials));
    }
  };

  return {
    UserCredentials,
    countries,
    errors,
    handleOnChange,
    onFocusEvent,
    handleUserFormSubmit,
    handleCountrySelect,
    selectedCountry,
  };
}

export default useUserForm;
