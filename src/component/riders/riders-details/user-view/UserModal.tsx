import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import useRiders from "../../useRiders";
import { user_baseURL } from "../../../../util/configFile";
import axios from "axios";
import { onChange } from "../../../../helper/Properties";

interface IProps {
  show: boolean;
  onHide: () => void;
}

function UserModal(props: IProps) {
  const { selectedRider, fetchRider } = useRiders();

  const [riderDetail, setRiderDetail] = useState({
    userName: selectedRider.userName,
    hubName: selectedRider.hubName,
    emailId: selectedRider.emailId,
    phoneNumber: selectedRider.phoneNumber,
    bankName: selectedRider.bankName,
    ifscCode: selectedRider.ifscCode,
    accNumber: selectedRider.accNumber,
    proof: undefined,
    img: undefined,
  });

  const handleOnchange = (e: onChange | any) => {
    const name = e.target.name;
    let value;
    if (name === "proof" || name === "img") {
      value = e.target.files[0];
    } else {
      value = e.target.value;
    }
    setRiderDetail({ ...riderDetail, [name]: value });
  };

  const handleEdit = async () => {
    let editRider = { ...riderDetail };
    console.log("editRider", editRider);
    Object.entries(editRider).map(async ([key, value]) => {
      if (!value) {
        alert(`Please enter valid ${key}`);
      } else {
        const fields = {
          ...riderDetail,
          rider_image: selectedRider.img_url,
          userId: selectedRider.userId,
        };
        await axios
          .put(`${user_baseURL}/users/updateriderbyid`, fields)
          .then((response: any) => {
            console.log("resp", response);
            fetchRider();
          })
          .catch((error: any) => {
            alert("Something Went Wrong");
          });
      }
    });
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton style={{ textAlign: "center" }}>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Rider Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Rider Name</Form.Label>
            <Form.Control
              type="text"
              name="userName"
              placeholder="Enter rider name"
              value={riderDetail.userName}
              onChange={handleOnchange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Rider Place</Form.Label>
            <Form.Control
              type="text"
              name="hubName"
              placeholder="Enter rider place"
              value={riderDetail.hubName}
              onChange={handleOnchange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="emailId"
              placeholder="Enter rider mail id"
              value={riderDetail.emailId}
              onChange={handleOnchange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="string"
              name="phoneNumber"
              placeholder="Enter rider mobile number"
              value={riderDetail.phoneNumber}
              onChange={handleOnchange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Bank Name</Form.Label>
            <Form.Control
              type="string"
              name="bankName"
              placeholder="Enter rider bank name"
              value={riderDetail.bankName}
              onChange={handleOnchange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>IFSC Code</Form.Label>
            <Form.Control
              type="string"
              name="ifscCode"
              placeholder="Enter rider IFSC code"
              value={riderDetail.ifscCode}
              onChange={handleOnchange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Account Number</Form.Label>
            <Form.Control
              type="string"
              name="accNumber"
              placeholder="Enter rider Account Number"
              value={riderDetail.accNumber}
              onChange={handleOnchange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Rider Proof</Form.Label>
            {!riderDetail.proof && (
              <img
                src={selectedRider.proof_url}
                alt="proof_img"
                className="rider_proof_img"
              />
            )}

            <Form.Control
              type="file"
              name="proof"
              placeholder="Change Rider Proof"
              accept=".jpg,.png"
              onChange={handleOnchange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Rider Image</Form.Label>
            {!riderDetail.img && (
              <img
                src={selectedRider.img_url}
                alt="profile"
                className="rider_profile_img"
              />
            )}

            <Form.Control
              type="file"
              name="img"
              placeholder="Change Rider Image"
              accept=".jpg,.png"
              onChange={handleOnchange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleEdit}>Update</Button>
        <Button variant="danger" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UserModal;
