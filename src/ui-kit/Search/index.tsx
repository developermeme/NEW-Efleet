import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import CloseIcon from "../../asset/Icons/CloseIcon";
import SearchIcon from "../../asset/Icons/SearchIcon";
import {
  setActiveSearch,
  setSearchData,
} from "../../redux/slice/nav-slice/Slice";
import "./Style.scss";

interface IProps {
  onSearch: (value: string) => void;
  classname?: string;
  isvisibleClose?: boolean;
}

const Search = (props: IProps) => {
  const { onSearch, classname, isvisibleClose } = props;
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const onInputChange = (value: string) => {
    setSearch(value);
    onSearch(value);
  };

  useEffect(() => {
    dispatch(setSearchData(search));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const searchIconClick = () => {
    dispatch(setActiveSearch(false));
    dispatch(setSearchData(""));
  };

  return (
    <form className={`search-form ${classname}`}>
      <button type="submit" className="submit-btn">
        <SearchIcon />
      </button>
      <input
        type="text"
        placeholder="Search..."
        className="form-input"
        value={search}
        onChange={(e) => onInputChange(e.target.value)}
      />
      {isvisibleClose && (
        <button
          type="submit"
          className="submit-btn close-icon"
          onClick={searchIconClick}
        >
          <CloseIcon />
        </button>
      )}
    </form>
  );
};

export default Search;
