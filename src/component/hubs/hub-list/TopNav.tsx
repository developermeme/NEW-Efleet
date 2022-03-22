import React from "react";
import { useDispatch } from "react-redux";
import { onClick } from "../../../helper/Properties";
import { setSelectedHub } from "../../../redux/slice/hub-slice/Slice";
import { SelectedHubEnum } from "../../../redux/slice/hub-slice/Types";
import { TextButton } from "../../../ui-kit/TextButton/TextButton.view";
import useHub from "../useHub";

const TopNav = () => {
  const { selectedHub } = useHub();

  const dispatch = useDispatch();

  const getActiveClass = (key: string) => {
    return selectedHub === key ? "active" : "";
  };

  const handleLegendSelect = (e: onClick, key: SelectedHubEnum) => {
    e.preventDefault();
    if (selectedHub === key) return;
    else {
      dispatch(setSelectedHub(key));
    }
  };

  return (
    <div className="hubs-btn-grp">
      <TextButton
        className={`hub-btn primary u-h6 ${getActiveClass(
          SelectedHubEnum.APPROVED
        )}`}
        items="Approved"
        onClick={(e: any) => handleLegendSelect(e, SelectedHubEnum.APPROVED)}
      />
      <TextButton
        className={`hub-btn secondary u-h6 ${getActiveClass(
          SelectedHubEnum.REQUESTED
        )}`}
        items="Requested"
        onClick={(e: any) => handleLegendSelect(e, SelectedHubEnum.REQUESTED)}
      />
    </div>
  );
};

export default TopNav;
