import { useContext } from "react";
import { RegisterPage, ValidationContext } from "../../../context/ValidationContext";

import "./Register.scss";

function Register() {
  const { registerComponent, activeRegPage } = useContext(
    ValidationContext
  ) as any;

  let progressClass =
    activeRegPage === RegisterPage.USERFORM
      ? "Progress1"
      : activeRegPage === RegisterPage.HUBFORM
      ? "Progress2"
      : "Progress3";

  const stepCols = ["User", "Hub", "Docs"];

  const last = progressClass.charAt(progressClass.length - 1);

  const stepper = (
    <div className={`step-row `}>
      <div id="progress" className={progressClass}></div>
      {stepCols.map((item: string, index: number) => {
        const activeStep = (index + 1).toString() === last && "active-step";
        return (
          <div className={`step-col ${activeStep}`} key={item}>
            {item}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="register-container u-h5">
      <div className="rcontainer">
        {stepper}
        {registerComponent}
      </div>
    </div>
  );
}

export default Register;
