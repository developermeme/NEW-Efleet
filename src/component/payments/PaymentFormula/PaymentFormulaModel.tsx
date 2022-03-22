import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { onChange } from "../../../helper/Properties";
import usePaymentformula from "./usePaymentformula";

interface IProps {
  show: boolean;
  onHide: () => void;
}

export default function UpdateFormulaModel(props: IProps) {
  const [addupdateFormula, setAddupdateFormula] = useState([]);
  const { handleaddnewPayment, loader, error } = usePaymentformula();

  const handleOnchange = (e: onChange) => {
    const name = e.target.name;
    const value = e.target.value.toUpperCase();

    setAddupdateFormula({
      ...addupdateFormula,
      [name]: value,
    });
  };

  const handleOnClick = () => {
    handleaddnewPayment(addupdateFormula, props.onHide);
  };

  return (
    <>
      <Modal
        {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton style={{ textAlign: "center" }}>
          <Modal.Title id="contained-modal-title-vcenter">
            add Salary
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && error}
          {loader && <div className="alert alert--success">Loading...</div>}
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Cost Per KG</Form.Label>
              <Form.Control
                type="text"
                name="weight"
                placeholder="Cost Per KG"
                // value={addupdateFormula.typeofvehicle}
                onChange={handleOnchange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Cost Per KM</Form.Label>
              <Form.Control
                type="text"
                name="distance"
                placeholder="Cost Per KM"
                // value={addupdateFormula.typeofvehicle}
                onChange={handleOnchange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleOnClick}>Update</Button>
          <Button variant="danger" onClick={props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
