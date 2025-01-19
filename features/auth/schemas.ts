import { z } from "zod"

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, "Required"),
});

export const registerSchema = z.object({
    name: z.string().trim().min(3, "Minimium of 3 character required"),
    email: z.string().email(),
    password: z.string().min(8, "Minimium of 8 character required"),
});