import { useState } from "react";

type DropdownProps = {
  className?: string;
  label: string;
  labelClassname?: string;
  items: string[];
  clickOrHover?: "click" | "hover";
  selected?: string;
  setSelected?: React.Dispatch<React.SetStateAction<any>>;
};

export default function Dropdown({
  clickOrHover = "hover",
  label,
  items,
  selected,
  setSelected,
  labelClassname,
  className,
}: DropdownProps) {
  const [opened, setOpened] = useState(false);

  return (
    <div className={"relative text-center " + className} onMouseLeave={() => setOpened(false)}>
      <h1
        className={
          "text-xl px-2 pb-0.5 tracking-tighter text-center ease-in-out duration-300 relative font-medium hover-effect cursor-pointer " +
          labelClassname
        }
        onClick={() => (clickOrHover == "click" ? setOpened(!opened) : null)}
        onMouseEnter={() => (clickOrHover == "hover" ? setOpened(true) : null)}
      >
        {label}
      </h1>

      <ul className={`text-dark-blue absolute w-full flex flex-col`}>
        {items.map((item, index) => (
          <li
            key={index}
            className={`bg-cream dark:bg-black font-medium py-1 border-2 border-dark-blue dark:border-cream dark:text-cream dark:hover:text-black hover-effect origin-top cursor-pointer duration-75 before:duration-75
            ${items.length % 2 == 0 ? "odd:border-y-0 first:!border-t-2" : "even:border-y-0"}
            ${opened ? "scale-y-100 z-10" : "scale-y-0 z-0"}
            ${selected?.toLowerCase() == item.toLowerCase() ? "before:w-full dark:!text-black" : ""}
          `}
            style={{ transitionDelay: opened ? index * 75 + "ms" : (items.length - 1 - index) * 75 + "ms" }}
            onClick={() => (!setSelected ? null : setSelected(item.toLowerCase()))}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
