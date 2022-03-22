import React from "react";
import { Link } from "react-router-dom";
import { registerInput } from "../../../../context/ValidationContext";
import useUserForm from "../hooks/useUserForm";

export const UserForm = () => {
  const {
    UserCredentials,
    countries,
    errors,
    handleOnChange,
    onFocusEvent,
    handleUserFormSubmit,
    handleCountrySelect,
  } = useUserForm();

  const Userinputs: registerInput[] = [
    {
      id: 1,
      name: "userName",
      type: "text",
      text: "Person Name",
      value: UserCredentials.userName,
    },
    {
      id: 2,
      name: "emailId",
      type: "email",
      text: "EmailId",
      value: UserCredentials.emailId,
    },
    // {
    //   id: 3,
    //   name: "role",
    //   type: "text",
    //   text: "Role",
    //   value: UserCredentials.role,
    // },
    {
      id: 4,
      name: "hubName",
      type: "text",
      text: "Hub Name",
      value: UserCredentials.hubName,
    },
    {
      id: 5,
      name: "phoneNumber",
      type: "number",
      text: "Phone Number",
      value: UserCredentials.phoneNumber,
    },
  ];

  const getInputText = () => {
    return Userinputs.map((item: registerInput, index: number) => {
      // const finalArrayElement = Userinputs.length - 1;
      // const classElement = finalArrayElement === index && "lg-input";

      return (
        <React.Fragment key={item.id}>
          <input
            type={item.type}
            id={item.name}
            className={`user-form-input u-h4`}
            name={item.name}
            value={item.value}
            aria-label={item.text}
            placeholder={item.text}
            autoFocus={false}
            onChange={handleOnChange}
            onFocus={onFocusEvent}
          />
        </React.Fragment>
      );
    });
  };

  const Dropdown = (
    <select
      id="country-select"
      value={UserCredentials.country}
      onChange={handleCountrySelect}
      className="user-form-select lg-input u-h4"
    >
      <option value="" selected={true} disabled={true}>
        Country
      </option>
      {countries?.map((item: string) => {
        return (
          <option value={item} key={item}>
            {item}
          </option>
        );
      })}
    </select>
  );

  return (
    <form id="user-reg-form">
      <h4 className="u-h3 title">Hub Register</h4>

      {errors && (
        <div className=" form__alert alert alert--error u-h6">{errors}</div>
      )}

      {getInputText()}
      {Dropdown}

      <div className="btn-box">
        <button type="button" id="Next 1" onClick={handleUserFormSubmit}>
          Next
        </button>
      </div>
      <div className="form__footer u-h4">
        <span>Welcome back? &nbsp;</span>
        <Link to="/">Back to login</Link>
      </div>
    </form>
  );
};
