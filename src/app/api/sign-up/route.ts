import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user";
import bcrypt from 'bcryptjs'
import { sendVerification } from "@/helper/sendVerification";

export async function POST(request:Request) {
    await dbConnect()
    try {
        const {username,email,password} = await request.json()
        const existingUserVerifiedbyUserName = await UserModel.findOne({username,isVerified:true})

        if(existingUserVerifiedbyUserName){
           return Response.json({success:false,message:"Username Is Already Taken"})
        }
        const existingemailVerifiedbyEmail = await UserModel.findOne({email})
        if(existingemailVerifiedbyEmail){
            true
        }
        else{
            const hashedPassword = await bcrypt.hash(password,10)
            const expiryDate = new Date()
            expiryDate.setHours(expiryDate.getHours() + 1)
        }
        
    } catch (error) {
        console.error("Error Registring User ")
        return Response.json({success:false,message:"Error Registring User"},{status:500})
    }
}