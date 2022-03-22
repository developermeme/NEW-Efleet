import { useState } from "react";
import { GoBackIcon } from "../../../asset/Icons/Icons";
import { onClick } from "../../../helper/Properties";
import { useStorageValues } from "../../../hooks/useLocalStorage";
import { HubPageEnum } from "../../../redux/slice/hub-slice/Types";
import Modal from "../../../ui-kit/modal/modal";
import { TextButton } from "../../../ui-kit/TextButton/TextButton.view";
import useHub from "../useHub";
import "./HubDetails.scss";

function HubDetails() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modelImage, setModelImage] = useState();
  const {
    selectedHubDetails,
    toggleHubPage,
    handleApproveHub,
    handleRejectHub,
  } = useHub();

  const { loginRole } = useStorageValues();

  const hubDetails = {
    "HUB NAME": selectedHubDetails?.hubName,
    LOCATION: selectedHubDetails?.hubLocation,
    "HUB ID": selectedHubDetails?.hubId,
    "ADMIN ID": selectedHubDetails?.userId,
    "ADMIN NAME": selectedHubDetails?.userName,
    "CONTACT NUMBER": selectedHubDetails?.phoneNumber,
    EMAIL: selectedHubDetails?.emailId,
    Proof: selectedHubDetails?.proof_url,
    Hub_Image: selectedHubDetails?.img_url,
    Bussiness_Image: selectedHubDetails?.bussiness_url,
  };

  const userID = selectedHubDetails?.userId as string;

  const handleClose = () => {
    setOpenModal(!openModal);
  };
  const handleOnClick = (e: onClick, key: any, value: any) => {
    e.preventDefault();
    setModelImage(value);
    setOpenModal(!openModal);
  };

  return (
    <div className="hub-details_container">
      <div className="hub-details-topnav">
        <TextButton
          className="btn-goback"
          onClick={(e: any) => toggleHubPage(e, HubPageEnum.LIST)}
          items={
            <>
              <GoBackIcon /> Go Back
            </>
          }
        />
      </div>
      <div className="hub-details-card u-h4">
        <table>
          {Object.entries(hubDetails).map(([key, value]) => (
            <tr key={key}>
              <td> {key}</td>
              {key === "Proof" ||
              key === "Hub_Image" ||
              key === "Bussiness_Image" ? (
                <td>
                  <img
                    alt="hub-profile's"
                    className="hub-images"
                    src={`${value}`}
                    onClick={(e: any) => {
                      handleOnClick(e, key, value);
                    }}
                  />
                </td>
              ) : (
                <td>{value}</td>
              )}
            </tr>
          ))}
        </table>
      </div>
      {!selectedHubDetails?.approvedStatus && loginRole === "SUPER_ADMIN" && (
        <div className="hub-details-btn-grp">
          <TextButton
            items="Accept"
            className="hub-btn primary u-h6"
            onClick={(e: any) => handleApproveHub(e, userID)}
          />
          <TextButton
            items="Reject"
            className="hub-btn secondary u-h6"
            onClick={(e: any) => handleRejectHub(e, userID)}
          />
        </div>
      )}
      <Modal onClose={handleClose} visibilty={openModal}>
        <div>
          <img src={modelImage} alt="proof_img" className="hub-images-1" />
        </div>
      </Modal>
    </div>
  );
}

export default HubDetails;
