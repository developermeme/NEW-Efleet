import { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { onChange } from "../../../../../helper/Properties";
import { SelectedSubZoneEnum } from "../Zone";
import useZone from "../useZone";

interface IProps {
  show: boolean;
  onHide: () => void;
  zoneview: SelectedSubZoneEnum;
}
export default function Addsubdivision(props: IProps) {
  const { onHide, zoneview } = props;

  const { error, loader, selectedSubZone, handleaddnewzone } = useZone();

  const initialState = {
    divisionname: "",
    pincode: "",
  };

  const [subzoneData, setSubzoneData] = useState<any>(initialState);

  const handleSubzonechange = (e: onChange) => {
    const name = e.target.name;
    const value = e.target.value;
    setSubzoneData({
      ...subzoneData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (selectedSubZone) {
      setSubzoneData({
        divisionname: selectedSubZone?.divisionname,
        pincode: selectedSubZone?.pincode,
      });
    } else {
      setSubzoneData(initialState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSubZone]);

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
            {zoneview} Sub Division
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && error}
          {loader && <div className="alert alert--success">Loading...</div>}
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Division Name</Form.Label>
              <Form.Control
                type="text"
                name="divisionname"
                placeholder="Enter division name"
                value={subzoneData?.divisionname}
                onChange={handleSubzonechange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Pincode</Form.Label>
              <Form.Control
                type="text"
                name="pincode"
                placeholder="Enter Pincode"
                value={subzoneData?.pincode}
                onChange={handleSubzonechange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => handleaddnewzone(subzoneData, onHide, zoneview)}
          >
            CONFIRM
          </Button>
          <Button variant="danger" onClick={() => onHide()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
