import User from "@/models/userModel";
import bcryptjs from 'bcryptjs'




export const sendEmail = async ({email, emailType, userId} : any) => {
    try {
        const hashedToken = await bcryptjs.hash(userId, 10)

        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(userId, {
                verifyToken : hashedToken,
                verifyTokenExpiry : Date.now() + 360000
            })
        } else if(emailType === "RESET"){
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken : hashedToken,
                forgotPasswordTokenExpiry : Date.now() + 360000
            })
        }
    } catch (error) {
        
    }
}