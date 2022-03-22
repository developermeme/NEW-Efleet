import React from "react";
import { HomeIcon, LocationIcon } from "../../../asset/Icons/Icons";
import User from "../../../asset/Images/user.svg";
import { IHub } from "../../../redux/slice/hub-slice/Types";
import { TextButton } from "../../../ui-kit/TextButton/TextButton.view";
import useHub from "../useHub";
import { BsFillPersonFill } from "react-icons/bs";

interface IProps {
  hub: IHub;
}

const HubItem = (props: IProps) => {
  const { hub } = props;

  const { toggleDetailsPage, toggleRidersPage } = useHub();

  return (
    <div className="hub-card" key={hub.role}>
      <div className="hub-item-col">
        <img
          src={hub.bussiness_url || User}
          alt="hub-img"
          className="hub-avathar"
        />
      </div>

      <div className="hub-item-col">
        <span>
          <BsFillPersonFill />
          {hub.hubName}
        </span>
        <span>
          <HomeIcon /> ID {hub.hubId}
        </span>

        <span>
          <LocationIcon /> {hub.hubLocation}
        </span>
        <div className="hubs-btn-grp">
          <TextButton
            items="Riders"
            className="hub-btn primary u-h6"
            onClick={(e: any) => toggleRidersPage(e, hub)}
          />
          <TextButton
            items="Details"
            className="hub-btn secondary u-h6"
            onClick={(e: any) => toggleDetailsPage(e, hub)}
          />
        </div>
      </div>
    </div>
  );
};

export default HubItem;
