import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Collapse } from "react-bootstrap";
import { FaHome } from "react-icons/fa";
import { MdDirectionsBike } from "react-icons/md";
import { MdPeopleAlt } from "react-icons/md";
import { FaWarehouse } from "react-icons/fa";
import { FiPackage } from "react-icons/fi";
import { MdPayment } from "react-icons/md";
import { BsChat } from "react-icons/bs";
import { FaHandsHelping } from "react-icons/fa";
import { ImSwitch } from "react-icons/im";
import { IoMdArrowDropdown } from "react-icons/io";
import { Fragment, useState } from "react";
import { AiFillSetting } from "react-icons/ai";
import { BiTask } from "react-icons/bi";
import { RiUserReceived2Fill } from "react-icons/ri";
import { onClick } from "../../../../../helper/Properties";
import { useStorageValues } from "../../../../../hooks/Index";
import { IRootState } from "../../../../../redux/reducer/CombineReducer";
import {
  setActiveSearch,
  setSearchData,
  setSelectedNav,
} from "../../../../../redux/slice/nav-slice/Slice";
import { logout } from "../../../../../redux/slice/firebase-actions/auth-actions";
import { mockUserId } from "../../../../support/useSupport";
import { useHistory } from "react-router-dom";
import {
  LoginPage,
  useValidationInfoContext,
} from "../../../../../context/ValidationContext";

interface INavList {
  item: string;
  icon?: any;
  href: any;
  Collapse?: boolean;
}

const NavList: INavList[] = [
  {
    item: "Home",
    icon: <FaHome className="SideBarIcon" />,
    href: "/Home",
    Collapse: false,
  },
  {
    item: "Vehicle Details",
    icon: <MdDirectionsBike className="SideBarIcon" />,
    href: "/Vehicletable",
    Collapse: false,
  },
  {
    item: "Riders",
    icon: <MdPeopleAlt className="SideBarIcon" />,
    href: "/Riders",
    Collapse: false,
  },
  {
    item: "Hubs",
    icon: <FaWarehouse className="SideBarIcon" />,
    href: "/Hubs",
    Collapse: false,
  },
  {
    item: "Packages",
    icon: <FiPackage className="SideBarIcon" />,
    href: "/#",
    Collapse: true,
  },
  {
    item: "Payments",
    icon: <MdPayment className="SideBarIcon" />,
    href: "/Payment",
    Collapse: false,
  },
  {
    item: "Support Centre",
    icon: <BsChat className="SideBarIcon" />,
    href: "/Support",
    Collapse: false,
  },
  {
    item: "IT Support",
    icon: <FaHandsHelping className="SideBarIcon" />,
    href: "/ItSupport",
    Collapse: false,
  },
  {
    item: "Logout",
    icon: <ImSwitch className="SideBarIcon" />,
    href: "/#",
    Collapse: true,
  },
];

const superAdminHideTabs = [
  "Vehicle Details",
  "Packages",
  "Riders",
  "Payments",
];

const adminHideTabs = ["Hubs"];

const SubNavList: INavList[] = [
  {
    item: "Received Packages",
    href: "/Receivedpackages",
    icon: <RiUserReceived2Fill className="SideBarIcon" />,
  },
  {
    item: "Task Allocation",
    href: "/Taskallocation",
    icon: <BiTask className="SideBarIcon" />,
  },
  {
    item: "Setting",
    href: "/Setting",
    icon: <AiFillSetting className="SideBarIcon" />,
  },
];

interface IProps {
  showNavLabel?: string;
}

export const SidebarMenu = (props: IProps) => {
  const { handleLoginRoute } = useValidationInfoContext();

  const { showNavLabel } = props;
  const { loginRole } = useStorageValues();
  const [open, setOpen] = useState(false);
  const history = useHistory();

  const { navData } = useSelector((state: IRootState) => state);
  const selectedNav = navData && navData.selectedNav;

  const dispatch = useDispatch();

  const getFilteredList = (hidablelist: string[]) =>
    NavList.filter((x: INavList) => !hidablelist.some((y) => x.item === y));

  const filteredList =
    loginRole === "SUPER_ADMIN"
      ? getFilteredList(superAdminHideTabs)
      : getFilteredList(adminHideTabs);

  const handleClick = (e: onClick, menu: string) => {
    dispatch(setActiveSearch(false));
    dispatch(setSearchData(undefined));
    dispatch(setSelectedNav(menu));
    if (menu === "Logout") {
      dispatch(logout(mockUserId));
      localStorage.clear();
      history.push("/");
      window.location.reload();
    } else return;
  };

  const getIsActive = (menu: string, collapse?: boolean) => {
    let classname = "";
    classname += menu === selectedNav ? "active" : "";
    classname += collapse ? " submenu-open" : "";
    return classname;
  };

  const getNonCollapsibleList = (navItem: INavList) => {
    const { item, icon, href, Collapse } = navItem;
    return (
      <>
        <li key={item} className={getIsActive(item, Collapse)}>
          <a href={href}>
            <i className="sidebar-icon"> {icon}</i>
            <label
              // onClick={(e) => handleClick(e, item)}
              onClick={() => handleLoginRoute(LoginPage.LOGIN)}
              className={showNavLabel}
            >
              {item}
            </label>
          </a>
        </li>
      </>
    );
  };

  const getCollapsibleList = (navItem: INavList) => {
    return (
      <Fragment key={navItem.item}>
        <li>
          <div className="collapsible-list">
            <i className="sidebar-icon"> {navItem.icon}</i>
            <label
              className={showNavLabel}
              onClick={(e) => handleClick(e, navItem.item)}
            >
              {navItem.item}
            </label>
            {navItem.item !== "Logout" && (
              <IoMdArrowDropdown
                className="sidebar-icon-indicator"
                onClick={() => setOpen(!open)}
              />
            )}
          </div>
        </li>
        {navItem.item !== "Logout" && (
          <Collapse in={open}>
            <div>
              {SubNavList.map((submenu: INavList) => {
                return getNonCollapsibleList(submenu);
              })}
            </div>
          </Collapse>
        )}
      </Fragment>
    );
  };

  return (
    <div className="app-sidebar--content">
      <div className="sidebar-navigation">
        <ul className="nav-list">
          {filteredList.map((navItem: INavList) => {
            return navItem.Collapse
              ? getCollapsibleList(navItem)
              : getNonCollapsibleList(navItem);
          })}
        </ul>
      </div>
    </div>
  );
};
