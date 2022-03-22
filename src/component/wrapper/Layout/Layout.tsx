import React from "react";
import Sidebar from "./Sidebar/Sidebar";
import { TopBar } from "./TopBar/TopBar";
import { onClick } from "../../../helper/Properties";
import "./Layout.scss";

function Layout({ children }: any) {
  const [showSideBar, setShowSideBar] = React.useState(false);
  const [showBackdrop, setShowBackdrop] = React.useState(false);

  const onMobileClick = (e: onClick) => {
    e.preventDefault();
    setShowSideBar(!showSideBar);
    setShowBackdrop(!showBackdrop);
  };

  return (
    <div className="app-wrapper app-sidebar-fixed app-header-fixed">
      <div>
        <Sidebar
          onMobileClick={onMobileClick}
          showSideBar={showSideBar}
          showBackdrop={showBackdrop}
        />
      </div>
      <div className="app-main">
        <TopBar handleMenuClick={onMobileClick} />
        <div className="app-content">
          <div className="app-content--inner">
            <div className="app-content--inner__wrapper">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
