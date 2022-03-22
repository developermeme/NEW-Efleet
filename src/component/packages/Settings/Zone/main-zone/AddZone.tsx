import { Button, Form, Modal } from "react-bootstrap";
import useZone from "../useZone";

interface IProps {
  show: boolean;
  onHide: () => void;
}
export default function Addzone(props: IProps) {
  const { error, loader, handleZoneOnchange, handleAddNewZone } = useZone();

  return (
    <>
      <Modal
        {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton style={{ textAlign: "center" }}>
          <Modal.Title id="contained-modal-title-vcenter">Add Zone</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {error && error}
            {loader && <div className="alert alert--success">Loading...</div>}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Zone Name</Form.Label>
              <Form.Control
                type="text"
                name="zonename"
                placeholder="Enter Zone Name"
                onChange={handleZoneOnchange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => handleAddNewZone(props.onHide)}>
            CONFIRM
          </Button>
          <Button variant="danger" onClick={props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
