import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import projectLogo from "../../../../../asset/Images/logo.svg";

function SidebarHeader() {
  return (
    <Fragment>
      <div className="app-sidebar--header">
        <div className="nav-logo">
          <Link to="/Home" title="EFLEET">
            <i>
              <img alt="EFLEET" src={projectLogo} />
            </i>
            <span>EFLEET</span>
          </Link>
        </div>
      </div>
    </Fragment>
  );
}

export default SidebarHeader;
