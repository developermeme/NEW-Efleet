import { useMemo, useState } from "react";
import {
  IAllocatedRiders,
  IRider,
  ISelectedRegion,
} from "../../../../../redux/slice/package-slice/Types";
import Search from "../../../../../ui-kit/Search";
import "./RidersList.scss";

interface IProps {
  AllocatedRiders: IAllocatedRiders[] | null;
  RidersNeeded: number;
  Riders: IRider[] | null;
  SelectedRegion: ISelectedRegion | null;
}

export const RidersAssigned = (props: IProps) => {

  const { AllocatedRiders, RidersNeeded, Riders = [], SelectedRegion } = props;
  const [search, setSearch] = useState("");

  const commentsData = useMemo(() => {
    let computedComments = AllocatedRiders || [];
    if (AllocatedRiders && search) {
      computedComments = computedComments.filter(
        (comment: IAllocatedRiders) =>
          comment.ridername.toLowerCase().includes(search.toLowerCase()) ||
          comment.riderid.toLowerCase().includes(search.toLowerCase())
      );
    }
    return computedComments;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, Riders]);


  // Rendering Allocated Riders

  const getRiders = () => {
    let ridersList;
    if (commentsData && commentsData.length) {
      ridersList = commentsData.map((rider: IAllocatedRiders) => (
        <li className="tile__item" key={rider.riderid}>
          <label htmlFor="userid">{rider.riderid}</label>
          <span id="userid">{rider.ridername}</span>
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

  return (
    <div className="riders-container">
      <section className="topnav">
        <h4 className="u-h4">
          {SelectedRegion?.name} - ( {RidersNeeded} Riders Assigned )
        </h4>
        <Search
          onSearch={(value: string) => {
            setSearch(value);
          }}
        />
      </section>
      <div className="user-list u-h5">
        <ol className="usertiles">{getRiders()}</ol>
      </div>
    </div>
  );
};
