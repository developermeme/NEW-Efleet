import { useState } from "react";
import axios from "axios";
import { Parcel_Configuration } from "../../../../util/configFile";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../../redux/reducer/CombineReducer";
import { onChange } from "../../../../helper/Properties";
import {
  useError,
  usePageLoader,
  useStorageValues,
} from "../../../../hooks/Index";
import { setParcelconfiglist } from "../../../../redux/slice/setting-slice/Slice";

function useParcelConfig() {
  const [loader, showLoader, hideLoader] = usePageLoader() as any;
  const [error, showError] = useError() as any;

  const dispatch = useDispatch();

  const { settingData } = useSelector((state: IRootState) => state);
  const parcelconfiglist = settingData && settingData.parcelconfiglist;

  interface IParcelConfigFields {
    typeofvehicle: undefined | string;
    weight: undefined | string;
  }

  const [fields, setFields] = useState<IParcelConfigFields>({
    typeofvehicle: undefined,
    weight: undefined,
  });

  const fetchParcelDetails = async () => {
    showLoader();
    await axios
      .get(
        `${Parcel_Configuration}/get/rider/parcel/config/hub?hubid=${LoginHubid}`
      )
      .then((response: any) => {
        const res = response.data;
        dispatch(setParcelconfiglist(res));
        hideLoader();
      })
      .catch((error: any) => {
        hideLoader();
        showError(error);
      });
  };

  const parcelConfigDelete = async (rid: number) => {
    let confirmation = window.confirm("Do you want to delete  ParcelConfig ?");
    if (confirmation === true) {
      showLoader();

      await axios
        .post(`${Parcel_Configuration}/delete/rider/parcel/config?id=${rid}`)
        .then(() => {
          fetchParcelDetails();

          hideLoader();
        })
        .catch((error: any) => {
          console.log(error);
          hideLoader();
          showError(error);
        });
    }
  };

  const { LoginHubid } = useStorageValues();

  const handleOnchange = (e: onChange) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setFields({
      ...fields,
      [name]: value,
    });
  };

  const handleaddnewparcel = async (toggleParcelAdd: () => void) => {
    let editRider = { ...fields, hubid: LoginHubid };
    console.log(LoginHubid, "editwcd");
    let errors = "";
    let formIsValid = true;

    Object.entries(fields).map(([key, value]) => {
      if (formIsValid && !value) {
        formIsValid = false;
        errors = `Please enter valid ${key}`;
      }
      return value;
    });

    if (formIsValid) {
      showLoader();

      await axios
        .post(`${Parcel_Configuration}/add/rider/parcel/config`, editRider)
        .then((response: any) => {
          fetchParcelDetails();
          toggleParcelAdd();
          hideLoader();
        })
        .catch((error: any) => {
          console.log(error);
          hideLoader();
          showError("Something Went Wrong");
        });
    } else {
      showError(errors);
    }
  };

  return {
    loader,
    error,
    fields,

    parcelconfiglist,
    setFields,
    handleOnchange,
    fetchParcelDetails,
    parcelConfigDelete,
    handleaddnewparcel,
  };
}

export default useParcelConfig;
