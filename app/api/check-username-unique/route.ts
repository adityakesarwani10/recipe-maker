import { dbconnect } from "@/lib/dbconnect";
import UserModel from "@/model/user.model";
import {z} from "zod"
import {usernameValidation} from "@/schema/signupSchema"

const UsernameQuerySchema = z.object({
    username: usernameValidation
})

export async function GET(request: Request) {
    await dbconnect()

    try {
        const {searchParams} = new URL(request.url)

        const queryParams = {username: searchParams.get('username')}
        if (!queryParams.username) {
            throw new Error("Something went wrong in the url while fetching the username")
        }
        const result = UsernameQuerySchema.safeParse(queryParams)
        console.log(result)

        if(!result.success) {
            const usernameErrors = result.error.format().username?._errors || []
            return Response.json({success: false, message: "Username is wrong"}, {status: 403}) 
        }

        const {username} = result.data

        const existingverifiedUser = await UserModel.findOne({username, isVerified: true})

        if(existingverifiedUser) {
            return Response.json({
                success: false,
                message: "Username is already exist"
            
            }, {status: 403})
        }
        return Response.json({
                success: true,
                message: "Username is unique"
            
            }, {status: 200})
    } catch (error) {
        console.error("Error checking username", error)

        return Response.json({
            success: false,
            message: "Username is not valid"
        }, {status: 403})
    }
}