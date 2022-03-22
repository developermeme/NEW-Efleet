import { DeleteIcon } from "../../../../../asset/Icons/Icons";
import { IZone } from "../../../../../redux/slice/setting-slice/Types";
import { TextButton } from "../../../../../ui-kit/TextButton/TextButton.view";
import useZone from "../useZone";

interface IProps {
  zone: IZone;
}

export const ZoneInfo = (props: IProps) => {
  let tableHeaders = ["Zone Name", "Zone Id"];
  const { handleDelete } = useZone();
  const { zone } = props;

  const isSubDivisionAvailable = zone.subDivision?.length;

  if (!isSubDivisionAvailable) {
    tableHeaders.push("");
  }

  return (
    <div className="zone-table u-h6">
      <table>
        <thead>
          <tr>
            {tableHeaders.map((head: string) => (
              <th key={head}>
                <label>{head}</label>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td data-label="Zone Id">{zone.zoneid || "N/A"}</td>
            <td data-label="Zone Name">{zone.zonename || "N/A"}</td>

            {!isSubDivisionAvailable && (
              <td>
                <TextButton
                  isprimary
                  onClick={() => handleDelete(zone.zoneid)}
                  items={<DeleteIcon />}
                />
              </td>
            )}
          </tr>
        </tbody>
      </table>
    </div>
  );
};
