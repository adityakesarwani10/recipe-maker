import { dbconnect } from "@/lib/dbconnect";
import UserModel from "@/model/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { generateAccessAndRefreshToken } from "@/helpers/auth";

export async function POST(request: Request) {
    await dbconnect()
    try {
        const {identifier, password} = await request.json()

        const user = await UserModel.findOne({
            $or: [
                {email:identifier},
                {username:identifier}
            ]
        })
        console.log(user)
        console.log(identifier)
        console.log(password)
        if(!user) {
            console.error("User does not exist")
            return Response.json({
                success: false,
                message: "User does not exist"
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if(!isPasswordValid) {
            return Response.json({
                success: false,
                message: "Invalid credentials"
            }, {status: 401})
        }
        if(!user.isVerified) {
            return Response.json({
                success: false,
                message: "User is not verified"
            }, {status: 401})
        }

        const {accessToken, refreshToken} = await generateAccessAndRefreshToken((user._id as string | { toString(): string }).toString())

        const loggedInuser = await UserModel.findById(user._id).select("-password")

        console.log("Access Token: ", accessToken);
        console.log("Refresh Token: ", refreshToken);

        const response = NextResponse.json({
            success: true,
            message: "User signed in successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                isVerified: user.isVerified
            }
        }, {status: 200});
        response.cookies.set("accessToken", accessToken);
        response.cookies.set("refreshToken", refreshToken);
        return response;
    } catch (error) {
        console.error("Error while registering the user: ",error)
        return Response.json({
            success: false,
            message: "User not registered successfully"
        },{
            status: 500
        })
    }
}
