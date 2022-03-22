import React from "react";
import useDocumentForm from "../hooks/useDocumentForm";
import { registerInput } from "../../../../context/ValidationContext";
import { getToast } from "../../Login/Script";

export const DocumentForm = () => {
  const {
    docsCredentials,
    errors,
    successMsg,
    onFocusEvent,
    handleDocsFormChange,
    handleDocsFormBack,
    handleRegisterSubmit,
  } = useDocumentForm();

  const toast = getToast(successMsg, errors as string);

  const Hubinputs: registerInput[] = [
    {
      id: 1,
      name: "idProof",
      type: "file",
      text: "Id Proof",
      value: docsCredentials.idProof,
    },
    {
      id: 2,
      name: "hubProof",
      type: "file",
      text: "Hub Proof",
      value: docsCredentials.hubProof,
    },
    {
      id: 3,
      name: "bussinessCertificate",
      type: "file",
      text: "Bussiness Certificate",
      value: docsCredentials.bussinessCertificate,
    },
  ];

  const getInputText = () => {
    return Hubinputs.map((item: registerInput, index: number) => {
      return (
        <div className="file-input" key={item.id}>
          <input
            key={item.id}
            type={item.type}
            accept="image/*,.pdf,.doc,.docx,.txt"
            id={item.name}
            className="user-form-input u-h4 file-upload-field"
            name={item.name}
            placeholder={item.text}
            autoFocus={false}
            onChange={handleDocsFormChange}
            onFocus={onFocusEvent}
          />
          <span className="button u-h6">{item.text}</span>
          <span className="label" data-js-label>
            {item.value ? item.value?.name : " No file chosen..."}
          </span>
        </div>
      );
    });
  };

  return (
    <form id="user-doc-form">
      <h4 className="u-h3 title">Hub Register</h4>
      {toast.message && (
        <p className={`alert ${toast.classname} form__alert u-h6`}>
          {toast.message}
        </p>
      )}
      {getInputText()}
      <div className="btn-box">
        <button type="button" id="Back 1" onClick={handleDocsFormBack}>
          Back
        </button>
        <button type="button" id="Next 2" onClick={handleRegisterSubmit}>
          Submit
        </button>
      </div>
    </form>
  );
};
