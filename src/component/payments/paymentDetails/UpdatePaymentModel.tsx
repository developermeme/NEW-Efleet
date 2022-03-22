import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { onChange } from "../../../helper/Properties";
import usePayment from "./usePayment";

interface IProps {
  show: boolean;
  onHide: () => void;
}
export default function UpdatePaymentModel(props: IProps) {
  const [amount, setAmount] = useState<number | null>(null);

  const { loader, error, updateRiderPayment } = usePayment();

  const handleOnchange = (e: onChange) => {
    setAmount(+e.target.value);
  };

  const handleOnClick = () => {
    if (amount) {
      updateRiderPayment(amount.toString(), props.onHide);
    }
  };

  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton style={{ textAlign: "center" }}>
        <Modal.Title id="contained-modal-title-vcenter">add Salary</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && error}
        {loader && <div className="alert alert--success">Loading...</div>}
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>enter amount</Form.Label>
            <Form.Control
              type="number"
              name="amount"
              placeholder="enter amount"
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
  );
}
