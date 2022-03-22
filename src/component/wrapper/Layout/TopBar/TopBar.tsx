import React, { useState, useRef, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import MenuIcon from "../../../../asset/Icons/MenuIcon";
import SearchIcon from "../../../../asset/Icons/SearchIcon";
import { onClick } from "../../../../helper/Properties";
import { useOnClickOutside } from "../../../../hooks/Index";
import { IRootState } from "../../../../redux/reducer/CombineReducer";
import user from "../../../../asset/Images/user.svg";
import "./TopBar.scss";
import Search from "../../../../ui-kit/Search";
import { setActiveSearch } from "../../../../redux/slice/nav-slice/Slice";
import { useHistory } from "react-router-dom";
import { LoginPage } from "../../../../context/ValidationContext";
import { useValidationInfoContext } from "../../../../context/ValidationContext";

interface IProps {
  handleMenuClick: (e: onClick) => void;
}

export const TopBar: React.FC<IProps> = (props: IProps) => {
  const { handleMenuClick } = props;
  const { navData } = useSelector((state: IRootState) => state);
  const activeSearch = navData && navData.activeSearch;

  const popupRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();
  const { handleLoginRoute } = useValidationInfoContext();

  const [isShown, setIsShown] = useState(false);
  const history = useHistory();

  const handleToggleButtonClick = () => {
    if (isShown) return;
    setIsShown(true);
  };

  const handleCloseButtonClick = () => {
    setIsShown(false);
  };

  const searchIconClick = () => {
    dispatch(setActiveSearch(!activeSearch));
  };

  const handleUpdatePwdOnClick = (e: onClick) => {
    e.preventDefault();
    history.push("/");
    handleLoginRoute(LoginPage.UPDATEPASSWORD);
  };

  const handleHubDetailsClick = (e: onClick) => {
    e.preventDefault();
    history.push("/Hubs");
  };

  useOnClickOutside(popupRef, handleCloseButtonClick);

  const PopupMenu = () => {
    return (
      <div className={`popup-menu ${isShown ? "shown" : ""}`} ref={popupRef}>
        <div onClick={handleUpdatePwdOnClick}>Update Password</div>

        <div onClick={handleHubDetailsClick}>View Profile</div>
      </div>
    );
  };

  return (
    <div className="app-header">
      {activeSearch ? (
        <div className="search-header">
          <Search onSearch={() => {}} isvisibleClose={true} />
        </div>
      ) : (
        <Fragment>
          <div className="app-header--pane">
            <div
              className="toggle-mobile-sidebar-btn menu-button"
              onClick={handleMenuClick}
            >
              <MenuIcon />
            </div>
          </div>

          <div className="app-header--pane menu-list-icons">
            <div className="menu-button" onClick={searchIconClick}>
              <SearchIcon />
            </div>

            <div className="menu-button" onClick={handleToggleButtonClick}>
              <img src={user} alt="User" />

              <PopupMenu />
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};
