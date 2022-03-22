import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../redux/reducer/CombineReducer";
import { PackageServices } from "../../../util/API";
import { RegionList } from "./Region-List/RegionList";
import { RegionView } from "./Region-View/RegionView";
import useHub from "../../hubs/useHub";
import { usePageLoader, useStorageValues } from "../../../hooks/Index";
import { formatDate } from "../../../helper/Script";
import {
  IAllocatedRiders,
  IPack,
  IPackages,
  TaskPageEnum,
} from "../../../redux/slice/package-slice/Types";
import { IHub } from "../../../redux/slice/hub-slice/Types";
import {
  setAllocatedRiders,
  setPackages,
  setRiders,
} from "../../../redux/slice/package-slice/Slice";

export interface ISpilltedPackages {
  title: string;
  riders: string;
  packags: IPack[];
}

export const TaskAllocation = () => {
  const dispatch = useDispatch();
  const { packageData } = useSelector((state: IRootState) => state);
  const packages = packageData && packageData.Packages;
  const taskAllocationView = packageData && packageData.TaskAllocationView;
  const SelectedRegion = packageData && packageData.SelectedRegion;
  const Riders = packageData && packageData.Riders;
  const AssignedRiders = packageData && packageData.AssignedRiders;
  const AllocatedRiders = packageData && packageData.AllocatedRiders;

  const [packagesList, setPackagesList] = useState<ISpilltedPackages[] | null>(
    null
  );
  const [loader, showLoader, hideLoader] = usePageLoader() as any;
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const keys = packages && Object.keys(packages);
  const ITEMS_PER_PAGE = 6;

  const { LoginHubid } = useStorageValues() as any;

  const { fetchHubs, hubList: hubs } = useHub();

  const selectedHub = hubs?.find((item: IHub) => item.hubId === LoginHubid);

  useEffect(() => {
    fetchHubs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Get riders list using hubId
  const getRiders = async () => {
    showLoader();
    axios
      .get(`https://e-bikefleet.com/api/users/allriderstask/${LoginHubid}`)
      .then((response: any) => {
        hideLoader();
        dispatch(setRiders(response.data.user));
      })
      .catch((error) => {
        hideLoader();
        console.log(error);
      });
  };

  // Get AllocatedRiders  Using SubRegion ID and HubId
  const getAllocatedRiders = async (subid: string, hubid: string) => {
    const data = {
      hubid: hubid,
      subdivision: subid,
    };
    showLoader();
    await PackageServices.getRiderOnSubdivision(data)
      .then((response: any) => {
        hideLoader();
        dispatch(setAllocatedRiders(response.data));
      })
      .catch((error) => {
        hideLoader();
        console.log(error);
      });
  };

  // Update AllocatedRiders using SubRegion ID and HubId
  const updateRiderOnSubdivision = async (data: IAllocatedRiders[]) => {
    const subName = localStorage.getItem("subName") || ("" as string);
    const hubId = localStorage.getItem("hubId") || ("" as string);

    showLoader();
    await PackageServices.addRiderOnSubdivision(data)
      .then((response: any) => {
        hideLoader();
        getAllocatedRiders(subName, hubId);
      })
      .catch((error) => {
        hideLoader();
        console.log(error);
      });
  };

  /*************************** SUB REGIONS PACKAGES *****************************/

  // Getting allocated packages for each subregion
  const getSubRegionPackages = async () => {
    const data = {
      lat: selectedHub?.hubLatitute,
      lang: selectedHub?.hubLongitude,
      date: formatDate(new Date()),
      hubid: LoginHubid,
    };

    showLoader();
    await PackageServices.zonedParcel(data)
      .then((response: any) => {
        hideLoader();
        dispatch(setPackages(response.data));
      })
      .catch((error) => {
        console.log(error);
        hideLoader();
      });
  };

  const formatData = (data: IPackages) => {
    let dataset: any = [];
    // eslint-disable-next-line array-callback-return
    keys?.map((title: string) => {
      const splittedData = title.split(":");
      dataset.push({
        title: splittedData[0],
        riders: splittedData[1],
        packags: data[title],
      });
    });
    return dataset;
  };

  // SubRegion List
  useEffect(() => {
    getSubRegionPackages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (packages) {
      const dataset = formatData(packages);
      setPackagesList(dataset);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [packages]);

  const filteredPackages = useMemo(() => {
    if (packagesList) {
      let computedPackages = packagesList;
      setTotalItems(computedPackages.length);
      //Current Page slice
      return computedPackages.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
      );
    } else return;
  }, [packagesList, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  /******************COMPONENT RENDERING***********************/

  const view =
    taskAllocationView === TaskPageEnum.Item ? (
      <RegionView
        SelectedRegion={SelectedRegion}
        Riders={Riders}
        AssignedRiders={AssignedRiders}
        AllocatedRiders={AllocatedRiders}
        updateRiderOnSubdivision={updateRiderOnSubdivision}
        getSubRegionPackages={getSubRegionPackages}
      />
    ) : (
      <RegionList
        filteredPackages={filteredPackages}
        ItemsPerPage={ITEMS_PER_PAGE}
        currentPage={currentPage}
        totalItems={totalItems}
        getRiders={getRiders}
        handlePageChange={handlePageChange}
        getAllocatedRiders={getAllocatedRiders}
      />
    );

  return <div>{loader ? loader : view}</div>;
};
