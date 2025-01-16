import { NavLink } from "react-router";

export default function Forbidden() {
  return (
    <div id="forbidden" className="w-screen h-screen bg-cream dark:bg-dark-purple flex-center text-center">
      <h1>
        You need to{" "}
        <NavLink to="/auth/login" className="bg-dark-blue dark:bg-cream text-cream dark:text-dark-purple px-2 pb-0.5">
          Login
        </NavLink>{" "}
        <br />
        to Access this Page
      </h1>
    </div>
  );
}
