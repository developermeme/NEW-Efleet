import { Fragment, useState } from "react";
import AssignRider from "../../AssignRider/AssignRider";
import {
  IAllocatedRiders,
  IPack,
  ISelectedRegion,
} from "../../../../../redux/slice/package-slice/Types";
import { onClick } from "../../../../../helper/Properties";
import { TextButton } from "../../../../../ui-kit/TextButton/TextButton.view";
import "./PackagesTable.scss";

interface IProps {
  SelectedRegion: ISelectedRegion | null;
  AllocatedRiders: IAllocatedRiders[] | null;
  RidersNeeded: number;
  getSubRegionPackages: () => void;
}

export const PackagesTable = (props: IProps) => {
  const {
    SelectedRegion,
    AllocatedRiders,
    RidersNeeded,
    getSubRegionPackages,
  } = props;

  const headers = ["Pkg.ID", "Pkg", "Address"];
  const [openAssignRider, setAssignRider] = useState<boolean>(false);
  const [selectedPack, setSelectedPack] = useState<IPack | null>(null);

  const handleClose = () => {
    setAssignRider(!openAssignRider);
  };

  const handleClick = (e: onClick, item: IPack) => {
    e.preventDefault();
    handleClose();
    setSelectedPack(item);
  };

  const renderTable = (item: IPack) => {
    const id = item.orderNumber;
    const addressData = [
      item.building,
      item.street,
      item.city,
      item.country,
      item.postcode,
    ];

    const getDeliveryBy = () => {
      return RidersNeeded === AllocatedRiders?.length ? (
        <TextButton
          items="Assign User"
          className="assign-user"
          isprimary={true}
          onClick={(e: any) => handleClick(e, item) as any}
        />
      ) : (
        "No Riders Allocated"
      );
    };

    const PackageData = {
      name: item.name,
      telephone: item.telephone,
      weight: item.weight,
      status: item.status || "Not Delivered",
      deliveredBy: item.deliveredBy || getDeliveryBy(),
    };

    const Address = addressData.map((x) => (
      <div className="mb10" key={x}>
        {x}
      </div>
    ));

    const packageDetails = Object.entries(PackageData).map(
      ([key, value]) =>
        value && (
          <div className="mb10" key={key}>
            <span className="table-key">{key} : </span>
            {value}
          </div>
        )
    );

    return (
      <Fragment>
        <thead>
          <tr>
            {headers.map((header: string) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr style={{ verticalAlign: "middle" }}>
            <td data-label={headers[0]}>{id}</td>
            <td data-label={headers[1]}>{packageDetails}</td>
            <td data-label={headers[2]}>{Address}</td>
          </tr>
        </tbody>
      </Fragment>
    );
  };

  return (
    <div className="package-container">
      <section className="topnav">
        <h4>
          {SelectedRegion?.name} - ( {RidersNeeded} Riders Needed )
        </h4>
      </section>
      <div className="table-list">
        {SelectedRegion?.packages.map((item: IPack, index: number) => (
          <table className="table" key={index}>
            {renderTable(item)}
          </table>
        ))}
      </div>
      {openAssignRider && (
        <AssignRider
          isOpen={openAssignRider}
          handleClose={handleClose}
          AllocatedRiders={AllocatedRiders}
          selectedPack={selectedPack}
          getSubRegionPackages={getSubRegionPackages}
        />
      )}
    </div>
  );
};
