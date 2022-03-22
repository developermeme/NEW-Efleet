import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import Header from "./Header";
import usePageLoader from "../../../../hooks/usePageLoader";
import useDebounce from "../../../../hooks/useDebounce";

import { IRootState } from "../../../../redux/reducer/CombineReducer";

import "./DataTable.scss";
import Pagination from "../../../../ui-kit/Pagination/pagination";
import { IFileData } from "../../../../redux/slice/package-slice/Types";

const DataTable = () => {
  const [tableData, setTableData] = useState<IFileData[]>([]);
  const [loader] = usePageLoader() as any;
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState({ field: "", order: "" });

  const { packageData, navData } = useSelector((state: IRootState) => state);
  const FileData = packageData && packageData.FileData;
  const searchValue = navData && (navData.searchValue as string);

  const debouncedSearchTerm = useDebounce<string>(searchValue, 500);

  useEffect(() => {
    // Make sure we have a value (user has entered something in input)
    if (debouncedSearchTerm) {
      setSearch(debouncedSearchTerm);
      setCurrentPage(1);
    } else {
      setSearch("");
    }
  }, [debouncedSearchTerm]);

  const ITEMS_PER_PAGE = 5;

  const headers = [
    { name: "Pkg.ID", field: "did", sortable: false },
    { name: "Order_No", field: "did", sortable: false },
    { name: "Pkg.Name", field: "itemName", sortable: true },
    { name: "Pkg.Wgt", field: "weight", sortable: false },
    { name: "Address", field: "building", sortable: true },
    { name: "Contact", field: "telephone", sortable: false },
    { name: "Verified-status", field: "status", sortable: true },
    { name: "DeliveredBy", field: "deliveredBy", sortable: true },
  ];

  useEffect(() => {
    if (FileData) setTableData(FileData);
  }, [FileData]);

  const filteredData = useMemo(() => {
    let computedData = tableData;
    if (search) {
      computedData = computedData?.filter(
        (comment: IFileData) =>
          comment.itemName.toLowerCase().includes(search.toLowerCase()) ||
          comment.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
          comment.did.toString().toLowerCase().includes(search.toLowerCase()) ||
          comment.weight.toString().toLowerCase().includes(search.toLowerCase())
      );
    }

    setTotalItems(computedData.length);

    //Sorting comments
    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      computedData = [...computedData].sort(
        (a: any, b: any) =>
          reversed * a[sorting.field].localeCompare(b[sorting.field])
      );
    }

    //Current Page slice
    return computedData.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [tableData, currentPage, search, sorting]);

  const getAddressData = (item: IFileData) => {
    const addressData = [item.building, item.street, item.city, item.postcode];
    const Address = addressData.map((x) => (
      <div className="mb10" key={x}>
        {x}
      </div>
    ));
    return Address;
  };

  return (
    <div>
      {loader}
      {/* <section className="search">
        <Search
          onSearch={(value: string) => {
            setSearch(value);
            setCurrentPage(1);
          }}
        />
      </section> */}
      <section className="data-table">
        <table>
          <Header
            headers={headers}
            onSorting={(field: any, order: any) => setSorting({ field, order })}
          />
          <tbody>
            {filteredData.map((comment: IFileData) => (
              <tr key={comment.did}>
                <td data-label={headers[0].name}>{comment.did}</td>
                <td data-label={headers[0].name}>{comment.orderNumber}</td>
                <td data-label={headers[1].name}>{comment.itemName || "-"}</td>
                <td data-label={headers[2].name}>{comment.weight}</td>
                <td data-label={headers[3].name}>{getAddressData(comment)}</td>
                <td data-label={headers[4].name}>{comment.telephone}</td>
                <td data-label={headers[5].name}>{comment.status}</td>
                <td data-label={headers[6].name}>
                  {comment.deliveredBy || "Not Assigned"}
                </td>
              </tr>
            ))}
            {!filteredData?.length && (
              <tr className="empty-data">
                <td>No Data Available</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={totalItems}
        pageSize={ITEMS_PER_PAGE}
        onPageChange={(page: any) => setCurrentPage(page)}
      />
    </div>
  );
};

export default DataTable;
