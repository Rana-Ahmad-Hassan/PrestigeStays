import { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  dateOfBirth: Date;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    zipCode?: string;
  };
  role: "guest" | "host" | "admin";
  profilePicture?: string | null;
  bookings?: Array<Schema.Types.ObjectId>;
  listings?: Array<Schema.Types.ObjectId>;
  isVerified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
