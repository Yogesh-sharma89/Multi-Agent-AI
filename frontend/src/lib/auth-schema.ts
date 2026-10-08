import { z } from "zod";


export const emailSchema = z
  .string()
  .trim()
  .min(1, "Enter your email address.")
  .max(254, "That email address is too long.")
  .toLowerCase()
  .pipe(z.email("Enter a valid email address, like name@example.com."));


export const strongPasswordSchema = z
  .string()
  .min(8, "Use at least 8 characters.")
  .max(64, "Use 64 characters or fewer.")
  .regex(/[a-z]/, "Add a lowercase letter.")
  .regex(/[A-Z]/, "Add an uppercase letter.")
  .regex(/[0-9]/, "Add a number.")
  .regex(/[^A-Za-z0-9]/, "Add a symbol, like ! or #.")
  .refine((v) => !/\s/.test(v), "Remove spaces from your password.");

/* ---------- Forms ---------- */

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Enter your password.").max(64, "Use 64 characters or fewer."),
});

export const signupSchema = z
  .object({
    email: emailSchema,
    password: strongPasswordSchema,
    confirmPassword: z.string().min(1, "Confirm your password."),
    acceptTerms: z.boolean().refine((v) => v === true, {
      message: "Accept the terms to create your account.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"],
  });

export type LoginValues = z.infer<typeof loginSchema>;
export type SignupValues = z.infer<typeof signupSchema>;

/* ---------- Password strength (UI meter, not validation) ---------- */

export const passwordChecks = [
  { id: "length", label: "8+ characters", test: (v: string) => v.length >= 8 },
  { id: "lower", label: "Lowercase letter", test: (v: string) => /[a-z]/.test(v) },
  { id: "upper", label: "Uppercase letter", test: (v: string) => /[A-Z]/.test(v) },
  { id: "number", label: "Number", test: (v: string) => /[0-9]/.test(v) },
  { id: "symbol", label: "Symbol", test: (v: string) => /[^A-Za-z0-9]/.test(v) },
] as const;

export function getPasswordStrength(value: string) {

  const passed = passwordChecks.filter((c) => c.test(value)).length;
  const score = value ? passed : 0; // 0–5
  const label = ["", "Weak", "Weak", "Fair", "Good", "Strong"][score];
  return { score, label };
  
}