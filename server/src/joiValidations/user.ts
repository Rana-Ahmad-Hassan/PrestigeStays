import { z } from "zod";

const addressSchema = z.object({
  street: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  zipCode: z.string().optional(),
});

export const userSchema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  phoneNumber: z.string().nonempty("Phone number is required"),
  dateOfBirth: z.string().transform((val) => new Date(val)).refine((date) => !isNaN(date.getTime()), "Invalid date"),
  address: addressSchema.optional(),
  role: z.enum(["guest", "host", "admin"]).default("guest"),
  profilePicture: z.string().nullable().optional(),
  bookings: z.array(z.string()).optional(),
  listings: z.array(z.string()).optional(),
  isVerified: z.boolean().default(false),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const validateUser = (data: unknown) => userSchema.parse(data);
