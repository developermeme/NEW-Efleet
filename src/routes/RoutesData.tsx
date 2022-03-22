import React from "react";
import { RouteComponentProps } from "react-router";
import NotFound from "../pages/NotFound";
import Riders from "../component/riders";
// import Maps from "../component/maps/Maps";
import { Hubs } from "../component/hubs/Index";
import Support from "../component/support/Index";
import PaymentView from "../component/payments/payment";
import ItSupport from "../component/ItSupport/itsupport";
import VehicleDetails from "../component/vehiclsdetails/Index";
import { withWrapper } from "../component/wrapper/with-wrapper";
import SettingView from "../component/packages/Settings/Setting";
import Login from "../component/userAccounts/Login/LoginWrapper";
import Register from "../component/userAccounts/Register/Register";
import Updateformula from "../component/payments/PaymentFormula/Index";
import { TaskAllocation } from "../component/packages/TaskAllocation/taskallocation";
import Receivedpackages from "../component/packages/ReceivedPackages/receivedpackages";
import { TaskView } from "../component/riders/riders-details/task-view/TaskView";
import Home from "../component/maps/maps_copy/homePage";


export interface IRoutesData {
  /**
   * Should be displayed on the home page
   */
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
  /**
   * Should be displayed on the home page
   */

  path: string;
}

const RoutesData: IRoutesData[] = [
  {
    component: Login,
    path: "/",
  },
  {
    component: Register,
    path: "/Register",
  },
  {
    component: withWrapper(() => <Home />),
    path: "/Home",
  },
  {
    component: withWrapper(() => <VehicleDetails />),
    path: "/Vehicletable",
  },
  {
    component: withWrapper(() => <Riders />),
    path: "/Riders",
  },
  {
    component: withWrapper(() => <Hubs />),
    path: "/Hubs",
  },

  {
    component: withWrapper(() => <TaskAllocation />),
    path: "/Taskallocation",
  },
  {
    component: withWrapper(() => <Receivedpackages />),
    path: "/Receivedpackages",
  },
  {
    component: withWrapper(() => <SettingView />),
    path: "/Setting",
  },
  {
    component: withWrapper(() => <PaymentView />),
    path: "/Payment",
  },
  {
    component: withWrapper(() => <Updateformula />),
    path: "/Updateformula",
  },
  {
    component: withWrapper(() => <TaskView />),
    path: "/Taskview",
  },
  {
    component: withWrapper(() => <Support />),
    path: "/Support",
  },
  {
    component: withWrapper(() => <ItSupport />),
    path: "/ItSupport",
  },
  {
    component: NotFound,
    path: "/error",
  },
];

export default RoutesData;
