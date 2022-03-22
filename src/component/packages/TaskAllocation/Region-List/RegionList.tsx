import React from "react";
import Pagination from "../../../../ui-kit/Pagination/pagination";

import { ISpilltedPackages } from "../taskallocation";
import { RegionItem } from "./RegionItem";
import "./RegionList.scss";

interface IProps {
  filteredPackages: ISpilltedPackages[] | undefined;
  ItemsPerPage: number;
  currentPage: number;
  totalItems: number;
  handlePageChange: (page: number) => void;
  getRiders: () => void;
  getAllocatedRiders: (subid: string, hubid: string) => void;
}

export const RegionList = (props: IProps) => {
  const {
    filteredPackages,
    ItemsPerPage,
    currentPage,
    totalItems,
    handlePageChange,
    getRiders,
    getAllocatedRiders,
  } = props;

  const filteredData = filteredPackages?.filter(
    (item: ISpilltedPackages) => item.packags.length > 0
  );

  return (
    <React.Fragment>
      <section className="regions-list">
        <div className="container">
          {filteredData &&
            filteredData.map((item: ISpilltedPackages, index: number) => {
              return (
                <RegionItem
                  key={index}
                  item={item}
                  getRiders={getRiders}
                  getAllocatedRiders={getAllocatedRiders}
                />
              );
            })}
        </div>
      </section>
      {filteredData && filteredData?.length > ItemsPerPage && (
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={totalItems}
          pageSize={ItemsPerPage}
          onPageChange={handlePageChange}
        />
      )}
    </React.Fragment>
  );
};
