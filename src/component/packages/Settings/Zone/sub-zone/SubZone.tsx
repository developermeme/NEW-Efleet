import { useState, useMemo } from "react";
import useZone from "../useZone";
import { EditIcon, DeleteIcon } from "../../../../../asset/Icons/Icons";
import { TextButton } from "../../../../../ui-kit/TextButton/TextButton.view";
import { SelectedSubZoneEnum } from "../Zone";
import { useDispatch } from "react-redux";
import Pagination from "../../../../../ui-kit/Pagination/pagination";
import { ISubZone } from "../../../../../redux/slice/setting-slice/Types";
import { setSelectedSubZone } from "../../../../../redux/slice/setting-slice/Slice";

const tableHeaders = ["Sid", "Division Name", "Pincode", ""];

interface IProps {
  toggle: (subzone: SelectedSubZoneEnum) => void;
}

function Subzone(props: IProps) {
  const { toggle } = props;
  const { ZoneData, handledeleteSubzone } = useZone();
  const dispatch = useDispatch();

  const ITEMS_PER_PAGE = 5;
  const [totalItems, setTotalItems] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const filteredData = useMemo(() => {
    let computedData: ISubZone[] = ZoneData?.subDivision || [];
    setTotalItems(computedData.length);

    return computedData.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [ZoneData, currentPage]);

  const handleEditSubzone = (subzone: ISubZone) => {
    dispatch(setSelectedSubZone(subzone));
    toggle(SelectedSubZoneEnum.EDIT);
  };

  if (!filteredData?.length) {
    return (
      <h3 className="empty-zone u-h3">
        No Sub Zones Available. Create New Sub Zone
      </h3>
    );
  }

  return (
    <div className="zone-table u-h6">
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
          {filteredData?.map((item: ISubZone) => {
            return (
              <tr key={item.divisionname}>
                <td data-label="Sid">{item.sid || "N/A"}</td>
                <td data-label="Division Name">{item.divisionname || "N/A"}</td>
                <td data-label="Pincode">{item.pincode || "N/A"}</td>
                <td>
                  <div className="button-wrapper">
                    <TextButton
                      items={<EditIcon />}
                      onClick={() => handleEditSubzone(item)}
                    />
                    <TextButton
                      items={<DeleteIcon />}
                      onClick={() => handledeleteSubzone(item.sid)}
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

export default Subzone;
