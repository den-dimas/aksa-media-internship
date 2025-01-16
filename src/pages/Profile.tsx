import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import { User } from "../utils/types";
import { Database } from "../utils/db";
import toast, { Toaster } from "react-hot-toast";
import { toastError } from "../utils";

export default function Profile() {
  const [cookies, setCookie] = useCookies(["token"]);

  const [changedName, setChangedName] = useState(cookies.token.name);
  const [user, setUser] = useState<User>({ email: "", password: "", name: "" });

  async function onSubmit(e: any) {
    e.preventDefault();

    const db = await Database.connect();

    const result = await db.changeUserByEmail(user.email, changedName);

    if (!result.name) {
      toastError("Cannot change user!");
      return;
    }

    setCookie("token", result, { path: "/" });
    toast.success("Successfully changed user name!");
  }

  useEffect(() => {
    (async function () {
      const db = await Database.connect();

      const result = await db.searchEmail(cookies.token.email);

      if (result) {
        setUser(result);
        setChangedName(result.name);
      }
    })();
  }, []);

  return (
    <div
      id="profile-page"
      className="relative w-screen min-h-screen bg-cream dark:bg-darker-purple flex-center flex-col"
    >
      <h1 className="bg-dark-blue text-cream dark:bg-cream dark:text-darker-purple mb-4 px-2 pb-0.5">Profile</h1>

      <form className="space-y-4" onSubmit={(e) => onSubmit(e)}>
        <div>
          <label className="bg-dark-blue dark:bg-cream text-cream dark:text-darker-purple w-fit font-medium px-2 pb-0.5">
            Name
          </label>
          <input
            className="bg-cream ring-0 focus:ring-0 focus:outline-none border-2 border-dark-blue dark:border-cream pl-4 py-2 w-full"
            placeholder="Masukkan Nama Anda..."
            type="text"
            value={changedName}
            onChange={(e) => setChangedName(e.target.value)}
          />
        </div>

        <div>
          <label className="bg-dark-blue dark:bg-cream text-cream dark:text-darker-purple w-fit font-medium px-2 pb-0.5">
            Email
          </label>
          <input
            className="bg-cream ring-0 focus:ring-0 focus:outline-none border-2 border-dark-blue dark:border-cream pl-4 py-2 w-full"
            placeholder="Masukkan Nama Anda..."
            type="text"
            readOnly
            value={user?.email}
          />
        </div>

        <button
          type="submit"
          disabled={!changedName.length}
          className={`hover-effect w-fit mx-auto block font-bold border-dark-blue dark:border-cream dark:text-cream border-2 px-4 pb-0.5 before:bg-dark-blue hover:text-cream
            disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50
            `}
        >
          Save
        </button>
      </form>

      <Toaster />
    </div>
  );
}
