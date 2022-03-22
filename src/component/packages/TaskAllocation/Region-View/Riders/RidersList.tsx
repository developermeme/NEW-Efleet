import {
  IAllocatedRiders,
  IRider,
  ISelectedRegion,
} from "../../../../../redux/slice/package-slice/Types";
import { AssignRiders } from "./AssignRiders";
import { RidersAssigned } from "./RidersAssigned";
import "./RidersList.scss";

interface IProps {
  AssignedRiders: IRider[] | null;
  RidersNeeded: number;
  Riders: IRider[] | null;
  SelectedRegion: ISelectedRegion | null;
  AllocatedRiders: IAllocatedRiders[] | null;
  updateRiderOnSubdivision: (data: IAllocatedRiders[]) => void;
}

export const RidersList = (props: IProps) => {
  const {
    Riders = [],
    RidersNeeded,
    SelectedRegion,
    AssignedRiders,
    AllocatedRiders,
    updateRiderOnSubdivision,
  } = props;

  let content =
    AllocatedRiders && AllocatedRiders.length > 0 ? (
      <RidersAssigned
        SelectedRegion={SelectedRegion}
        RidersNeeded={RidersNeeded}
        Riders={Riders}
        AllocatedRiders={AllocatedRiders}
      />
    ) : (
      <AssignRiders
        SelectedRegion={SelectedRegion}
        AssignedRiders={AssignedRiders}
        RidersNeeded={RidersNeeded}
        Riders={Riders}
        updateRiderOnSubdivision={updateRiderOnSubdivision}
        AllocatedRiders={AllocatedRiders}
      />
    );

  return content;
};
