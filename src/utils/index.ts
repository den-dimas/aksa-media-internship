export function getAppTheme(): "os" | "dark" | "light" {
  return (localStorage.getItem("theme") as any) || "os";
}

export function getSystemTheme(): "dark" | "light" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
