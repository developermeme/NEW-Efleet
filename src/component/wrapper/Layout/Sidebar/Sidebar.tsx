import { Fragment } from "react";
import SidebarHeader from "./SidebarHeader";
import { SidebarMenu } from "./SidebarMenu";
import "./Sidebar.scss";

function Sidebar(props: any) {
  const { onMobileClick, showSideBar, showBackdrop } = props;

  const isActiveOverlay = showBackdrop ? "is-active" : "";
  const isMobileOpen = showSideBar ? "app-sidebar-mobile-open" : "";

  return (
    <Fragment>
      <div className={`app-sidebar ${isMobileOpen}`}>
        <SidebarHeader />
        <SidebarMenu />
      </div>
      <div
        className={`app-sidebar-overlay ${isActiveOverlay}`}
        onClick={onMobileClick}
      ></div>
    </Fragment>
  );
}

export default Sidebar;
