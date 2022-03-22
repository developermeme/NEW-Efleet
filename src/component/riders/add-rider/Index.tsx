import AddRiderForm from "./AddRiderForm";
import useRiders from "../useRiders";
import { GoBackIcon } from "../../../asset/Icons/Icons";
import { TextButton } from "../../../ui-kit/TextButton/TextButton.view";
import "./Style.scss";

interface IProps {
  isEditable?: boolean;
}

export const AddRider = (props: IProps) => {
  const { handleGoBack } = useRiders();

  const { isEditable } = props;

  return (
    <div className="add_rider_container">
      {!isEditable && (
        <div className="add-rider-topnav">
          <TextButton
            onClick={handleGoBack as any}
            className="btn-goback"
            items={
              <>
                <GoBackIcon /> Go Back
              </>
            }
          />
        </div>
      )}
      <AddRiderForm isEditable={isEditable} />
    </div>
  );
};
