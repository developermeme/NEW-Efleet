import { useContext } from "react";
import { ValidationContext } from "../../../context/ValidationContext";

const Login = () => {
  const { loginComponent } = useContext(ValidationContext) as any;

  return loginComponent;
};

export default Login;
