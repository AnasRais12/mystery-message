import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user";
import { Message } from "@/model/user";

export async function POST(request: Request) {
  await dbConnect();

  const { username, content } = await request.json();
  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User Not Found",
        },
        { status: 404 }
      );
    }
    if (!user?.isAcceptmessage) {
      return Response.json(
        {
          success: false,
          message: "User is Not Accepting the message ",
        },
        { status: 403 }
      );
    }

    const newMessage = { content, createdAt: new Date() };
    user.message.push(newMessage as Message);
    return Response.json(
      {
        success: true,
        message: "Message SEND SUCEESFULLY",
      },
      { status: 202 }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message:
          "CANNOT POST MESSAGE WHILE SENDING MESSAGE ERROR IN CATCH PART ROUTER/SENDMESSAGE  ",
        error,
      },
      { status: 500 }
    );
  }
}
