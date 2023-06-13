import Cookies from "js-cookie";
import { Outlet, Navigate } from "react-router-dom";
import { isTokenExpired } from "../../utils/functions";
import { USER_TOKEN_COOKIE } from "../../services/user";

export const ProtectedRoutes = () => {
  const token = Cookies.get(USER_TOKEN_COOKIE);

  if (token && !isTokenExpired(token)) {
    return <Outlet />;
  }

  console.log("TOKEN IS NOT PRESENT OR EXPIRED");
  Cookies.remove(USER_TOKEN_COOKIE);
  return <Navigate to="/" exact />;
};
