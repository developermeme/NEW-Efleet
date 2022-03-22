import React, { useContext, createContext } from "react";
import OTPVerify from "../component/userAccounts/Login/OTPVerify";
import EmailVerify from "../component/userAccounts/Login/EmailVerify";
import AccountLogin from "../component/userAccounts/Login/AccountLogin";
import PasswordReset from "../component/userAccounts/Login/PasswordReset";
import { HubForm } from "../component/userAccounts/Register/forms/HubForm";
import { UserForm } from "../component/userAccounts/Register/forms/UserForm";
import { DocumentForm } from "../component/userAccounts/Register/forms/DocumentForm";

export const ValidationContext = createContext({});

export enum LoginPage {
  LOGIN,
  EMAIL,
  OTP,
  PASSWORD,
  UPDATEPASSWORD,
}

export enum RegisterPage {
  USERFORM,
  HUBFORM,
  DOCUMENTFORM,
}

export type registerInput = {
  id: number;
  name: string;
  type: string;
  text: string;
  value: string | undefined | any;
  accept?: string;
};

export const ValidationContextProvider = function ({ children }: any) {
  const [activeLoginPage, setActiveLoginPage] = React.useState(LoginPage.LOGIN);
  const [activeRegPage, setActiveRegPage] = React.useState(
    RegisterPage.USERFORM
  );

  const handleRegisterRoute = (page: RegisterPage) => {
    setActiveRegPage(page);
  };

  const handleLoginRoute = (page: LoginPage) => {
    setActiveLoginPage(page);
  };

  const getLoginComponent = () => {
    let component;
    switch (activeLoginPage) {
      case LoginPage.LOGIN: {
        component = <AccountLogin />;
        break;
      }
      case LoginPage.EMAIL: {
        component = <EmailVerify />;
        break;
      }
      case LoginPage.OTP: {
        component = <OTPVerify />;
        break;
      }
      case LoginPage.PASSWORD:
      case LoginPage.UPDATEPASSWORD:
        component = <PasswordReset />;
        break;

      default:
        component = <AccountLogin />;
        break;
    }
    return component;
  };

  const getRegisterComponent = () => {
    let component;
    switch (activeRegPage) {
      case RegisterPage.USERFORM: {
        component = <UserForm />;
        break;
      }
      case RegisterPage.HUBFORM: {
        component = <HubForm />;
        break;
      }
      case RegisterPage.DOCUMENTFORM: {
        component = <DocumentForm />;
        break;
      }
      default:
        component = <UserForm />;
        break;
    }
    return component;
  };

  const loginComponent = getLoginComponent();
  const registerComponent = getRegisterComponent();

  return (
    <ValidationContext.Provider
      value={
        {
          activeRegPage,
          activeLoginPage,
          loginComponent,
          registerComponent,
          handleRegisterRoute,
          handleLoginRoute,
        } as any
      }
    >
      {children}
    </ValidationContext.Provider>
  );
};

export function useValidationInfoContext() {
  const {
    activeRegPage,
    activeLoginPage,
    loginComponent,
    registerComponent,
    handleRegisterRoute,
    handleLoginRoute,
  } = useContext(ValidationContext) as any;
  return {
    activeRegPage,
    activeLoginPage,
    loginComponent,
    registerComponent,
    handleRegisterRoute,
    handleLoginRoute,
  };
}
