import { successResponse } from "@/helpers/response";
import User from "@/models/user";
import { hashPassword } from "@/utils/bcrypt";
import { IUser } from "@/utils/types";
import { Request, Response } from "express";

export const signUp = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { name, email, password, phoneNumber, dateOfBirth, address, role } =
      req.body;

    if (
      !name ||
      !email ||
      !password ||
      !phoneNumber ||
      !dateOfBirth ||
      !role ||
      !address
    ) {
      return res.status(400).send({
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).send({
        message: "User already exists",
      });
    } else {
      const newPassword = await hashPassword(password);

      const newUser: any = await User.create({
        name,
        email,
        password: newPassword,
        address,
        phoneNumber,
        dateOfBirth,
        role,
      });

      if (newUser) {
        return res
          .status(201)
          .json(successResponse(newUser, "User signed up successfully"));
      } else {
        return res.status(500).send({
          message: "Unable to create user",
        });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: "Internal Server Error",
    });
  }
};
