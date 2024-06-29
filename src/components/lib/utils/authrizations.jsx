import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "./helperfun";

export const DoAuthentication = () => {
  return getToken() ? <Outlet /> : <Navigate to={"/"} />;
};

export const IsAuthenticated = () => {
  return getToken() ? <Navigate to={"/home"} /> : <Outlet />;
};

export const IsProfileCompleted = () => {
  return getToken("is_Profile") ? <Navigate to={"/home"} /> : <Outlet />;
};

export const IsProfileCompleting = () => {
  return getToken("is_Profile") ? <Outlet /> : <Navigate to={"/profile"} />;
};
