import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import Dashboard from "../Dashboard/Dashboard/Dashboard";
import Subscriptions from "../Dashboard/Subscriptions/Subscriptions";
import AddSubscription from "../Dashboard/AddSubscription/AddSubscription";
import EditSubscription from "../Dashboard/EditSubscription/EditSubscription";
import Services from "../Dashboard/Services/Services";
import Profile from "../Dashboard/Profile/Profile";

const router = createBrowserRouter([
  {
    path: "/dashboard",
    Component: Root,
    children: [
      { index: true, Component: Dashboard },
      { path: "subscriptions", Component: Subscriptions },
      { path: "add-subscription", Component: AddSubscription },
      { path: "edit-subscription", Component: EditSubscription },
      { path: "services", Component: Services },
      { path: "profile", Component: Profile },
    ],
  },
]);


export default router;
