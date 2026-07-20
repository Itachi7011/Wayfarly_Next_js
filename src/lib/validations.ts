import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const tripSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  destination: z.string().min(2, "Destination is required"),
  description: z.string().optional(),
  startDate: z.string().refine((d) => !Number.isNaN(Date.parse(d)), "Enter a valid start date"),
  endDate: z.string().refine((d) => !Number.isNaN(Date.parse(d)), "Enter a valid end date"),
  budget: z.coerce.number().positive("Budget must be a positive number"),
  currency: z.string().default("INR"),
  coverImage: z.string().optional(),
}).refine((data) => new Date(data.endDate) >= new Date(data.startDate), {
  message: "End date must be on or after the start date",
  path: ["endDate"],
});

export type TripInput = z.infer<typeof tripSchema>;
