import { useEffect, useMemo, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import useVehile from "../../useVehile";
import { EditIcon, DeleteIcon } from "../../../../asset/Icons/Icons";
import { TextButton } from "../../../../ui-kit/TextButton/TextButton.view";
import { IVehicle } from "../../../../redux/slice/vehicle-slice/Types";
import Card from "../../../../ui-kit/card/card";
import useDebounce from "../../../../hooks/useDebounce";
import Pagination from "../../../../ui-kit/Pagination/pagination";
import "./Style.scss";

const tableHeaders = [
  "VEHICLE ID",
  "CHASSISS NUMBER",
  "MODEL",
  "HUB NAME",
  "VEHICLE TYPE",
  "Status",
  "",
  "",
];

function TableView() {
  const {
    vehicleList,
    searchValue,
    selectedFilters,
    handleVehicleDetailClick,
    handleDeleteVehicle,
  } = useVehile();

  const ITEMS_PER_PAGE = 7;

  const [totalItems, setTotalItems] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
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
    let computedData: IVehicle[] = vehicleList || [];

    const selectedType = selectedFilters?.type || [];
    const selectedStatus = selectedFilters?.status || [];

    if (selectedType?.length) {
      computedData = [...computedData].filter(({ vehicleType }) =>
        selectedType.some(
          (filter: string) =>
            vehicleType?.toLowerCase() === filter?.toLowerCase()
        )
      );
    }

    if (selectedStatus?.length) {
      computedData = [...computedData].filter(
        ({ vehicleStatus }) => vehicleStatus === selectedStatus[0]
      );
    }

    if (search) {
      computedData = [...computedData].filter(
        (vehicle: IVehicle) =>
          vehicle.hubName?.toLowerCase().includes(search.toLowerCase()) ||
          vehicle.vehicleType?.toLowerCase().includes(search.toLowerCase())
      );
    }

    setTotalItems(computedData.length);

    //Current Page slice+
    return computedData.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [vehicleList, currentPage, search, selectedFilters]);

  if (!filteredData?.length) {
    return (
      <Card>
        <h3 className="no-vehicles u-h3">No Vehicle Available</h3>
      </Card>
    );
  }

  return (
    <div className="vehicle-table">
      <table>
        <thead>
          <tr>
            {tableHeaders.map((item: string) => (
              <th key={item}>
                <label>{item}</label>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData?.map((item: IVehicle) => {
            return (
              <tr key={item.vehicleId}>
                <td data-label="Veh Id">{item.vehicleId || "N/A"}</td>
                <td data-label="Chassiss No">{item.chassisNumber || "N/A"}</td>
                <td data-label="Model">{item.model || "N/A"}</td>
                <td data-label="Hub Name">{item.hubName || "N/A"}</td>
                <td data-label="Vehicle Type">{item.vehicleType || "N/A"}</td>
                <td data-label="Status">{item.vehicleStatus || "N/A"}</td>
                <td
                  onClick={() => {
                    handleVehicleDetailClick(item);
                  }}
                >
                  <FiArrowRight />
                </td>
                <td>
                  <div className="button-wrapper">
                    <TextButton
                      items={<EditIcon />}
                      // onClick={() => handleEditSubzone(item)}
                    />
                    <TextButton
                      items={<DeleteIcon />}
                      onClick={() => handleDeleteVehicle(item.vehicleId)}
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={totalItems}
        pageSize={ITEMS_PER_PAGE}
        onPageChange={(page: any) => setCurrentPage(page)}
      />
    </div>
  );
}

export default TableView;
