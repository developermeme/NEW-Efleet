import React, { useState } from "react";
import { useDispatch } from "react-redux";
import useError from "../../../../hooks/useError";
import useNotify from "../../../../hooks/useNotify";
import { useStorageValues } from "../../../../hooks/useLocalStorage";
import { TextButton } from "../../../../ui-kit/TextButton/TextButton.view";
import { PackageServices } from "../../../../util/API";
import "./Style.scss";
import { setFileData } from "../../../../redux/slice/package-slice/Slice";

interface IProps {
  onCancel: () => void;
}

const FileUpload: React.FC<IProps> = (props: IProps): JSX.Element => {
  const { onCancel } = props;

  const [selectedFile, setSelectedFile] = useState<any>();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [error, showError, hideError] = useError() as any;
  const [status, setStatus, hidestatus] = useNotify() as any;
  const dispatch = useDispatch();
  const { LoginHubid } = useStorageValues();
  const loginId: any = LoginHubid;
  const changeHandler = (event: any) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const uploadFile = async () => {
    hideError();

    hidestatus();
    setStatus("Updating...");

    const formData = new FormData();

    formData.append("hubid", loginId);
    formData.append("file", selectedFile);

    console.log(formData);

    await PackageServices.addPackageFile(formData)
      .then((response: any) => {
        setStatus("File Upload Successfully");
        dispatch(setFileData(response.data));
      })
      .catch((error) => showError(error));
  };
  const handleSubmission = (e: any) => {
    e.preventDefault();
    if (isFilePicked) {
      uploadFile();
    }
  };

  const handleCancel = (e: any) => {
    e.preventDefault();
    onCancel();
  };

  return (
    <React.Fragment>
      <div className="file-upload">
        <div className="file-select">
          <div className="file-select-button" id="fileName">
            Choose File
          </div>
          <div className="file-select-name" id="noFile">
            {selectedFile ? selectedFile.name : " No file chosen..."}
          </div>
          <input
            type="file"
            name="chooseFile"
            id="chooseFile"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            onChange={changeHandler}
          />
        </div>
        {error && error}
        {!error && status && status}
      </div>
      <div className="file-button-container">
        <TextButton
          items="Save"
          onClick={handleSubmission}
          className="button"
          isprimary={true}
        />
        <TextButton
          items="Cancel"
          className="button"
          isSecondary={true}
          onClick={handleCancel}
        />
      </div>
    </React.Fragment>
  );
};

export default FileUpload;
