import {z} from "zod"

export const usernameValidation = z
    .string()
    .min(3, "Username must be atleast 3 characters")
    .max(20, "Username must be less than 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username does not contains any special symbol")


export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message: "Invalid email address"}),
    password: z.string().min(6, {message: "Password must be atleast 6 characters"}).max(16, {message: "Password can't exceed from 16 characters"})
})