import { useDispatch } from "react-redux";
import { ISpilltedPackages } from "../taskallocation";
import { onClick } from "../../../../helper/Properties";
import { setAssignedRiders, setSelectedRegion, setTaskAllocationView } from "../../../../redux/slice/package-slice/Slice";
import { TaskPageEnum } from "../../../../redux/slice/package-slice/Types";

interface IProps {
  item: ISpilltedPackages;
  getRiders: () => void;
  getAllocatedRiders: (subid: string, hubid: string) => void;
}

export const RegionItem = (props: IProps) => {
  const { item, getRiders, getAllocatedRiders } = props;

  // const id = item.title.split("-")[1];
  // const regionName = `Sub Region ${id}`;
  const dispatch = useDispatch();

  const subName = item.packags[0].suburb || "";
  const hubId = item.packags[0].hubid || "";

  const handleOnClick = (e: onClick) => {
    e.preventDefault();
    dispatch(setTaskAllocationView(TaskPageEnum.Item));
    dispatch(
      setSelectedRegion({
        name: item.title,
        packages: item.packags,
        riders: parseInt(item.riders),
      })
    );
    getRiders();
    getAllocatedRiders(subName, hubId);
    dispatch(setAssignedRiders([]));
    localStorage.setItem("subName", subName);
    localStorage.setItem("hubId", hubId);
  };

  return (
    <article className="card" onClick={handleOnClick}>
      <button className="btn">{item.title}</button>
      <div className="card-item">
        <label htmlFor="package">No. of Packages</label>
        <span id="package">{item.packags.length || 0}</span>
      </div>
      <div className="card-item">
        <label htmlFor="rider">Riders Needed</label>
        <span id="rider">{item.riders || 0}</span>
      </div>
    </article>
  );
};
