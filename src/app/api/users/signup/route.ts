import connectDB from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

connectDB()

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    
    console.log(reqBody);

    if(!username || !email || !password){
        return NextResponse.json({error: "All fields are required"}, {status: 400})
    }

    const userExists = await User.findOne({email})

    if(userExists){
        return NextResponse.json({error: "User already exists"},{status: 400})
    }
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)

    const user = new User({
        username,
        email,
        password: hashedPassword
    })

    const savedUser = await user.save()
    
    return NextResponse.json({
        message: "User created successfully",
        success: true,
        savedUser
    })

  } catch (error: any) {
    return NextResponse.json({ error: error.message },{status: 500});
  }
}
