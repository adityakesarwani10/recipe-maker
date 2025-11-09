import {resend} from '@/lib/resend'
import VerificationEmail from '@/emails/verificationEmail'
import { ApiResponse } from '@/types/ApiResponse'
import { render } from '@react-email/render';

export async function SendVerificationCode(
    email: string,
    username: string,
    verifyCode: string
) : Promise<ApiResponse> {
    try {
        const htmlcontent = await render(
            VerificationEmail({username, otp: verifyCode})
        )
        const emailresponse = await resend.emails.send({
            from: "onboarding@resend.dev",
            to: "adityakesarwani9956@gmail.com", //TODO: Have to change with the email
            subject: "Verification code",
            html: htmlcontent
        });

        if(!emailresponse.data) {
            return {success: false, message: "Email not send"}
        }
        
        return {success: true, message: "Email send successfully"}
    }   
    catch(emailErr) {
        console.log("Failed to send Email: ", emailErr)
        return {success: false, message: "Error while send the email"}
    }
} 