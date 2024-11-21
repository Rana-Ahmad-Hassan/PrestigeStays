import { successResponse } from "@/helpers/response";
import User from "@/models/user";
import { hashPassword } from "@/utils/bcrypt";
import { Request, Response } from "express";

export const signUp = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password, phoneNumber, dateOfBirth, address, role } =
            req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(409).send({
                message: "User already exists",
            });
            return;
        }

        const newPassword = await hashPassword(password);
        const newUser = await User.create({
            name,
            email,
            password: newPassword,
            address,
            phoneNumber,
            dateOfBirth,
            role,
        });

        if (newUser) {
            res
                .status(201)
                .json(successResponse(newUser, "User signed up successfully"));
        } else {
            res.status(500).send({
                message: "Unable to create user",
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: "Internal Server Error",
        });
    }
};
