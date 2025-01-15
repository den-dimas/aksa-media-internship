import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email tidak boleh kosong!",
      invalid_type_error: "Email harus string.",
    })
    .email("Format email salah!")
    .min(5, "Minimal 5 karakter!")
    .max(255, "Email tidak boleh lebih dari 255 karakter!")
    .refine((email) => email.includes("."), {
      message: "Email tidak memiliki domain yang valid!",
    }),

  password: z
    .string({
      required_error: "Password tidak boleh kosong",
      invalid_type_error: "Password harus string.",
    })
    .min(8, "Minimal password adalah 8 karakter!")
    .max(32, "Maksimal password adalah 32 karakter!"),
});

export type LoginForm = z.infer<typeof loginSchema>;
