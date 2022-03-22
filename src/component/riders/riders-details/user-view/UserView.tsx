import { useState } from "react";
import axios from "axios";
import useRiders from "../../useRiders";
import User from "../../../../asset/Images/user.svg";
import { user_baseURL } from "../../../../util/configFile";
import {
  DeleteIcon,
  EditIcon,
  LocationIcon,
} from "../../../../asset/Icons/Icons";
import { TextButton } from "../../../../ui-kit/TextButton/TextButton.view";
import "./UserView.scss";
import Modal from "../../../../ui-kit/modal/modal";
import { onClick } from "../../../../helper/Properties";
import usePayment from "../../../payments/paymentDetails/usePayment";
import { AddRider } from "../../add-rider/Index";

export const UserView = () => {
  const { selectedRider, fetchRider, loader } = useRiders();
  const { handleDeletePayment, payments } = usePayment();
  console.log("pending", payments);

  const selectedUserData = {
    id: selectedRider.userId,
    email: selectedRider.emailId,
    phone: selectedRider.phoneNumber,
    vehicleOwned: selectedRider.vehicleOwned,
    bankName: selectedRider.bankName,
    ifscCode: selectedRider.ifscCode,
    accNumber: selectedRider.accNumber,
  };

  const [modalShow, setModalShow] = useState(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const toggleModal = () => {
    setModalShow(!modalShow);
  };

  const handleClose = () => {
    setOpenModal(!openModal);
  };
  const handleOnClick = (e: onClick) => {
    e.preventDefault();
    setOpenModal(!openModal);
  };

  const handleDelete = async () => {
    const selectedRiderPayment = payments?.find(
      (rider: any) => rider.riderId === selectedRider.userId
    );

    if (!selectedRiderPayment?.pending) {
      let userId = selectedRider.userId;
      let confirmation = window.confirm("Are you want to delete the rider ?");

      if (confirmation === true) {
        await axios
          .delete(`${user_baseURL}/users/deleterider/${userId}`)
          .then((response: any) => {
            fetchRider();
            handleDeletePayment(userId);
          })
          .catch((error: any) => {
            console.log(error);
          });
      }
    } else {
      window.alert(
        `Rider Payment ${selectedRiderPayment.pending} is pending.. So, Can't delete the Rider`
      );
    }
  };

  if (!selectedRider) {
    return <div>No Details Available</div>;
  }

  if (loader) {
    return loader;
  }

  return (
    <div className="rider-detail-inner">
      <div className="avathar-wrapper">
        <img
          src={selectedRider.img_url || User}
          alt="rider img"
          className="rider-avathar"
        />
        <div className="icon-wrapper">
          <TextButton
            className="edit-button"
            items={<EditIcon />}
            isprimary={true}
            onClick={toggleModal}
          />
          <TextButton
            className="delete-button"
            items={<DeleteIcon />}
            isprimary={true}
            onClick={handleDelete}
          />
        </div>
      </div>

      <div className="details-wrapper">
        <h3 className="rider-name u-h3">{selectedRider.userName}</h3>
        <h4 className="rider-location u-h4">
          <LocationIcon /> {selectedRider.hubName}
        </h4>
        {Object.entries(selectedUserData).map(([key, value]) => {
          return (
            value && (
              <div className="u-h4 rider-props" key={key}>
                <span className="key"> {key}:&nbsp;</span>
                {value}
              </div>
            )
          );
        })}
      </div>
      <div className="details-wrapper">
        <div className="u-h4 rider-props">
          <span className="key">Proof : &nbsp;</span>
          <img
            src={selectedRider.proof_url}
            alt="proof_img"
            className="proof_img"
            onClick={(e: any) => {
              handleOnClick(e);
            }}
          />
        </div>
      </div>
      {/* <UserModal show={modalShow} onHide={toggleModal} /> */}

      <Modal
        onClose={toggleModal}
        visibilty={modalShow}
        classname="edit-rider-modal"
      >
        <AddRider isEditable={true} />
      </Modal>

      <Modal onClose={handleClose} visibilty={openModal}>
        <div>
          <img
            src={selectedRider.proof_url}
            alt="proof_img"
            className="modal_img"
          />
        </div>
      </Modal>
    </div>
  );
};
