import { useEffect, useState } from "react";
import { NavLink } from "react-router";

import { navLinks } from "../../constants";

type ThemeList = "dark" | "light" | "os";

export default function NavBar() {
  const [themeState, setThemeState] = useState<ThemeList>((localStorage.getItem("theme") as ThemeList) || "os");

  function switchTheme(theme: ThemeList) {
    if (theme == "os") {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", (e) => (e.matches ? setThemeState("dark") : setThemeState("light")));
    }
  }

  useEffect(() => {
    localStorage.setItem("theme", themeState);
  }, [themeState]);

  return (
    <nav
      id="navigation-bar"
      className="flex items-center justify-between h-[var(--nav-h)] py-2 px-4 sticky top-0 bg-dark-blue text-cream z-10"
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

        <div id="theme-switcher" className="">
          <div className="w-8 h-8 rounded-full bg-black cursor-pointer" onClick={() => switchTheme("dark")} />
        </div>

        {/* Dropdown goes here */}
        <div id=""></div>
      </div>
    </nav>
  );
}
