import { Form, Col, Row } from "react-bootstrap";
import { registerInput } from "../../../context/ValidationContext";
import { TextButton } from "../../../ui-kit/TextButton/TextButton.view";
import { getToast } from "../../riders/vehicleScript";
import useAddVehicleForm from "./useAddVehicleForm";

function AddVehicleForm() {
  const {
    errors,
    successMsg,
    onFocusEvent,
    handleOnSubmit,
    handleOnChange,
    vehicleCredentials,
  } = useAddVehicleForm();

  const addRiderInputs: registerInput[] = [
    {
      id: 1,
      name: "regNumber",
      type: "text",
      text: "Reg Number",
      value: vehicleCredentials.regNumber,
    },
    {
      id: 2,
      name: "vehicleId",
      type: "text",
      text: "Vehicle ID",
      value: vehicleCredentials.vehicleId,
    },
    {
      id: 3,
      name: "model",
      type: "text",
      text: "Model",
      value: vehicleCredentials.model,
    },

    {
      id: 4,
      name: "chassisNumber",
      type: "text",
      text: "Chassis Number",
      value: vehicleCredentials.chassisNumber,
    },
    {
      id: 5,
      name: "iotdeviceNumber",
      type: "text",
      text: "Iot Device Number",
      value: vehicleCredentials.iotdeviceNumber,
    },

    {
      id: 6,
      name: "vehicleType",
      type: "text",
      text: "Vehicle Type",
      value: vehicleCredentials.vehicleType,
    },
  ];

  const toast = getToast(successMsg, errors as string);

  const getInputText = () => {
    return addRiderInputs.map((item: registerInput) => {
      return (
        <Form.Group as={Row} className="mb-3 u-h4" key={item.id}>
          <Form.Label column sm="4" className="form-label">
            {item.text}
          </Form.Label>
          {
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
          }
        </Form.Group>
      );
    });
  };

  return (
    <div className="add-vehicle-form">
      <Form>
        {toast.message && (
          <p className={`alert ${toast.classname} form__alert u-h6 mb-5`}>
            {toast.message}
          </p>
        )}
        {getInputText()}
        <TextButton
          items="Submit"
          className="btn col"
          onClick={handleOnSubmit as any}
        />
      </Form>
    </div>
  );
}

export default AddVehicleForm;
