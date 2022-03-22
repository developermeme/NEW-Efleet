import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { onClick } from "../../../../helper/Properties";
import { setTaskAllocationView } from "../../../../redux/slice/package-slice/Slice";
import {
  IAllocatedRiders,
  IRider,
  ISelectedRegion,
  TaskPageEnum,
} from "../../../../redux/slice/package-slice/Types";
import { PackagesTable } from "./Packages/PackagesTable";
import "./RegionView.scss";
import { RidersList } from "./Riders/RidersList";

interface IProps {
  AllocatedRiders: IAllocatedRiders[] | null;
  AssignedRiders: IRider[] | null;
  Riders: IRider[] | null;
  SelectedRegion: ISelectedRegion | null;
  updateRiderOnSubdivision: (data: IAllocatedRiders[]) => void;
  getSubRegionPackages: () => void;
}

export const RegionView = (props: IProps) => {
  const {
    SelectedRegion,
    AssignedRiders,
    Riders,
    AllocatedRiders,
    updateRiderOnSubdivision,
    getSubRegionPackages,
  } = props;
  const [value, setValue] = useState(0);

  const RidersNeeded = SelectedRegion?.riders || 0;

  const getRiders = AllocatedRiders?.length
    ? "Assinged Riders"
    : "Assign Riders";

  const tabs = ["Pakages", getRiders];
  const dispatch = useDispatch();

  const handleOnClick = (e: onClick) => {
    e.preventDefault();
    dispatch(setTaskAllocationView(TaskPageEnum.List));
  };

  return (
    <div className="region-item-tabs">
      <button className="prev-btn" onClick={handleOnClick}></button>

      <main>
        {tabs.map((item: string, index: number) => {
          return (
            <React.Fragment>
              <input
                id={`tab${index + 1}`}
                type="radio"
                name="tabs"
                className="tab-input"
                onClick={() => setValue(index)}
                checked={index === value ? true : false}
              />
              <label htmlFor={`tab${index + 1}`} className="tab-label">
                {item}
              </label>
            </React.Fragment>
          );
        })}

        <section id="content1" className="content">
          <PackagesTable
            SelectedRegion={SelectedRegion}
            AllocatedRiders={AllocatedRiders}
            RidersNeeded={RidersNeeded}
            getSubRegionPackages={getSubRegionPackages}
          />
        </section>

        <section id="content2" className="content">
          <RidersList
            SelectedRegion={SelectedRegion}
            AssignedRiders={AssignedRiders}
            RidersNeeded={RidersNeeded}
            Riders={Riders}
            AllocatedRiders={AllocatedRiders}
            updateRiderOnSubdivision={updateRiderOnSubdivision}
          />
        </section>
      </main>
    </div>
  );
};
