import { useForm } from "react-hook-form";
import { Toaster } from "react-hot-toast";

import { LoginForm, loginSchema } from "../constants/schema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <div id="login-page" className="flex w-screen h-[100vh] items-center justify-between">
      <section className="h-full flex-center flex-col flex-1 bg-dark-blue dark:bg-dark-purple">
        <h1 className="bg-cream p-2 text-dark-blue dark:text-dark-purple">
          WELCOME <span>TO</span>
        </h1>
        <h1 className="text-6xl text-cream">Aksa Media</h1>
      </section>

      <section id="login-section" className="h-full flex-center flex-1 dark:bg-darker-purple">
        <div className="flex flex-col gap-4">
          <section className="flex flex-col gap-2">
            <h1 className="text-6xl font-bold tracking-tighter">Login</h1>

            <p className="text-dark-purple dark:text-cream opacity-70 text-lg">
              Enter your email below to login to your account!
            </p>
          </section>

          <form method="POST" className="flex flex-col gap-4" onSubmit={onSubmit}>
            <label className="bg-dark-blue dark:bg-cream text-cream dark:text-darker-purple w-fit font-medium px-2 pb-0.5">
              Email
            </label>
            <input
              className="ring-0 focus:ring-0 focus:outline-none border-2 border-dark-blue dark:border-cream pl-4 py-2 w-full"
              placeholder="Masukkan email Anda..."
              {...register("email")}
            />
            {errors?.email && <p className="text-red-700">{errors.email.message}</p>}

            <label className="bg-dark-blue dark:bg-cream text-cream dark:text-darker-purple w-fit font-medium px-2 pb-0.5">
              Password
            </label>
            <input
              className="ring-0 focus:ring-0 focus:outline-none border-2 border-dark-blue dark:border-cream pl-4 py-2 w-full"
              placeholder="Masukkan password Anda..."
              {...register("password")}
            />
            {errors?.password && <p className="text-red-700">{errors.password.message}</p>}

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
