import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import CheckBox from "../../../../../ui-kit/CheckBox/CheckBox";
import { TextButton } from "../../../../../ui-kit/TextButton/TextButton.view";

import useError from "../../../../../hooks/useError";
import Search from "../../../../../ui-kit/Search";
import { onChange, onClick } from "../../../../../helper/Properties";
import {
  IAllocatedRiders,
  IRider,
  ISelectedRegion,
} from "../../../../../redux/slice/package-slice/Types";
import { setAssignedRiders } from "../../../../../redux/slice/package-slice/Slice";

interface IProps {
  AssignedRiders: IRider[] | null;
  Riders: IRider[] | null;
  RidersNeeded: number;
  SelectedRegion: ISelectedRegion | null;
  AllocatedRiders: IAllocatedRiders[] | null;
  updateRiderOnSubdivision: (data: IAllocatedRiders[]) => void;
}

export const AssignRiders = (props: IProps) => {
  const {
    AssignedRiders,
    RidersNeeded,
    Riders = [],
    SelectedRegion,
    updateRiderOnSubdivision,
    AllocatedRiders,
  } = props;

  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const [error, showError, hideError] = useError() as any;
  const initialState = AssignedRiders || [];
  const [selectedRiders, setSelectedRiders] = useState<IRider[]>(initialState);

  // Getting Riders Available On Online
  const activeRiders =
    Riders?.filter(
      (item: IRider) => item.riderStatus?.toLowerCase() === "online"
    ) || [];

  useEffect(() => {
    let result: IRider[] | null;
    if (activeRiders && activeRiders.length > 0 && AssignedRiders) {
      result = activeRiders.filter((x: IRider) =>
        AssignedRiders.some(
          ({ userId, userName }: IRider) =>
            x.userId === userId && x.userName === userName
        )
      );
    } else {
      result = [];
    }
    setSelectedRiders(result);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(setAssignedRiders(selectedRiders));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRiders, RidersNeeded]);

  const getExistingItem = (item: IRider) => {
    const isExist = selectedRiders?.findIndex(
      (x: IRider) => x.userId === item.userId
    );
    return {
      isExist: isExist === -1 ? false : true,
      isExistIndex: isExist,
    };
  };

  const commentsData = useMemo(() => {
    let computedComments = activeRiders || [];
    if (activeRiders && search) {
      computedComments = computedComments.filter(
        (comment: IRider) =>
          comment.userName.toLowerCase().includes(search.toLowerCase()) ||
          comment.userId.toLowerCase().includes(search.toLowerCase())
      );
    }
    return computedComments;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, Riders]);

  const handleRidersSelect = (e: onChange, item: IRider) => {
    const isExistingItem = getExistingItem(item).isExist;
    const existingItemIndex = getExistingItem(item).isExistIndex;
    hideError();
    if (isExistingItem) {
      const copyArray = [...selectedRiders];
      copyArray.splice(existingItemIndex, 1);
      setSelectedRiders([...copyArray]);
    } else {
      if (selectedRiders && selectedRiders.length >= RidersNeeded) {
        showError(`Already Selected Required ${RidersNeeded} Riders`);
      } else {
        setSelectedRiders([...selectedRiders, item]);
      }
    }
  };

  const getRiders = () => {
    let ridersList;
    if (commentsData && commentsData.length) {
      ridersList = commentsData.map((rider: IRider) => (
        <li className="tile__item" key={rider.userName}>
          <CheckBox
            id={rider.userId}
            onChange={(e: any) => {
              handleRidersSelect(e, rider);
            }}
            checked={getExistingItem(rider).isExist}
          />
          <span id="userid">{rider.userName}</span>
        </li>
      ));
    } else {
      ridersList = (
        <li
          className="tile__item"
          style={{ justifyContent: "center", fontWeight: "500px" }}
        >
          No Riders Available
        </li>
      );
    }
    return ridersList;
  };

  const handleUpdateRiders = (e: onClick) => {
    e.preventDefault();
    const subName = localStorage.getItem("subName");
    if (
      AssignedRiders &&
      AssignedRiders.length === RidersNeeded &&
      AllocatedRiders?.length !== RidersNeeded
    ) {
      const data = AssignedRiders.map((item: IRider) => {
        return {
          hubid: item.hubId,
          riderid: item.userId,
          ridername: item.userName,
          subdivision: subName,
          typeofvehicle: item.vehicleType,
          weight: parseInt(item.weight),
        };
      });

      updateRiderOnSubdivision(data as any);
    }
  };

  return (
    <div className="riders-container">
      <section className="topnav">
        <h4 className="u-h4">
          {SelectedRegion?.name} - ( Choose Needed {RidersNeeded} Riders )
        </h4>
        <Search
          onSearch={(value: string) => {
            hideError();
            setSearch(value);
          }}
        />
      </section>
      <div className="user-list u-h5">
        <ol className="usertiles">{getRiders()}</ol>
        {error && error}
      </div>
      {AssignedRiders && AssignedRiders.length === RidersNeeded && (
        <TextButton
          isprimary={true}
          items="Update Riders"
          className="update-riders"
          onClick={handleUpdateRiders as any}
        />
      )}
    </div>
  );
};
