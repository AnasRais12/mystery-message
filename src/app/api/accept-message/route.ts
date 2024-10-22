import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/option";
import { User } from "next-auth";
import UserModel from "@/model/user";
import dbConnect from "@/lib/dbConnect";

export async function POST(request: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user = session?.user as User;
  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "User Not Auntheticated ",
      },
      { status: 400 }
    );
  }
  const userID = user._id;
  const { acceptMessage } = await request.json();

  try {
    const UpdateUser = await UserModel.findByIdAndUpdate(
      userID,
      { isAcceptmessage: acceptMessage },
      { new: true }
    );
    if (!UpdateUser) {
      return Response.json(
        {
          success: false,
          message: " failed to update User stats message  ",
        },
        { status: 400 }
      );
    }
    return Response.json(
      {
        success: true,
        message: "Message Status Updatance Succesfully",
        UpdateUser,
      },
      { status: 204 }
    );
  } catch (error) {
    console.error("Error update user message  ");
    return Response.json(
      {
        success: false,
        message: " failed to update User update message Error ",
        error,
      },
      { status: 500 }
    );
  }
}

export async function GET(request:Response){
    await dbConnect()
    const session = await getServerSession(authOptions);
    const user = session?.user as User;
    if (!session || !session.user) {
      return Response.json(
        {
          success: false,
          message: "User Not Auntheticated ",
        },
        { status: 400 }
      );
    }
    const userID = user._id;
  try {
      const foundUser =  await UserModel.findById(userID)
      if (!foundUser) {
          return Response.json(
          {
              success: false,
              message: "Failed to found User   ",
          },
          { status: 404}
          );
      }
      return Response.json(
          {
          success: true,
          isAcceptMessage:foundUser.isAcceptmessage,
          message: "IsAccepting Messages",
          },
          { status: 205}
      );
  }   catch (error) {
      console.error("Error in router/accept message in getting Accept Messages ",);
      return Response.json(
      { success: false, message: "Error Registring User" },
      { status: 500 }
    );
  }
    
  }