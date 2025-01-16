import { NavLink, useLocation } from "react-router";

import { footerLinks } from "../../constants";

export default function Footer() {
  const path = useLocation().pathname;
  if (path.includes("/auth")) return;

  return (
    <>
      <footer className="hidden md:flex items-start justify-between gap-24 min-h-20 py-12 px-4 sticky bottom-0 -z-10 bg-dark-blue dark:bg-dark-purple text-cream">
        <div id="logo" className="flex flex-col flex-1 gap-4">
          {" "}
          <h1 className="text-6xl">Aksa Media</h1>
        </div>

        <div id="links" className="flex-1">
          <h1 className="font-black mb-4 text-xl bg-white text-dark-blue dark:text-black px-2 w-fit">LINKS</h1>

          <ul className="flex flex-col gap-2">
            {footerLinks.map((link, i) => (
              <li key={i}>
                <NavLink to={link.rute} className="underline">
                  {link.nama}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div id="contacts" className="flex-1">
          <h1 className="font-black mb-4 text-xl bg-white text-dark-blue dark:text-black px-2 w-fit">CONTACT US</h1>

          <ul className="flex flex-col gap-2">
            <li>
              <NavLink
                to="https://instagram.com/dimass.dn"
                className="underline"
                rel="noreferrer noopener"
                target="_blank"
              >
                Instagram
              </NavLink>
            </li>

            <li>
              <NavLink to="mailto:dimass.drm@gmail.com" className="underline" rel="noreferrer noopener" target="_blank">
                Gmail
              </NavLink>
            </li>
          </ul>
        </div>
      </footer>

      <footer className=" bg-dark-blue dark:bg-dark-purple text-cream text-center py-2 border-t-2 border-cream dark:border-cream text-xs">
        <p>
          Courtesy of <b>Den</b>
          <span className="pr-1" /> | <span className="pl-1" />
          <b>Aksa Media</b> 2025
        </p>
      </footer>
    </>
  );
}
