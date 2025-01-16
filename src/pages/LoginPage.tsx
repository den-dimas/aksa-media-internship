import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";

import { zodResolver } from "@hookform/resolvers/zod";

import { Database } from "../utils/db";
import { LoginForm, loginSchema } from "../utils/schema";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [_, setCookie] = useCookies(["token"]);

  const [showHelp, setShowHelp] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    const { email, password } = data;

    const db = await Database.connect();

    const result = await db.searchEmail(email);

    if (!result) {
      setError("email", { message: "Email not found!" });
      return;
    }

    if (result.password != password) {
      setError("password", { message: "Wrong password!" });
      return;
    }

    /* DISCLAIMER
     * The token should've been coming from API
     * and not from client. I use this just for the sake
     * of demonstrating Authorization for the app.
     */
    setCookie("token", result, { path: "/" });

    navigate("/");
  });

  // Inject static user data for logging in
  useEffect(() => {
    async function initDB() {
      await Database.init();
    }

    initDB();
  }, []);

  return (
    <div id="login-page" className="flex w-screen h-[100vh] items-center justify-between">
      <section className="hidden h-full md:flex-center flex-col flex-1 bg-dark-blue dark:bg-dark-purple">
        <h1 className="bg-cream p-2 text-dark-blue dark:text-dark-purple">
          WELCOME <span>TO</span>
        </h1>
        <h1 className="text-6xl text-cream">Aksa Media</h1>
      </section>

      <section id="login-section" className="h-full flex-center flex-1 dark:bg-darker-purple px-4">
        <div className="flex flex-col gap-4">
          <section className="flex flex-col gap-2">
            <h1 className="text-6xl font-bold tracking-tighter">Login</h1>

            <p className="text-dark-purple dark:text-cream opacity-70 text-lg">
              Enter your email below to login to your account!{" "}
              <span
                className="bg-dark-blue text-cream px-1 select-none dark:bg-cream dark:text-darker-purple opacity-55 cursor-help font-black text-sm"
                onClick={() => setShowHelp(!showHelp)}
              >
                ?
              </span>
            </p>

            {showHelp && (
              <div className="p-4 text-sm absolute bg-cream border-2 border-dark-blue dark:border-cream dark:bg-darker-purple text-black dark:text-cream left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
                Account 1: dimas@gmail.com || dimas123 <br />
                Account 2: admin@gmail.com || admin123 <br />
                Account 3: dermawan@gmail.com || dermawan123
              </div>
            )}
          </section>

          <form method="POST" className="flex flex-col gap-4" onSubmit={onSubmit}>
            <div>
              <label className="bg-dark-blue dark:bg-cream text-cream dark:text-darker-purple w-fit font-medium px-2 pb-0.5">
                Email
              </label>
              <input
                {...register("email")}
                className="bg-cream ring-0 focus:ring-0 focus:outline-none border-2 border-dark-blue dark:border-cream pl-4 py-2 w-full"
                placeholder="Masukkan email Anda..."
              />
              {errors?.email && (
                <p className="text-red-700 dark:text-red-300 mt-1 ml-1 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="bg-dark-blue dark:bg-cream text-cream dark:text-darker-purple w-fit font-medium px-2 pb-0.5">
                Password
              </label>
              <input
                {...register("password")}
                className="bg-cream ring-0 focus:ring-0 focus:outline-none border-2 border-dark-blue dark:border-cream pl-4 py-2 w-full"
                placeholder="Masukkan password Anda..."
                type={showPassword ? "text" : "password"}
              />
              {errors?.password && (
                <p className="text-red-700 dark:text-red-300 mt-1 ml-1 text-sm">{errors.password.message}</p>
              )}

              <div className="flex items-center gap-1 mt-1 ml-1">
                <div
                  title="Show Password"
                  className={`w-2.5 h-2.5 rounded-full border-2 border-dark-purple dark:border-cream cursor-pointer ease-in-out duration-100
                ${showPassword ? "bg-darker-purple dark:bg-cream" : "bg-cream dark:bg-darker-purple"}`}
                  onClick={() => setShowPassword(!showPassword)}
                />
                <p className="italic text-sm opacity-70 select-none dark:text-cream">Show Password</p>
              </div>
            </div>

            <button
              type="submit"
              disabled={!isValid}
              className={`hover-effect w-fit self-center font-bold border-dark-blue dark:border-cream dark:text-cream border-2 px-4 pb-0.5 before:bg-dark-blue hover:text-cream
                disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50
                `}
            >
              Login
            </button>
          </form>
        </div>
      </section>

      <Toaster />
    </div>
  );
}
