import { useState, useEffect } from "react";
import clsx from "clsx";
import { TextButton } from "../../../ui-kit/TextButton/TextButton.view";
import { AddIcon } from "../../../asset/Icons/Icons";
import { ParcelConfig } from "./ParcelConfig/ParcelConfig";
import useParcelConfig from "./ParcelConfig/useParcelConfig";
import AddParcelConfig from "./ParcelConfig/AddParcelConfig";
import Addzone from "./Zone/main-zone/AddZone";
import Zone from "./Zone/Zone";
import useZone from "./Zone/useZone";
import "./Style.scss";

export const SettingView = () => {
  const tabs = ["Parcel Config", "Zone"];

  const { fetchParcelDetails } = useParcelConfig();
  const { fetchzoneDetails, ZoneData } = useZone();

  const [activeTab, setActiveTab] = useState("Parcel Config");
  const [showParcelAdd, setShowParcelAdd] = useState(false);
  const [showZoneAdd, setShowZoneAdd] = useState(false);

  const toggle = (tab: string) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const toggleParcelAdd = () => {
    setShowParcelAdd(!showParcelAdd);
  };

  const toggleZoneAdd = () => {
    setShowZoneAdd(!showZoneAdd);
  };

  useEffect(() => {
    fetchParcelDetails();
    fetchzoneDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="app-page-title">
        <ul className="nav-line nav">
          {tabs.map((tab) => (
            <li
              key={tab}
              id={tab}
              className={clsx("nav-link", { active: activeTab === tab })}
              onClick={() => {
                toggle(tab);
              }}
            >
              {tab}
              <div className="divider"></div>
            </li>
          ))}
        </ul>
        <div className="button-wrapper">
          {activeTab === tabs[0] ? (
            <TextButton
              onClick={toggleParcelAdd}
              items={<AddIcon />}
              id="add-zone"
            />
          ) : (
            !ZoneData?.zonename && (
              <TextButton
                id="add-zone"
                onClick={
                  activeTab === tabs[0] ? toggleParcelAdd : toggleZoneAdd
                }
                items={<AddIcon />}
              />
            )
          )}
        </div>
      </div>
      {activeTab === tabs[0] ? <ParcelConfig /> : <Zone />}
      <AddParcelConfig show={showParcelAdd} onHide={toggleParcelAdd} />
      <Addzone show={showZoneAdd} onHide={toggleZoneAdd} />
    </>
  );
};

export default SettingView;
