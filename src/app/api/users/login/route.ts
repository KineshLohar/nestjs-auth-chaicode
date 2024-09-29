import connectDB from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connectDB()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;
        console.log(reqBody)

        if(!email || !password){
            return NextResponse.json({error: "All fields are required"},{status: 400})
        }

        const user = await User.findOne({email})

        if(!user){
            return NextResponse.json({error: "User not found"},{status: 400})
        }

        const passwordMatch = await bcryptjs.compare(password, user.password)

        if(!passwordMatch){
            return NextResponse.json({error: "Invalid password"},{status: 400})
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"})

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })

        response.cookies.set("token", token, {
            httpOnly: true,
        })

        return response
        
        
    } catch (error) {
        return NextResponse.json({error: "Error in login"},{status: 500})
    }
}
