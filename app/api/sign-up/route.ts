import { dbconnect } from "@/lib/dbconnect";
import UserModel from "@/model/user.model";
import bcrypt from "bcryptjs";
import { SendVerificationCode } from "@/helpers/sendVerificationCode";

export async function POST(request: Request) {
    await dbconnect()
    try {
        const {username, email, password} = await request.json()
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString()
        const exitedUserVerified = await UserModel.findOne({
            username,
            isVerified: true
        })
        console.log("Existing user: ", exitedUserVerified)
        if(exitedUserVerified) {
            return Response.json({
                success: false,
                message: "Username already exist"
            }, {status: 400})
        }
        
        const existUserWithEmail = await UserModel.findOne({email})

        if(existUserWithEmail) {
            if(existUserWithEmail.isVerified) {
                return Response.json({
                    success: true,
                    message: "User already exist with verification"
                }, {status: 200})
            }

            const hashPassword = await bcrypt.hash(password, 10);
            existUserWithEmail.password = hashPassword;
            existUserWithEmail.verifyCode = verifyCode
            existUserWithEmail.verifyCodeExpiry = new Date(Date.now() + 3600000)


            await existUserWithEmail.save()
            console.log("All done with exist email user: ", existUserWithEmail)
        }
        else {
            const hashPassword = await bcrypt.hash(password, 10)
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1)

            const newUser = new UserModel({
                username,
                password: hashPassword,
                email,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
            })

            await newUser.save()
            console.log("All done with newuser: ", newUser)
        }

        const emailResponse = await SendVerificationCode(email, username, verifyCode)
        console.log("Email send response: ", emailResponse)
        if(!emailResponse.success) {
            return Response.json({
                success: false,
                message: emailResponse.message
            }, {status: 400})
        }
        return Response.json({
                success: true,
                message: emailResponse.message
            }, {status: 200})

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