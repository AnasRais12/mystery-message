import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document {
  content: string;
  createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
  },
});
export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerified: boolean;
  isAcceptmessage: boolean;
  message: Message[];
}
const UserSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please use a valid email addressss",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  verifyCode: {
    type: String,
    required: [true, "Verify code  is required"],
  },
  verifyCodeExpiry: {
    type: Date,
    required: [true, "verifyCodeExpiry  is required"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAcceptmessage: {
    type: Boolean,
    default: true,
  },
  message: [MessageSchema],
});

const UserModel = (mongoose.models.User as mongoose.Model<User>  || mongoose.model<User>("User",UserSchema))

export default UserModel