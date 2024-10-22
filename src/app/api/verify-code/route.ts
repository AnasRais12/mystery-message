import UserModel from "@/model/user";
import dbConnect from "@/lib/dbConnect";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username, code } = await request.json();
    const decodeedUsername = decodeURIComponent(username);
    const user = await UserModel.findOne({ username: decodeedUsername });
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 500 }
      );
    }

    const isCodeValid = user.verifyCode === code
    const isCodeExpired = new Date(user.verifyCodeExpiry) > new Date()

    if(isCodeValid && isCodeExpired ){
        user.isVerified = true
        await user.save()
        return Response.json(
            {
              success: true,
              message: "User verified successfully",
            },
            { status: 200 }
          );
    }
    else if(!isCodeExpired){
        return Response.json(
            {
              success: false,
              message: "Verified Code has been Expired",
            },
            { status: 400 }
          );
    }
    else{
        return Response.json(
            {
              success: false,
              message: "Incorrect Verification Code",
            },
            { status: 401 }
          );
    }
  } catch (error) {
    console.error("Error Checking in Verification ", error);
    return Response.json(
      {
        success: false,
        message: "Error verifying user",
      },
      { status: 500 }
    ); // Use correct format for response status
  }
}
