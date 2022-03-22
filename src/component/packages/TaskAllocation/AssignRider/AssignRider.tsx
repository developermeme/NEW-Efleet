import React, { Fragment, useState } from "react";
import { onClick } from "../../../../helper/Properties";
import { useError } from "../../../../hooks/Index";
import {
  IAllocatedRiders,
  IPack,
} from "../../../../redux/slice/package-slice/Types";
import { DropDown } from "../../../../ui-kit/DropDown/DropDown";
import Modal from "../../../../ui-kit/modal/modal";
import { TextButton } from "../../../../ui-kit/TextButton/TextButton.view";
import { PackageServices } from "../../../../util/API";
import "./AssignRider.scss";

interface IProps {
  handleClose: () => void;
  isOpen: boolean;
  AllocatedRiders: IAllocatedRiders[] | null;
  selectedPack: IPack | null;
  getSubRegionPackages: () => void;
}

export const AssignRider = (props: IProps) => {
  const {
    isOpen,
    handleClose,
    AllocatedRiders,
    selectedPack,
    getSubRegionPackages,
  } = props;

  const [error, showError, hideError] = useError() as any;
  const [haveText, setHaveText] = useState<string>("");

  const userNameList =
    AllocatedRiders?.map((item: IAllocatedRiders) => item.ridername) || [];

  const selectedRider =
    AllocatedRiders?.find(
      (rider: IAllocatedRiders) => rider.ridername === haveText
    ) || null;

  const { did, suburb, weight, telephone, itemName } = selectedPack as IPack;

  const handleText = (ev: any) => {
    hideError();
    setHaveText(ev.currentTarget.textContent);
  };

  const RiderWeight = selectedRider?.weight || 0;

  const packageData = [
    {
      name: "did",
      value: did,
    },
    {
      name: "suburb",
      value: suburb,
    },
    {
      name: "weight",
      value: weight,
    },
    {
      name: "telephone",
      value: telephone,
    },
  ];

  const handleClick = (e: onClick) => {
    e.preventDefault();
    hideError();
    if (haveText) {
      if (weight <= RiderWeight) {
        PackageServices.updateRiderToParcel({
          did: did,
          riderId: selectedRider?.riderid,
        })
          .then((res) => {
            getSubRegionPackages();
          })
          .catch((error) => {
            showError("Something Went Wrong !!!");
          });
      } else {
        showError(`Don't add more than ${weight}`);
      }
    } else {
      showError(`Assign Rider`);
    }
  };

  const ProductSpectification = () => {
    return (
      <table className="Product-Table">
        {itemName && (
          <thead>
            <tr>
              <td>itemName</td>
              <td>{itemName}</td>
            </tr>
          </thead>
        )}
        <tbody>
          {packageData.map((item: any) => {
            return (
              <React.Fragment>
                {item && (
                  <tr>
                    <td>{item.name}</td>
                    <td>{item.value}</td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    );
  };

  return (
    <Modal onClose={handleClose} visibilty={isOpen} classname="Assign-Rider">
      <Fragment>
        <h1 className="u-h2 header">
          Selected Rider - {haveText || "No rider assigned for this package"}
        </h1>
        {haveText && (
          <p className="u-h6">
            Takable Weight by {haveText} is {RiderWeight} , so assign the
            packages which is less than or equal to {RiderWeight}
          </p>
        )}
        {error && error}
        <ProductSpectification />
        <DropDown
          text={haveText}
          handleText={handleText}
          items={userNameList}
        />
        <TextButton
          items="Assign Rider"
          className="assign-btn u-h6"
          isprimary={true}
          onClick={handleClick as any}
        />
      </Fragment>
    </Modal>
  );
};

export default AssignRider;
