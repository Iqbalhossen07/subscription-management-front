import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import Dashboard from "../Dashboard/Dashboard/Dashboard";
import Subscriptions from "../Dashboard/Subscriptions/Subscriptions";
import AddSubscription from "../Dashboard/AddSubscription/AddSubscription";
import EditSubscription from "../Dashboard/EditSubscription/EditSubscription";
import Services from "../Dashboard/Services/Services";
import Profile from "../Dashboard/Profile/Profile";
import AuthLayout from "../Auth/AuthLayout";
import Login from "../Auth/Login/Login";
import Register from "../Auth/Register/Register";

const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <Root />, // এখানে Component এর বদলে element ব্যবহার করা আধুনিক প্র্যাকটিস
    children: [
      { index: true, element: <Dashboard /> },
      { path: "subscriptions", element: <Subscriptions /> },
      { path: "add-subscription", element: <AddSubscription /> },
      { path: "edit-subscription", element: <EditSubscription /> },
      { path: "services", element: <Services /> },
      { path: "profile", element: <Profile /> },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />, // এখানে Sidebar/Topbar ছাড়া আলাদা লেআউট হবে
    children: [
      { index: true, element: <Login /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
]);


export default router;
