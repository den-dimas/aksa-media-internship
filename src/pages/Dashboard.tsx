import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

import { User } from "../utils/types";
import { Database } from "../utils/db";
import Dropdown from "../components/Dropdown";

type Options = {
  search: string;
  page: number;
  show: number;
};

export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();
  const [options, setOptions] = useState<Options>({
    search: searchParams.get("search") || "",
    page: Number.parseInt(searchParams.get("page") || "0"),
    show: Number.parseInt(searchParams.get("sc") || "50"),
  });

  const [data, setData] = useState<User[]>([]);
  const [displayedData, setDisplayedData] = useState<User[]>([]);

  function changeOptions(options: Options) {
    setOptions(options);
    setSearchParams({ search: options.search, page: options.page.toString(), sc: options.show.toString() });
    window.scrollTo({ top: 0 });
  }

  function changeShowCount(count: string) {
    setOptions({ ...options, show: Number.parseInt(count) });
    setSearchParams({ ...searchParams, sc: count });
  }

  useEffect(() => {
    (async function () {
      const db = await Database.connect();

      const users = await db.getUsers();

      setData(users);

      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    const first = options.page * options.show;
    const last = first + options.show;

    setDisplayedData(
      data
        .slice(options.page * options.show, last)
        .filter((v) => v.name?.includes(options.search) || v.email.includes(options.search))
    );
  }, [data, options]);

  if (loading)
    return (
      <div
        id="dashboard"
        className="relative w-screen min-h-screen bg-cream dark:bg-darker-purple flex-center flex-col"
      >
        <h1>Loading...</h1>
      </div>
    );
  return (
    <div
      id="dashboard"
      className="relative w-screen min-h-screen bg-cream dark:bg-darker-purple flex-center !justify-start flex-col gap-6 py-8 px-6"
    >
      <section className="w-full flex gap-4">
        <input
          className="bg-cream ring-0 focus:ring-0 focus:outline-none border-2 border-dark-blue dark:border-cream pl-4 py-2 w-full max-md:text-sm"
          placeholder="Find a user..."
          value={options.search}
          onChange={(e) => changeOptions({ ...options, search: e.target.value })}
        />

        {/* Dropdown to select theme */}
        <Dropdown
          className="bg-dark-blue dark:bg-cream text-cream dark:text-darker-purple"
          label="Show Count"
          items={["10", "50", "100"]}
          clickOrHover="click"
          selected={options.show.toString()}
          setSelected={changeShowCount}
        />
      </section>

      <section className="w-full overflow-auto">
        <table className="w-full text-black dark:text-cream overflow-x-scroll">
          <thead className="border-2 border-black dark:border-cream dark:border-opacity-55">
            <tr>
              <th className="font-black text-xl bg-dark-blue dark:bg-cream dark:bg-opacity-55 dark:text-darker-purple text-cream text-start border-2 border-black dark:border-cream dark:border-opacity-55 p-2">
                Name
              </th>
              <th className="font-black text-xl bg-dark-blue dark:bg-cream dark:bg-opacity-55 dark:text-darker-purple text-cream text-start border-2 border-black dark:border-cream dark:border-opacity-55 p-2">
                Email
              </th>
            </tr>
          </thead>

          <tbody>
            {displayedData.map((u, i) => (
              <tr key={i} className="">
                <td className="border-2 border-black dark:border-cream dark:border-opacity-55 px-2 py-1">{u.name}</td>
                <td className="border-2 border-black dark:border-cream dark:border-opacity-55 px-2 py-1">{u.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="flex gap-2">
        {options.page >= 1 && (
          <div
            className={`border-2 border-dark-blue dark:border-cream w-8 pb-0.5 text-center select-none cursor-pointer hover-effect dark:text-cream dark:hover:text-darker-purple h-fit px-2`}
            onClick={() => changeOptions({ ...options, page: options.page - 1 })}
          >
            ◀
          </div>
        )}

        <div className="flex gap-2 flex-wrap">
          {Array(Math.ceil(data.length / options.show))
            .fill(1)
            .map((_, i) => (
              <div
                key={i}
                className={`border-2 border-dark-blue dark:border-cream w-8 pb-0.5 text-center select-none cursor-pointer hover-effect dark:text-cream dark:hover:text-darker-purple ${
                  options.page == i ? "bg-dark-blue dark:bg-cream text-cream dark:text-darker-purple" : ""
                }`}
                onClick={() => changeOptions({ ...options, page: i })}
              >
                {i + 1}
              </div>
            ))}
        </div>

        {options.page <= Math.ceil(data.length / options.show) - 1 && (
          <div
            className={`border-2 border-dark-blue dark:border-cream w-8 pb-0.5 text-center select-none cursor-pointer hover-effect dark:text-cream dark:hover:text-darker-purple h-fit px-2`}
            onClick={() => changeOptions({ ...options, page: options.page + 1 })}
          >
            ▶
          </div>
        )}
      </section>
    </div>
  );
}
