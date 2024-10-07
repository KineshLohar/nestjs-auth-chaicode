import User from "@/models/userModel";
import connectDB from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import getDataFromToken from "@/helpers/getDataFromToken";

connectDB()

export async function GET(request : NextRequest){
    try {
        const userId = await getDataFromToken(request);
        const user = await User.findOne({
            _id : userId
        }).select("-password")

        if(!user){
            return NextResponse.json({
                error : "User Does Not Exist!"
            },{
                status : 400
            })
        }

        return NextResponse.json({
            message : "User data fetched successfully!",
            data : user
        },{
            status : 200
        })

    } catch (error : any) {
        return NextResponse.json({
            error : error.message
        },
        {
            status : 400
        })
    }
}