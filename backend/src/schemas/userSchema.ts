import { z } from "zod";

const emailSchema = z.string().email({
  message: "Enter a valid email",
});

const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters long")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(
    /[@$!%*?&]/,
    "Password must contain at least one special character (e.g., @, $, !, %, *, ?, &)"
  );

const nameSchema = z.string().min(3, {
  message: "Name should be atleast 3 characters long",
});

export const signUpSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema
});

export const signInSchema = z.object({
    email: emailSchema,
    password: passwordSchema
})