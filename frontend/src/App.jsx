import { Routes, Route, Outlet, Navigate } from "react-router-dom";

import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { useEffect } from "react";

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route
          path="/signin"
          element={
            <AuthRedirect>
              <Signin />
            </AuthRedirect>
          }
        />
        <Route
          path="/signup"
          element={
            <AuthRedirect>
              <Signup />
            </AuthRedirect>
          }
        />
      </Routes>
    </>
  );
};

export default App;

const PrivateRoutes = () => {
  let isAuthenticated = localStorage.getItem("token");
  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />;
};
const AuthRedirect = ({ children }) => {
  let isAuthenticated = localStorage.getItem("token");

  return isAuthenticated ? <Navigate to="/dashboard" /> : children;
};
