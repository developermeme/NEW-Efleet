import React, { useEffect, useMemo, useState } from "react";
import { LocationIcon } from "../../../asset/Icons/Icons";
import User from "../../../asset/Images/user.svg";
import useRiders from "../useRiders";
import Card from "../../../ui-kit/card/card";
import { useDebounce } from "../../../hooks/Index";
import Pagination from "../../../ui-kit/Pagination/pagination";
import {
  IRiderDetail,
  RiderEnum,
} from "../../../redux/slice/riders-slice/Types";

interface IProps {
  selectedRidersView: RiderEnum;
  ridersList: IRiderDetail[] | null;
  searchValue: string | number | undefined;
}

export const RidersCollection: React.FC<IProps> = (props: IProps) => {
  const { selectedRidersView, ridersList, searchValue } = props;

  const { handleRiderDetails } = useRiders();

  const [totalItems, setTotalItems] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");

  const ITEMS_PER_PAGE = 7;
  const debouncedSearchTerm = useDebounce<string>(searchValue as string, 500);

  // Setting Search Value In Local State
  useEffect(() => {
    if (debouncedSearchTerm) {
      setSearch(debouncedSearchTerm);
      setCurrentPage(1);
    } else {
      setSearch("");
    }
  }, [debouncedSearchTerm]);

  const filteredData = useMemo(() => {
    let computedData = ridersList || [];

    if (selectedRidersView !== RiderEnum.ALL_RIDERS) {
      computedData = computedData?.filter(
        (item: IRiderDetail) => item.riderStatus === selectedRidersView
      );
    }

    if (search) {
      computedData = [...computedData].filter(
        (rider: IRiderDetail) =>
          rider.userName?.toLowerCase().includes(search.toLowerCase()) ||
          rider.hubName?.toLowerCase().includes(search.toLowerCase())
      );
    }

    setTotalItems(computedData.length);

    //Current Page slice+
    return computedData.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [selectedRidersView, ridersList, currentPage, search]);

  let ridersCard;

  if (!filteredData?.length) {
    return (
      <Card>
        <h3 className="no-riders u-h3">No Riders Available</h3>
      </Card>
    );
  }

  ridersCard = filteredData.map((rider: IRiderDetail) => {
    return (
      <div
        className="rider-item"
        key={rider.userName}
        onClick={(e) => handleRiderDetails(e, rider)}
      >
        <div className="rider-item-col">
          <img
            src={rider.img_url || User}
            alt="rider img"
            className="rider-avathar"
          />
        </div>
        <div className="rider-item-col">
          <h3 className="u-h4">{rider.userName}</h3>
          <span className={rider.riderStatus?.toLowerCase()}>
            <LocationIcon /> {rider.hubName}
          </span>
        </div>
      </div>
    );
  });

  return (
    <section>
      <div className="rider-container">{ridersCard}</div>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={totalItems}
        pageSize={ITEMS_PER_PAGE}
        onPageChange={(page: any) => setCurrentPage(page)}
      />
    </section>
  );
};
