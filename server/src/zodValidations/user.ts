import { z } from "zod";
import { Request, Response, NextFunction } from "express";

const addressSchema = z.object({
  street: z.string().optional(),
  city: z.string({message:"city is required"}),
  state: z.string({message:"state is required"}),
  country: z.string({message:"country is required"}),
  zipCode: z.string().optional(),
});

export const userSchema = z.object({
  name: z.string({message:"Name is required"}),
  email: z.string().email({message:"Invalid email address"}),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  phoneNumber: z.string({message:"Phone number is required"}),
  dateOfBirth: z
    .string()
    .transform((val) => new Date(val))
    .refine((date) => !isNaN(date.getTime()), "Invalid date"),
  address: addressSchema.optional(),
  role: z.enum(["guest", "host", "admin"]).default("guest"),
  profilePicture: z.string().nullable().optional(),
  bookings: z.array(z.string()).optional(),
  listings: z.array(z.string()).optional(),
  isVerified: z.boolean().default(false),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

const userValidateMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    req.body = userSchema.parse(req.body);
    next();
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({
        message: "Validation error",
        errors: err.errors,
      });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

export default userValidateMiddleware;
