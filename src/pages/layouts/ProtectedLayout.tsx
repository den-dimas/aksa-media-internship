import { useCookies } from "react-cookie";
import { Outlet } from "react-router";
import Forbidden from "../Forbidden";

export default function ProtectedLayout() {
  const [cookies, _] = useCookies(["token"]);

  if (!cookies.token) return <Forbidden />;
  return <Outlet />;
}
