
import * as React from "react";
import { Route } from "react-router";

import RoutesData, { IRoutesData } from "./RoutesData";

/**
 * Responsible for rendering the component as per route path
 */
export const Routes: React.FC = () => {
  return (
    <React.Fragment>
      {RoutesData.map((route: IRoutesData, index: number) => (
        <Route
        key={index}
        exact={true}
        path={route.path}
        component={route.component}
        />
      ))}
    </React.Fragment>
  );
};
