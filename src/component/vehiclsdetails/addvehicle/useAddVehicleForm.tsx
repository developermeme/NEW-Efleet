import axios from "axios";
import { useEffect, useState } from "react";
import { onChange, onClick } from "../../../helper/Properties";
import { user_baseURL } from "../../../util/configFile";
import useVehile from "../useVehile";
import { useStorageValues } from "../../../hooks/Index";
export type IVehicleCredentials = {
  regNumber: string;
  vehicleId: string;
  model: string;
  chassisNumber: string;
  iotdeviceNumber: string;
  hubName: string;
  vehicleType: string;
};

function useAddVehicleForm() {
  const { LoginHubid } = useStorageValues();

  const vehicleformvalidate: IVehicleCredentials = {
    regNumber: "",
    vehicleId: "",
    model: "",
    chassisNumber: "",
    iotdeviceNumber: "",
    hubName: LoginHubid || "",
    vehicleType: "",
  };
  const [vehicleCredentials, setVehicleCredentials] =
    useState<IVehicleCredentials>(vehicleformvalidate);
  const [errors, setErrors] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState("");

  const { fetchVehicleList } = useVehile();

  const handleOnChange = (e: onChange) => {
    const name = e.target.name;
    const value = e.target.value;
    setVehicleCredentials({ ...vehicleCredentials, [name]: value });
  };

  const onFocusEvent = () => {
    setErrors("");
  };

  useEffect(() => {
    if (errors === "") {
      return;
    }
    const timer = setTimeout(() => {
      setErrors("");
    }, 3000);
    return () => clearTimeout(timer);
  }, [errors]);

  const handleValidate = () => {
    let fields = vehicleCredentials;
    let formIsValid = true;
    let error = "";

    Object.entries(fields).map(([key, value]) => {
      if (formIsValid && !value) {
        formIsValid = false;
        error = `Please enter valid ${key}`;
      }
      return value;
    });
    setErrors(error);
    return formIsValid;
  };

  const handleOnSubmit = async (e: onClick) => {
    e.preventDefault();

    if (handleValidate()) {
      axios
        .post(`${user_baseURL}/vehicle/create`, vehicleCredentials)
        .then((response: any) => {
          setSuccessMsg("Sucessfully Created!");
          fetchVehicleList();
          // localStorage.setItem("hubName", userConfig.hubName);
          // history.push("/Vehicletable");
        })
        .catch((error: any) => {
          setErrors("Something Went Wrong");
        });
    }
  };

  return {
    errors,
    successMsg,
    vehicleCredentials,
    onFocusEvent,
    handleOnSubmit,
    handleOnChange,
  };
}

export default useAddVehicleForm;
