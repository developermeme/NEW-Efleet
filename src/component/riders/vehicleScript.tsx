export const vehicleERROR = Object.freeze({
  EMPTY_REGNUMBER: "Please enter your RegNumber",
  INVALID_REGNUMBER: "Please enter your Correct RegNumber",

  EMPTY_VEHICLEID: "Please enter your VehicleID",
  INVALID_VEHICLEID: "Please enter your Correct VehicleID",

  EMPTY_MODEL: "Please enter your Model",
  INVALID_MODEL: "Please enter your Correct Model",

  EMPTY_CHASSISNUMBER: "Please enter your ChassisNumber",
  INVALID_CHASSISNUMBER: "Please enter your Correct ChassisNumber",

  EMPTY_IOTDEVICENUMBER: "Please enter your IOTdeviceNumber",
  INVALID_IOTDEVICENUMBER: "Please enter your Correct IOTdeviceNumber",

  EMPTY_HUBNAME: "Please enter your Hubname",
  INVALID_HUBNAME: "Please enter your Correct Hubname",

  EMPTY_VEHICLETYPE: "Please enter your VehicleType",
  INVALID_VEHICLETYPE: "Please enter your Correct VehicleType",
});

export const validateRegNumber = (regNumber: string) => {
  let formIsValid: boolean = true;
  let error: string = "";

  if (regNumber === "") {
    formIsValid = false;
    error = vehicleERROR.EMPTY_REGNUMBER;
  }

  return { formIsValid, error };
};
export const validateVehicleID = (vehicleId: string) => {
  let formIsValid: boolean = true;
  let error: string = "";

  if (vehicleId === "") {
    formIsValid = false;
    error = vehicleERROR.EMPTY_VEHICLEID;
  }
  return { formIsValid, error };
};
export const validateModel = (model: string) => {
  let formIsValid: boolean = true;
  let error: string = "";

  if (model === "") {
    formIsValid = false;
    error = vehicleERROR.INVALID_MODEL;
  }
  return { formIsValid, error };
};
export const validateChassisNumber = (chassisnumber: string) => {
  let formIsValid: boolean = true;
  let error: string = "";

  if (chassisnumber === "") {
    formIsValid = false;
    error = vehicleERROR.INVALID_CHASSISNUMBER;
  }
  return { formIsValid, error };
};
export const validateIotNumber = (iotNumber: string) => {
  let formIsValid: boolean = true;
  let error: string = "";

  if (!iotNumber) {
    formIsValid = false;
    error = vehicleERROR.EMPTY_IOTDEVICENUMBER;
  }

  if (iotNumber === "") {
    formIsValid = false;
    error = vehicleERROR.INVALID_IOTDEVICENUMBER;
  }
  return { formIsValid, error };
};

export const validateHubname = (hubName: string) => {
  let formIsValid: boolean = true;
  let error: string = "";

  if (!hubName) {
    formIsValid = false;
    error = vehicleERROR.EMPTY_HUBNAME;
  }

  if (hubName === "") {
    formIsValid = false;
    error = vehicleERROR.INVALID_HUBNAME;
  }
  return { formIsValid, error };
};
export const validateVehicletype = (vehicleType: string) => {
  let formIsValid: boolean = true;
  let error: string = "";

  if (!vehicleType) {
    formIsValid = false;
    error = vehicleERROR.EMPTY_VEHICLEID;
  }

  if (vehicleType === "") {
    formIsValid = false;
    error = vehicleERROR.INVALID_VEHICLEID;
  }
  return { formIsValid, error };
};
export const getToast = (successMsg?: string, apiError?: string) => {
  let classname;
  let message;
  if (successMsg) {
    classname = "alert--success";
    message = successMsg;
  }
  if (apiError) {
    classname = "alert--error";
    message = apiError;
  }
  return { classname, message };
};
