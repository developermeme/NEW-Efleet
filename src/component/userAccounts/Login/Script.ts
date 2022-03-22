export const ERROR = Object.freeze({
  EMPTY_NAME: "Please enter your",
  INVALID_NAME: "Please enter alphabet characters only.",
  EMPTY_EMAILID: "Please enter your email.",
  INVALID_EMAILID: "Please enter valid email.",
  EMPTY_MOBILENO: "Please enter your mobile no.",
  INVALID_MOBILENO: "Please enter valid mobile no. eg: XXX XXX XXXX",
  EMPTY_PASSWORD: "Please enter your password.",
  INVALID_PASSWORD:
    "Please enter secure and strong password. eg: abc@1442AgjdjK ",
});

export const RegisterERROR = Object.freeze({
  EMPTY_HUBNAME: "Please enter your Hubname.",
  EMPTY_LOCATION: "Please enter your Location.",
  EMPTY_ADDRESS: "Please enter your Address.",
  EMPTY_ZIPCODE: "Please enter your ZipCode.",
  EMPTY_ROLE: "Please enter your Role.",

  EMPTY_CONTACT_PERSON_NAME: "Please enter your name.",
  EMPTY_CITY_NAME: "Please enter your city name. eg: chennai,Erode",
  EMPTY_ADDRESS_2: "Please enter your alternative address.",
  EMPTY_HUB_PROOF: "Please attach your hub proof.",
  EMPTY_BUSSINESS_CERTIFICATE: "Please attach your bussiness certificate",
  EMPTY_ID_PROOF: "Please attach your any ID proof. eg:aadhaar,voterID ",
});
const pattern = new RegExp(
  /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
);

export const validateEmailId = (emailID: string | undefined) => {
  let formIsValid: boolean = true;
  let error: string = "";

  if (!emailID) {
    formIsValid = false;
    error = ERROR.EMPTY_EMAILID;
  }

  if (emailID) {
    if (!pattern.test(emailID)) {
      formIsValid = false;
      error = ERROR.INVALID_EMAILID;
    }
  }
  return { formIsValid, error };
};

export const validateName = (name: string | undefined, key: string) => {
  let formIsValid: boolean = true;
  let error: string = "";

  const Name =
    key === "name"
      ? "name"
      : key === "fname"
      ? "first name"
      : key === "lname"
      ? "last name"
      : key;

  if (!name) {
    formIsValid = false;
    error = ` ${ERROR.EMPTY_NAME} ${Name}.`;
  }
  if (typeof name !== "undefined") {
    if (!name.match(/^[a-zA-Z ]*$/)) {
      formIsValid = false;
      error = ERROR.INVALID_NAME;
    }
  }
  return { formIsValid, error };
};

export const validateMobileNumber = (mobileNumber: string | undefined) => {
  let formIsValid: boolean = true;
  let error: string = "";

  if (!mobileNumber) {
    formIsValid = false;
    error = ERROR.EMPTY_MOBILENO;
  }

  if (mobileNumber) {
    if (!mobileNumber.match(/^[0-9]{10}$/)) {
      formIsValid = false;
      error = ERROR.INVALID_MOBILENO;
    }
  }
  return { formIsValid, error };
};

export const validatePassword = (password: string) => {
  let formIsValid: boolean = true;
  let error: string = "";

  if (!password) {
    formIsValid = false;
    error = ERROR.EMPTY_PASSWORD;
  }

  // if (password !== "") {
  //   if (password.length < 8) {
  //     formIsValid = false;
  //     error = "Your Password should contain 8 characters";
  //   }

  //   else if (
  //     !password.match(
  //       /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/
  //     )
  //   ) {
  //     formIsValid = false;
  //     error = ERROR.INVALID_PASSWORD;
  //   }
  // }

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
