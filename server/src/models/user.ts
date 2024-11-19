import { Schema, model, Model, Document } from "mongoose";

interface IUser extends Document {
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
  bookings: Schema.Types.ObjectId[];
  listings: Schema.Types.ObjectId[];
  isVerified: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      country: { type: String },
      zipCode: { type: String },
    },
    role: {
      type: String,
      enum: ["guest", "host", "admin"],
      default: "guest",
    },
    profilePicture: {
      type: String,
      default: null,
    },
    bookings: [
      {
        type: Schema.Types.ObjectId,
        ref: "Booking",
      },
    ],
    listings: [
      {
        type: Schema.Types.ObjectId,
        ref: "Listing",
      },
    ],
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, 
  }
);

const User: Model<IUser> = model<IUser>("User", userSchema);

export default User;
