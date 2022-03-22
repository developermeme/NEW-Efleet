import clsx from "clsx";
import { Button, Form, Modal, Col, Row } from "react-bootstrap";
import useParcelConfig from "./useParcelConfig";

interface IProps {
  show: boolean;
  onHide: () => void;
}
export default function AddParcelConfig(props: IProps) {
  const types = ["FUEL", "EV"];

  const {
    handleOnchange,
    fields,
    setFields,
    handleaddnewparcel,
    loader,
    error,
  } = useParcelConfig();

  // if (loader) {
  //   return <Spinner animation="grow" />;
  // }

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
            Add Parcel Config
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && error}
          {loader && <div className="alert alert--success">Loading...</div>}
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Typeofvehicle</Form.Label>
              <Row>
                {types.map((x: string) => (
                  <Col sm="6" key={x}>
                    <Form.Control
                      type="button"
                      name="type"
                      value={x}
                      className={clsx({
                        activeInput: fields.typeofvehicle === x,
                      })}
                      onClick={() =>
                        setFields({
                          ...fields,
                          typeofvehicle: x,
                        })
                      }
                    />
                  </Col>
                ))}
              </Row>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Weight</Form.Label>
              <Form.Control
                type="text"
                name="weight"
                placeholder="Enter parcel weight "
                value={fields.weight}
                onChange={handleOnchange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => handleaddnewparcel(props.onHide)}>
            Update
          </Button>
          <Button variant="danger" onClick={props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
