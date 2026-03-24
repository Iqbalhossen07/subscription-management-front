// src/PrivateRoute/PrivateRoute.jsx
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("userToken");
  return token ? children : <Navigate to="/auth/login" replace />;
};

export default PrivateRoute;
