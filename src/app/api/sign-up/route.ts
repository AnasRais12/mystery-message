import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user";
import bcrypt from "bcryptjs";
import { sendVerification } from "@/helper/sendVerification";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username, email, password } = await request.json();
    const existingUserVerifiedbyUserName = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingUserVerifiedbyUserName) {
      return Response.json({
        success: false,
        message: "Username Is Already Taken",
      });
    }
    const existingemailVerifiedbyEmail = await UserModel.findOne({ email });
    const verifyCode = Math.floor(10000 + Math.random() * 90000).toString();
    if (existingemailVerifiedbyEmail) {
      if (existingemailVerifiedbyEmail.isVerified) {
        return Response.json(
          {
            suceess: false,
            message: "User already exist with this email",
          },
          { status: 400 }
        );
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        existingemailVerifiedbyEmail.password = hashedPassword;
        existingemailVerifiedbyEmail.verifyCode = verifyCode;
        const expiryDate = new Date(Date.now() + 3600000);
        existingemailVerifiedbyEmail.verifyCodeExpiry = expiryDate;

        await existingemailVerifiedbyEmail.save()
      }
    } else {
      // Registeration honey se pehle k   kaam
      const hashedPassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);
      const userNew = new UserModel({
        username,
        email,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
        isAcceptmessage: true,
        message: [],

      });
      await userNew.save();
    }
    // Send Verification Code //
    const emailResponse = await sendVerification(email, username, verifyCode);

    if (!emailResponse.success) {
      return Response.json(
        {
          success: false,
          message: emailResponse.message,
        },
        { status: 500 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "User Register Suceesfully Please Enter Your  Verifycode ",
       
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error Registring User ");
    return Response.json(
      { success: false, message: "Error Registring User" },
      { status: 500 }
    );
  }
}
