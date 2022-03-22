import React from "react";
import { Form, Col, Row } from "react-bootstrap";
import { countries } from "../../../helper/Script";
import { getToast } from "../vehicleScript";
import { TextButton } from "../../../ui-kit/TextButton/TextButton.view";
import useAddRider from "./useAddRider";
import { registerInput } from "../../../context/ValidationContext";
import useRiders from "../useRiders";

interface IProps {
  isEditable?: boolean;
}

function AddRiderForm(props: IProps) {
  const { isEditable } = props;

  const enableEditRider = isEditable ? isEditable : false;

  const { selectedRider } = useRiders();

  const {
    errors,
    country,
    successMsg,
    riderDetails,
    onFocusEvent,
    handleOnClick,
    handleOnChange,
    handleFormSubmit,
    handleCountrySelect,
  } = useAddRider(enableEditRider);

  const toast = getToast(successMsg, errors as string);

  const addRiderInputs: registerInput[] = [
    {
      id: 1,
      name: "userName",
      type: "text",
      text: "Rider Name",
      value: riderDetails.userName,
    },
    {
      id: 2,
      name: "emailId",
      type: "email",
      text: "Email Id",
      value: riderDetails.emailId,
    },
    {
      id: 3,
      name: "phoneNumber",
      type: "number",
      text: "Mobile Number",
      value: riderDetails.phoneNumber,
    },
    {
      id: 4,
      name: "bankName",
      type: "text",
      text: "Bank Name",
      value: riderDetails.bankName,
    },
    {
      id: 5,
      name: "accNumber",
      type: "text",
      text: "Account Number",
      value: riderDetails.accNumber,
    },
    {
      id: 6,
      name: "ifscCode",
      type: "text",
      text: "IFSC Code",
      value: riderDetails.ifscCode,
    },
    {
      id: 7,
      name: "vehicleOwned",
      type: "button",
      text: "Vechicle Owned by",
      value: riderDetails.vehicleOwned,
    },
    {
      id: 8,
      name: "proof",
      type: "file",
      text: "Rider Proof",
      value: riderDetails.proof,
    },
    {
      id: 9,
      name: "img",
      type: "file",
      text: "Rider Image",
      value: riderDetails.img,
    },
  ];

  const getInputText = () => {
    return addRiderInputs.map((item: registerInput, index: number) => {
      return (
        <Form.Group as={Row} className="mb-3 u-h4" key={item.id}>
          {item.type === "file" && !item.value && enableEditRider && (
            <Row sm="8">
              <img
                src={
                  item.name === "img"
                    ? selectedRider.img_url
                    : selectedRider.proof_url
                }
                alt="profile"
                className="rider_profile_img"
              />
            </Row>
          )}

          <Form.Label column sm="4" className="form-label">
            {item.text}
          </Form.Label>
          {item.name === "vehicleOwned" ? (
            <>
              <Col sm="4">
                <Form.Control
                  type={item.type}
                  name={item.name}
                  value="Company"
                  onClick={handleOnClick}
                  className={
                    item.value === "Company"
                      ? "input-button active-input"
                      : "input-button"
                  }
                />
              </Col>
              <Col sm="4">
                <Form.Control
                  name={item.name}
                  type={item.type}
                  value="Own"
                  onClick={handleOnClick}
                  className={item.value === "Own" ? "active-input" : ""}
                />
              </Col>
            </>
          ) : item.type === "file" ? (
            <>
              <Col sm="8">
                <Form.Control
                  type={item.type}
                  id={item.name}
                  name={item.name}
                  accept=".jpg,.png"
                  onChange={handleOnChange}
                  onFocus={onFocusEvent}
                />
              </Col>
            </>
          ) : (
            <Col sm="8">
              <Form.Control
                type={item.type}
                id={item.name}
                name={item.name}
                value={item.value}
                onChange={handleOnChange}
                onFocus={onFocusEvent}
              />
            </Col>
          )}
        </Form.Group>
      );
    });
  };

  const Dropdown = (
    <Form.Group as={Row} className="mb-3 u-h4">
      <Form.Label column sm="4" className="form-label">
        Country
      </Form.Label>
      <Col sm="8">
        <select
          id="country-select"
          className="u-h4 form-control"
          defaultValue="DEFAULT"
          value={country}
          onChange={handleCountrySelect}
        >
          <option value="DEFAULT" disabled={true}>
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
      </Col>
    </Form.Group>
  );

  return (
    <div className="add-rider-form">
      <Form>
        {toast.message && (
          <p className={`alert ${toast.classname} form__alert u-h6 mb-5`}>
            {toast.message}
          </p>
        )}
        {getInputText()} {Dropdown}
        <TextButton
          items="Submit"
          onClick={handleFormSubmit as any}
          className="btn col"
        />
      </Form>
    </div>
  );
}

export default AddRiderForm;
