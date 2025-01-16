import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router";

import { navLinks } from "../../constants";
import Dropdown from "../Dropdown";
import { getSystemTheme } from "../../utils";

type ThemeList = "dark" | "light" | "os";

export default function NavBar() {
  const [themeState, setThemeState] = useState<ThemeList>((localStorage.getItem("theme") as ThemeList) || "light");
  const [currentTheme, setCurrentTheme] = useState(themeState == "os" ? getSystemTheme() : themeState);

  function switchTheme(theme: ThemeList) {
    setThemeState(theme);
    localStorage.setItem("theme", theme);
  }

  useEffect(() => {
    if (themeState == "os") {
      setCurrentTheme(getSystemTheme());

      const sysTheme = window.matchMedia("(prefers-color-scheme: dark)");
      const sysChange = (e: MediaQueryListEvent) => setCurrentTheme(e.matches ? "dark" : "light");

      sysTheme.addEventListener("change", sysChange);

      return () => sysTheme.removeEventListener("change", sysChange);
    } else {
      setCurrentTheme(themeState);
    }
  }, [themeState]);

  useEffect(() => {
    if (currentTheme == "dark") document.body.classList.add("dark");
    if (currentTheme == "light") document.body.classList.remove("dark");
  }, [currentTheme]);

  const path = useLocation().pathname;
  if (path.includes("/auth")) return;

  return (
    <nav
      id="navigation-bar"
      className="flex items-center justify-between h-[var(--nav-h)] py-2 px-4 sticky top-0 bg-dark-blue text-cream dark:bg-dark-purple z-10"
    >
      <NavLink to="/">
        <h1 className="font-black text-3xl tracking-tighter">Aksa Media</h1>
      </NavLink>

      <div className="flex gap-4">
        {/* Main Routes */}
        <ul id="nav-list-parent" className="flex items-center gap-2">
          {navLinks.map((p, i) => (
            <li key={i}>
              <NavLink
                to={p.rute}
                className={({
                  isActive,
                  isTransitioning,
                }) => `text-xl px-2 pb-0.5 tracking-tighter text-center ease-in-out duration-300 relative font-medium hover-effect
                ${isActive ? "before:w-full text-black " : ""}
                ${isTransitioning ? "before:rounded-lg" : ""}
                `}
              >
                {p.nama}
              </NavLink>
            </li>
          ))}
        </ul>

        <Dropdown
          label="Theme"
          items={["OS", "Dark", "Light"]}
          clickOrHover="click"
          selected={themeState}
          setSelected={switchTheme}
        />

        {/* Dropdown goes here */}
        <div id=""></div>
      </div>
    </nav>
  );
}
