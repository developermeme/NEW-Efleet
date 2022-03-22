import { usePwdReset } from "./hooks/usePwdReset";
import "./Style.scss";

export default function PasswordReset() {
  const { handlePasswordChange, handleUpdatePwdOnSubmit, password, pwdError } =
    usePwdReset();

  return (
    <div className="login-container u-h5">
      <div className="wrapper">
        <div className="title u-h3">
          <span>Change Password </span>
        </div>
        {pwdError && (
          <p className="alert alert--error form__alert u-h6">{pwdError}</p>
        )}
        <form action="#">
          <div className="form-row">
            <i className="fas fa-user"></i>
            <input
              type="password"
              name="password"
              value={password.password}
              placeholder="Enter new password"
              onChange={handlePasswordChange}
            />
          </div>
          <div className="form-row">
            <i className="fas fa-user"></i>
            <input
              type="password"
              name="cpassword"
              value={password.cpassword}
              placeholder="Confirm new password"
              onChange={handlePasswordChange}
            />
          </div>
          <button type="submit" onClick={handleUpdatePwdOnSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
