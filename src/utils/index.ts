import toast from "react-hot-toast";

export function getAppTheme(): "os" | "dark" | "light" {
  return localStorage.getItem("theme") as any;
}

export function getSystemTheme(): "dark" | "light" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function toastError(message: string) {
  return toast.error(message, {
    position: "bottom-right",
    style: {
      color: "#FFFEFA",
      backgroundColor: "rgb(248 113 113)",
      borderWidth: "2px",
      borderColor: "#FFFEFA",
    },
    iconTheme: {
      primary: "#282532",
      secondary: "#FFFEFA",
    },
  });
}
