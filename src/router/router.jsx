import { createBrowserRouter, Navigate } from "react-router";
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

// ✅ আপনার বানানো PrivateRoute ইমপোর্ট করুন (পাথ ঠিক আছে কি না দেখে নিন)
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Subscription_details from "../Dashboard/Subscription-details/Subscription_details";

// 🔓 পাবলিক রাউট গার্ড (এটা এখানেই থাক বা চাইলে এটাও আলাদা ফাইল করতে পারেন)
const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("userToken");
  return token ? <Navigate to="/dashboard" replace /> : children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: "/dashboard",
    element: (
      // 🔒 আপনার বানানো PrivateRoute দিয়ে ড্যাশবোর্ড লক করা হলো
      <PrivateRoute>
        <Root />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "subscriptions", element: <Subscriptions /> },
      { path: "add-subscription", element: <AddSubscription /> },
      { path: "edit-subscription/:id", element: <EditSubscription /> },
      { path: "services", element: <Services /> },
      { path: "profile", element: <Profile /> },
      { path: "subscription-details/:id", element: <Subscription_details /> },
    ],
  },
  {
    path: "/auth",
    element: (
      <PublicRoute>
        <AuthLayout />
      </PublicRoute>
    ),
    children: [
      { index: true, element: <Login /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
]);

export default router;
