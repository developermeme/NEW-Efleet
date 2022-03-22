import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Container } from "react-bootstrap";
import DataTable from "./Data-Table/DataTable";
import {
  useError,
  usePageLoader,
  useStorageValues,
} from "../../../hooks/Index";
import Modal from "../../../ui-kit/modal/modal";
import FileUpload from "./Data-Import/File-Upload";
import { PackageServices } from "../../../util/API";
import { formatDate } from "../../../helper/Script";
import { onClick } from "../../../helper/Properties";
import { DataPicker } from "./Data-Picker/DataPicker";
import { setFileData } from "../../../redux/slice/package-slice/Slice";
import { TextButton } from "../../../ui-kit/TextButton/TextButton.view";
import "./receivedpackages.scss";

enum Page {
  UPLOAD_DATA = "upload",
  GET_DATA = "get",
}

export default function Receivedpackages() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedView, setSelectedView] = useState<Page>();
  const [loader, showLoader, hideLoader] = usePageLoader() as any;
  const [error, showError] = useError() as any;
  const dispatch = useDispatch();
  const { LoginHubid } = useStorageValues() as any;

  const handleClose = () => {
    setOpenModal(!openModal);
  };

  const handleOnClick = (e: onClick, name: Page) => {
    e.preventDefault();
    setSelectedView(name);
    setOpenModal(!openModal);
  };

  const getData = useCallback(async (data: any) => {
    showLoader();
    await PackageServices.getPackegeFileMode(data)
      .then((response: any) => {
        hideLoader();
        dispatch(setFileData(response.data));
      })
      .catch((error) => showError(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGetData = (selectedDate: any) => {
    getData({
      hubid: LoginHubid,
      date: selectedDate,
    });
    handleClose();
  };

  useEffect(() => {
    const data = { hubid: LoginHubid, date: formatDate(new Date()) };
    getData(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loader) {
    return loader;
  }

  if (error) {
    return error;
  }

  return (
    <Container fluid className="packages-data">
      <div className="button-group">
        <TextButton
          isprimary={true}
          items="Upload File"
          onClick={(e: any) => {
            handleOnClick(e, Page.UPLOAD_DATA);
          }}
        />
        <TextButton
          isSecondary={true}
          items="Get Packages"
          onClick={(e: any) => {
            handleOnClick(e, Page.GET_DATA);
          }}
        />
      </div>

      <Modal onClose={handleClose} visibilty={openModal}>
        {selectedView === Page.UPLOAD_DATA ? (
          <FileUpload onCancel={handleClose} />
        ) : (
          <DataPicker handleGetData={handleGetData} />
        )}
      </Modal>
      <DataTable />
    </Container>
  );
}
