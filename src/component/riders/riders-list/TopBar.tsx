import React from "react";
import { useDispatch } from "react-redux";
import { AddIcon } from "../../../asset/Icons/Icons";
import { onClick } from "../../../helper/Properties";
import { setSelectedRidersPage, setSelectedRidersView } from "../../../redux/slice/riders-slice/Slice";
import { RiderEnum, RidersPageEnum } from "../../../redux/slice/riders-slice/Types";
import { TextButton } from "../../../ui-kit/TextButton/TextButton.view";

interface IProps {
  selectedRidersView: RiderEnum;
}

export const TopBar: React.FC<IProps> = (props: IProps) => {
  const { selectedRidersView: legendSelected } = props;

  const dispatch = useDispatch();

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

  const handleAddNewRider = (e: onClick) => {
    e.preventDefault();
    dispatch(setSelectedRidersPage(RidersPageEnum.ADD_RIDERS));
  };

  return (
    <div className="riders-legends ">
      <TextButton
        className="btn-add"
        isprimary={true}
        onClick={handleAddNewRider as any}
        items={
          <>
            <AddIcon />
            New Rider
          </>
        }
      />
      <div className="rider-btn-group">
        <TextButton
          className={`rider-btn primary u-h6 ${getActiveClass(
            RiderEnum.ONLINE_RIDERS
          )}`}
          items="Online"
          onClick={(e: any) => handleLegendSelect(e, RiderEnum.ONLINE_RIDERS)}
        />
        <TextButton
          className={`rider-btn secondary u-h6 ${getActiveClass(
            RiderEnum.OFFLINE_RIDERS
          )}`}
          onClick={(e: any) => handleLegendSelect(e, RiderEnum.OFFLINE_RIDERS)}
          items="Offline"
        />
      </div>
    </div>
  );
};
