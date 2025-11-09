import { dbconnect } from "@/lib/dbconnect";
import {z} from 'zod'
import UserModel from "@/model/user.model";

export async function POST(request: Request) {

    await dbconnect()

    try {
        const {username, code} = await request.json()

        const decodedUsername = decodeURIComponent(username)
        const user = await UserModel.findOne({username: decodedUsername, isVerified: false})
        if(!user) {
            return Response.json({success: false, message: "Username not found"}, {status: 404})
        }
        
        const isCodeValid = user.verifyCode === code
        const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date()

        if(isCodeValid && isCodeNotExpired) {
            user.isVerified = true
            await user.save()
            return Response.json({success: true, message: "User verified successfully"}, {status: 200})
        }
        return Response.json({success: false, message: "Incorrect verification code"}, {status: 403})
    } catch (error) {
        console.error("Error while checking the verify code", error)

        return Response.json({
            success: false,
            message: "Something went wrong while checking the verification code"
        }, {status: 403})   
    }
}