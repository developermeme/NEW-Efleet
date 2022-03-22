import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Parcel_Configuration } from "../../../../util/configFile";
import { IRootState } from "../../../../redux/reducer/CombineReducer";
import { SelectedSubZoneEnum } from "./Zone";
import { settingservices } from "../../../../util/API";
import {
  addSubdivisionAPI,
  updateSubdivisionAPI,
} from "../../../../util/APIEndPoint";
import {
  useStorageValues,
  usePageLoader,
  useError,
} from "../../../../hooks/Index";
import { validateName } from "../../../userAccounts/Login/Script";
import { onChange } from "../../../../helper/Properties";
import { setZoneData } from "../../../../redux/slice/setting-slice/Slice";

function useZone() {
  const { LoginHubid } = useStorageValues();

  const [loader, showLoader, hideLoader] = usePageLoader() as any;
  const [error, showError] = useError() as any;

  const dispatch = useDispatch();

  const { settingData } = useSelector((state: IRootState) => state);
  const ZoneData = settingData && settingData.ZoneData;
  const selectedSubZone = settingData && settingData.selectedSubZone;

  const initialValues = {
    divisionname: "",
    pincode: "",
  };

  const [zonename, setzonename] = useState<undefined | string>();
  const [subzoneData, setSubzoneData] = useState(initialValues);

  const handleZoneOnchange = (e: onChange) => {
    setzonename(e.target.value);
  };

  const handleSubzonechange = (e: onChange) => {
    const name = e.target.name;
    const value = e.target.value;
    setSubzoneData({
      ...subzoneData,
      [name]: value,
    });
  };

  // Zone APIS

  const fetchzoneDetails = async () => {
    showLoader();
    await axios
      .get(`${Parcel_Configuration}/get/zone/hubid?hubid=${LoginHubid}`)
      .then((response: any) => {
        const res = response.data;
        dispatch(setZoneData(res));
        hideLoader();
      })
      .catch((error: any) => {
        hideLoader();
        showError("Something Went Wrong");
      });
  };

  const handleDelete = async (zoneid: any) => {
    let confirmation = window.confirm("Are you want to delete the zone ?");
    if (confirmation === true) {
      await axios
        .post(`${Parcel_Configuration}/delete/zone?id=${zoneid}`)
        .then((response: any) => {
          fetchzoneDetails();
          hideLoader();
        })
        .catch((error: any) => {
          hideLoader();
          showError("Something Went Wrong");
        });
    } else {
      console.log("false");
    }
  };

  const handleAddNewZone = async (onHide: () => void) => {
    let newZone = { hubid: LoginHubid, zonename: zonename };

    const isValidZoneName = validateName(zonename, "zone name");

    if (zonename && isValidZoneName.formIsValid) {
      showLoader();

      settingservices
        .addNewZone(newZone)
        .then((response: any) => {
          fetchzoneDetails();
          onHide();
          hideLoader();
        })
        .catch((error: any) => {
          hideLoader();
          showError("Something Went Wrong");
        });
    } else {
      showError(isValidZoneName.error);
    }
  };

  // Subzone APIS

  const handleaddnewzone = async (
    fields: any,
    toggle: () => void,
    zoneview: SelectedSubZoneEnum
  ) => {
    let newSubZone = {
      "zoneid.zoneid": ZoneData?.zoneid,
      sid: selectedSubZone?.sid,
      ...fields,
    };
    let errors = "";
    let formIsValid = true;

    const urlKey =
      zoneview === SelectedSubZoneEnum.ADD
        ? addSubdivisionAPI
        : updateSubdivisionAPI;

    Object.entries(fields).map(([key, value]) => {
      if (formIsValid && !value) {
        formIsValid = false;
        errors = `Please enter valid ${key}`;
      }
      return value;
    });

    if (formIsValid) {
      showLoader();
      settingservices
        .addSubzone(newSubZone, urlKey)
        .then((response: any) => {
          toggle();
          hideLoader();
          fetchzoneDetails();
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

  const handledeleteSubzone = async (id: number) => {
    showLoader();
    await settingservices
      .deleteSubdivision({
        id,
      })
      .then((response: any) => {
        hideLoader();
        fetchzoneDetails();
      })
      .catch((error: any) => {
        hideLoader();
        showError("Something Went Wrong");
      });
  };

  return {
    error,
    loader,
    ZoneData,
    zonename,
    selectedSubZone,
    subzoneData,

    handleDelete,
    handleAddNewZone,
    handleZoneOnchange,
    handleSubzonechange,
    fetchzoneDetails,
    handleaddnewzone,
    handledeleteSubzone,
  };
}

export default useZone;
