import { useForm } from "react-hook-form";
import { Toaster } from "react-hot-toast";

import { LoginForm, loginSchema } from "../utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Database, USER_STORE } from "../utils/db";
import { toastError } from "../utils";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

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

  const db = new Database();

  const onSubmit = handleSubmit((data) => {
    const { email, password } = data;

    const request = db.searchIndex(USER_STORE, "email", email);
    if (!request) {
      toastError("Failed to login! Try again!");
      return;
    }

    request.onsuccess = () => {
      if (!request.result) {
        setError("email", { message: "Email not found!" });
        return;
      }

      if (request.result.password != password) {
        setError("password", { message: "Wrong password!" });
        return;
      }

      // Success Login
      // Save info to cookie
    };
  });

  // Inject static user data for logging in
  useEffect(() => {
    if (Database.db == null) db.connect();
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
              Enter your email below to login to your account!
            </p>
          </section>

          <form method="POST" className="flex flex-col gap-4" onSubmit={onSubmit}>
            <div>
              <label className="bg-dark-blue dark:bg-cream text-cream dark:text-darker-purple w-fit font-medium px-2 pb-0.5">
                Email
              </label>
              <input
                className="ring-0 focus:ring-0 focus:outline-none border-2 border-dark-blue dark:border-cream pl-4 py-2 w-full"
                placeholder="Masukkan email Anda..."
                {...register("email")}
              />
              {errors?.email && <p className="text-red-700 mt-1 ml-1 text-sm">{errors.email.message}</p>}
            </div>

            <div>
              <label className="bg-dark-blue dark:bg-cream text-cream dark:text-darker-purple w-fit font-medium px-2 pb-0.5">
                Password
              </label>
              <input
                className="ring-0 focus:ring-0 focus:outline-none border-2 border-dark-blue dark:border-cream pl-4 py-2 w-full"
                placeholder="Masukkan password Anda..."
                {...register("password")}
                type={showPassword ? "text" : "password"}
              />
              {errors?.password && <p className="text-red-700 mt-1 ml-1 text-sm">{errors.password.message}</p>}
              <div className="flex items-center gap-1 mt-1 ml-1">
                <div
                  title="Show Password"
                  className={`w-2.5 h-2.5 rounded-full border-2 border-black cursor-pointer ease-in-out duration-100
                ${showPassword ? "bg-black" : "bg-white"}`}
                  onClick={() => setShowPassword(!showPassword)}
                />
                <p className="italic text-sm opacity-70 select-none">Show Password</p>
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
