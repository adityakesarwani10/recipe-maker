import { NextAuthOptions} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { dbconnect } from "@/lib/dbconnect"
import UserModel from "@/model/user.model"

export const authOptions : NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credential",
            name: "Credential",
            credentials: {
                email : { label: "Email", type: "text"},
                password: { label: "password", type: "password"}
            },
            async authorize(credentials: any): Promise<any> {
                await dbconnect()

                try {
                    const user = await UserModel.findOne({
                        $or: [
                            {email: credentials.identifier},
                            {username: credentials.identifier}
                        ]
                    })

                    if(!user) {
                        throw new Error("No user found with this username or email")
                    }
                    if(!user.isVerified) {
                        throw new Error("User is not verified please verify it by using sign and otp")
                    }

                    const isPasswordCorrect = await bcrypt.compare(credentials.password , user.password)

                    if(isPasswordCorrect) {
                        return user
                    }
                    else {
                        throw new Error("Password incorrect")
                    }
                } catch (err: any) {
                    throw new Error(err)
                }
            }
        })
    ],
    callbacks: {
        async jwt({token, user}) {
            if(user) {
                token._id = user._id?.toString()
                token.isVerified = user.isVerified
                token.isAcceptingMessage = user.isAcceptingMessage
                token.username = user.username
            }

            return token
        },
        async session({session, token}) {
            if(session) {
                session.user._id = token._id?.toString()
                session.user.isVerified = token.isVerified as boolean
                session.user.isAcceptingMessage = token.isAcceptingMessage as boolean
                session.user.username = token.username?.toString()
            }
            
            return session
        }    
    },
    pages: {
        signIn: "/sign-in"
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.AUTH_SECRET
}