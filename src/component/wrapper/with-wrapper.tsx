import React from "react";
import { Redirect } from "react-router-dom";
import Layout from "./Layout/Layout";

export const withWrapper = (WrappedComponent: any) => {
  const isAuthenticated = localStorage.getItem("login-email");

  return class extends React.Component {
    render() {
      return (
        <>
          {isAuthenticated ? (
            <Layout>
              <WrappedComponent />
            </Layout>
          ) : (
            <Redirect to="/" />
          )}
        </>
      );
    }
  };
};
