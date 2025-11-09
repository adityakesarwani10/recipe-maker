import { dbconnect } from "@/lib/dbconnect";
import UserModel from "@/model/user.model";
import bcrypt from "bcryptjs";
import { SendVerificationCode } from "@/helpers/sendVerificationCode";

export async function POST(request: Request) {
    await dbconnect()
    try {
        const {username, email, password} = await request.json()
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString()

        // Check for existing user by username or email
        const existingUser = await UserModel.findOne({
            $or: [{username}, {email}]
        })

        console.log("Existing user: ", existingUser)

        if (existingUser) {
            if (existingUser.isVerified) {
                return Response.json({
                    success: false,
                    message: "User already exists and is verified"
                }, {status: 400})
            } else {
                // Update unverified user with new details
                const hashPassword = await bcrypt.hash(password, 10);
                existingUser.password = hashPassword;
                existingUser.verifyCode = verifyCode;
                existingUser.email = email;
                existingUser.verifyCodeExpiry = new Date(Date.now() + 3600000);
                await existingUser.save();
                console.log("Updated existing unverified user: ", existingUser);
            }
        } else {
            // Create new user
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
            console.log("Created new user: ", newUser)
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
