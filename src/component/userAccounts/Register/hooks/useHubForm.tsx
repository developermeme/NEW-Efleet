import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onChange, onClick } from "../../../../helper/Properties";
import {
  RegisterPage,
  ValidationContext,
} from "../../../../context/ValidationContext";
import { IRootState } from "../../../../redux/reducer/CombineReducer";
import { IHubRegister } from "../../../../redux/slice/user-slice/Types";
import { setHubData } from "../../../../redux/slice/user-slice/Slice";

function useHubForm() {
  const { handleRegisterRoute } = useContext(ValidationContext) as any;

  // Initial Value From Redux
  const { userData } = useSelector((state: IRootState) => state);
  const hubDetails = userData && userData.hubCredentials;
  const dispatch = useDispatch();

  const initialHubCredentials: IHubRegister = {
    city: undefined,
    hubLocation: undefined,
    hubAddress1: undefined,
    hubAddress2: undefined,
    hubzipCode: undefined,
  };

  const [hubCredentials, setHubCredentials] = useState<IHubRegister>(
    hubDetails || initialHubCredentials
  );
  const [errors, setErrors] = React.useState<string | undefined>(undefined);

  const handleOnChange = (e: onChange) => {
    const name = e.target.name;
    const value = e.target.value;
    setHubCredentials({ ...hubCredentials, [name]: value });
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

  const handleHubFormvalidate = () => {
    let fields = hubCredentials;
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

  const handleHubFormNext = (e: onClick) => {
    e.preventDefault();
    if (handleHubFormvalidate()) {
      handleRegisterRoute(RegisterPage.DOCUMENTFORM);
      dispatch(setHubData(hubCredentials));
    }
  };

  const handleHubFormBack = (e: onClick) => {
    e.preventDefault();
    handleRegisterRoute(RegisterPage.USERFORM);
  };

  return {
    hubCredentials,
    handleOnChange,
    onFocusEvent,
    errors,
    handleHubFormNext,
    handleHubFormBack,
  };
}

export default useHubForm;
