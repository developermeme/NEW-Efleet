import { useState } from "react";
import { useDispatch } from "react-redux";
import useZone from "./useZone";
import Subzone from "./sub-zone/SubZone";
import { ZoneInfo } from "./main-zone/ZoneInfo";
import Addsubdivision from "./sub-zone/AddSubDivision";
import { AddIcon } from "../../../../asset/Icons/Icons";
import { onClick } from "../../../../helper/Properties";
import { TextButton } from "../../../../ui-kit/TextButton/TextButton.view";
import "./Zone.scss";
import { setSelectedSubZone } from "../../../../redux/slice/setting-slice/Slice";

export enum SelectedSubZoneEnum {
  ADD = "Add",
  EDIT = "Update",
}

function Zone() {
  const { ZoneData, loader, error } = useZone();

  const dispatch = useDispatch();

  const [showSubzoneAdd, setShowSubzoneAdd] = useState(false);
  const [selectedSubzone, setSelectedSubzone] = useState<
    undefined | SelectedSubZoneEnum
  >(undefined);

  const toggle = (view?: SelectedSubZoneEnum) => {
    setShowSubzoneAdd(!showSubzoneAdd);
    if (view) setSelectedSubzone(view);
  };

  const handleAddSubzone = (e: onClick) => {
    e.preventDefault();
    dispatch(setSelectedSubZone(null));
    toggle(SelectedSubZoneEnum.ADD);
  };

  if (loader) {
    return loader;
  }

  if (error) {
    return error;
  }

  return (
    <div>
      <h3 className="u-h3 zone-head">Zone Info</h3>
      {ZoneData?.zoneid ? (
        <>
          <ZoneInfo zone={ZoneData} />
          <h3 className="u-h3 zone-head">
            Sub Divisions
            <TextButton
              id="add-subzone"
              isprimary
              items={<AddIcon />}
              onClick={handleAddSubzone as any}
            />
          </h3>
          <Subzone toggle={toggle} />
          <Addsubdivision
            show={showSubzoneAdd}
            onHide={toggle}
            zoneview={selectedSubzone as SelectedSubZoneEnum}
          />
        </>
      ) : (
        <h3 className="empty-zone u-h3">No Zones Available. Create New Zone</h3>
      )}
    </div>
  );
}

export default Zone;
