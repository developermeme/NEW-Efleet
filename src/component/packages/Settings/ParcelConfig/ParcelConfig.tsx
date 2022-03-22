import useParcelConfig from "./useParcelConfig";
import "./ParcelConfig.scss";
import { DeleteIcon } from "../../../../asset/Icons/Icons";
import { IParcelConfig } from "../../../../redux/slice/setting-slice/Types";

export const ParcelConfig = () => {
  const { parcelconfiglist, loader, error, parcelConfigDelete } =
    useParcelConfig();

  if (loader) {
    return loader;
  }

  if (error) {
    return error;
  }

  return (
    <>
      <div className="parcel-config-list">
        {parcelconfiglist?.map((item: IParcelConfig, index: number) => (
          <div key={index}>
            <div className="parcel-config-card">
              <div className="parcel-config-item-col">
                <span>WEIGHT - {item.weight}</span>
                <span>HUBID - {item.hubid}</span>
                <span>VEHICLE TYPE - {item.typeofvehicle}</span>
              </div>
              <div className="parcel-config-item-col">
                <div
                  className="rounded-circle"
                  onClick={() => parcelConfigDelete(item.rid)}
                >
                  <DeleteIcon />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
