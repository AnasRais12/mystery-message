import { getServerSession } from "next-auth";
import { User } from "next-auth";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user";
import { authOptions } from "../auth/[...nextauth]/option";
import mongoose from "mongoose";

export async function GET(request: Response) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;
  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "User Not Auntheticated ",
      },
      { status: 400 }
    );
  }
  const userID = new mongoose.Types.ObjectId(user._id);

  try {
    const user = await UserModel.aggregate([
      { $match: { id: userID } },
      { $unwind: "$messages" },
      { $sort: { "messages.createdAt": -1 } },
      { $group: { _id: "$_id", messages: { $push: "$messages" } } },
    ]);

    if(!user || user.length === 0 ){
        return Response.json(
            {
              success: false,
              message: "User Not Found ",
            },
            { status: 401 }
          );
    }
    return Response.json(
        {
          success: true,
          message: user[0].messages,
        },
        { status: 201 }
      );
  } catch (error) {
    return Response.json(
        {
          success: true,
          message: "ERROR IN GET MESSAGE WHILE AGGEREGATION AND CATCH ITS CATCH TYPE ERROR ",error
        },
        { status: 500 }
      );
  }
}
