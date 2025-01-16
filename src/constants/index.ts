import { User } from "../utils/types";

type NavLink = {
  nama: string;
  rute: string;
};

export const navLinks: NavLink[] = [
  {
    nama: "Home",
    rute: "/",
  },
  {
    nama: "Login",
    rute: "/auth/login",
  },
];

export const footerLinks: NavLink[] = [
  {
    nama: "Home",
    rute: "/",
  },
  {
    nama: "Login",
    rute: "/auth/login",
  },
];

/* DB */
export const dataDummyUsers: User[] = [
  {
    name: "Admin",
    email: "admin@gmail.com",
    password: "admin123",
  },
  {
    name: "",
    email: "dimas@gmail.com",
    password: "dimas123",
  },
  {
    name: "dermawan",
    email: "dermawan@gmail.com",
    password: "dermawan123",
  },
];
