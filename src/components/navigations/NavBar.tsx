import { NavLink } from "react-router";

import { navLinks } from "../../constants";

export default function NavBar() {
  return (
    <nav
      id="navigation-bar"
      className="flex items-center justify-between h-[var(--nav-h)] py-2 px-4 sticky top-0 bg-dark-blue text-cream z-10"
    >
      <NavLink to="/">
        <h1 className="font-black text-3xl tracking-tighter">Aksa Media</h1>
      </NavLink>

      <div className="">
        {/* Dropdown goes here */}
        <div id=""></div>

        {/* Main Routes */}
        <ul id="nav-list-parent" className="flex items-center gap-2">
          {navLinks.map((p, i) => (
            <li key={i}>
              <NavLink
                to={p.rute}
                className={({
                  isActive,
                  isTransitioning,
                }) => `text-xl px-2 pb-0.5 tracking-tighter text-center ease-in-out duration-300 relative font-medium hover:text-black z-0
                before:absolute before:left-0 before:top-0 before:h-full before:bg-yellow before:w-0 hover:before:w-full before:origin-left  before:ease-in-out before:duration-300 before:-z-10
                ${isActive ? "before:w-full text-black " : ""}
                ${isTransitioning ? "before:rounded-lg" : ""}
                `}
              >
                {p.nama}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
