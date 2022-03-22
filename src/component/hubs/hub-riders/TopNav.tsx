import React from "react";
import { useDispatch } from "react-redux";
import { onClick } from "../../../helper/Properties";
import { GoBackIcon } from "../../../asset/Icons/Icons";
import { HubPageEnum } from "../../../redux/slice/hub-slice/Types";
import { RiderEnum } from "../../../redux/slice/riders-slice/Types";
import { TextButton } from "../../../ui-kit/TextButton/TextButton.view";
import { setSelectedRidersView } from "../../../redux/slice/riders-slice/Slice";
import useHub from "../useHub";

interface IProps {
  selectedRidersView: RiderEnum;
}

export const TopNav: React.FC<IProps> = (props: IProps) => {
  const { selectedRidersView: legendSelected } = props;
  const dispatch = useDispatch();

  const { toggleHubPage } = useHub();

  const getActiveClass = (key: string) => {
    return legendSelected === key ? "active" : "";
  };

  const handleLegendSelect = (e: onClick, key: RiderEnum) => {
    e.preventDefault();
    if (legendSelected === key) {
      dispatch(setSelectedRidersView(RiderEnum.ALL_RIDERS));
    } else {
      dispatch(setSelectedRidersView(key));
    }
  };

  return (
    <div className="hub-legends ">
      <TextButton
        className="btn-goback"
        onClick={(e: any) => toggleHubPage(e, HubPageEnum.LIST)}
        items={
          <>
            <GoBackIcon /> Go Back
          </>
        }
      />

      <div className="hub-btn-group">
        <TextButton
          className={`hub-btn primary u-h6 ${getActiveClass(
            RiderEnum.ONLINE_RIDERS
          )}`}
          items="Online"
          onClick={(e: any) => handleLegendSelect(e, RiderEnum.ONLINE_RIDERS)}
        />
        <TextButton
          className={`hub-btn secondary u-h6 ${getActiveClass(
            RiderEnum.OFFLINE_RIDERS
          )}`}
          onClick={(e: any) => handleLegendSelect(e, RiderEnum.OFFLINE_RIDERS)}
          items="Offline"
        />
      </div>
    </div>
  );
};
