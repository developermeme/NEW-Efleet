import { useMemo } from "react";
import TopNav from "./TopNav";
import useHub from "../useHub";
import HubItem from "./HubItem";
import { IHub, SelectedHubEnum } from "../../../redux/slice/hub-slice/Types";
import { useStorageValues } from "../../../hooks/useLocalStorage";

function HubList() {
  const { hubList, selectedHub } = useHub();

  const { loginRole, LoginHubid } = useStorageValues();

  const filteredHubs = useMemo(() => {
    let computedData = hubList || [];

    computedData = computedData.filter((item: IHub) => {
      return selectedHub === SelectedHubEnum.APPROVED
        ? item.approvedStatus
        : !item.approvedStatus;
    });

    if (loginRole !== "SUPER_ADMIN") {
      computedData = computedData.filter((item: IHub) => {
        return item.hubId === LoginHubid;
      });
    }

    return computedData;
  }, [selectedHub, hubList, loginRole, LoginHubid]);

  return (
    <section>
      {loginRole === "SUPER_ADMIN" && <TopNav />}

      <div className="hubs-list">
        {filteredHubs.map((item: IHub) => (
          <div key={item.hubId}>
            <HubItem hub={item} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default HubList;
