import React from "react";
import { registerInput } from "../../../../context/ValidationContext";
import useHubForm from "../hooks/useHubForm";

export const HubForm = () => {
  const {
    hubCredentials,
    handleOnChange,
    onFocusEvent,
    errors,
    handleHubFormNext,
    handleHubFormBack,
  } = useHubForm();

  const Hubinputs: registerInput[] = [
    {
      id: 1,
      name: "hubAddress1",
      type: "text",
      text: "Address",
      value: hubCredentials.hubAddress1,
    },
    {
      id: 2,
      name: "hubAddress2",
      type: "text",
      text: "Address2",
      value: hubCredentials.hubAddress2,
    },
    {
      id: 3,
      name: "city",
      type: "text",
      text: "City",
      value: hubCredentials.city,
    },
    {
      id: 4,
      name: "hubLocation",
      type: "text",
      text: "Location",
      value: hubCredentials.hubLocation,
    },

    {
      id: 5,
      name: "hubzipCode",
      type: "number",
      text: "Zipcode",
      value: hubCredentials.hubzipCode,
    },
  ];

  const getInputText = () => {
    return Hubinputs.map((item: registerInput, index: number) => {
      return (
        <input
          key={item.id}
          type={item.type}
          id={item.name}
          className="user-form-input lg-input u-h4"
          name={item.name}
          aria-label={item.text}
          placeholder={item.text}
          value={item.value}
          autoFocus={false}
          onChange={handleOnChange}
          onFocus={onFocusEvent}
        />
      );
    });
  };

  return (
    <form id="user-hub-form">
      <h4 className="u-h3 title">Hub Register</h4>
      {errors && (
        <div className=" form__alert alert alert--error u-h6">{errors}</div>
      )}
      {getInputText()}
      <div className="btn-box">
        <button type="button" id="Back 1" onClick={handleHubFormBack}>
          Back
        </button>
        <button type="button" id="Next 2" onClick={handleHubFormNext}>
          Next
        </button>
      </div>
    </form>
  );
};
