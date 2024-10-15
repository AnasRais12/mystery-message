import { resend } from "@/lib/resend";
import VerificationEmail from "../../email/verificationEmail";
import { ApiResponse } from "@/types/apiResponse";

export async function sendVerification(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: "Mystery Message Verfication Code",
      react: VerificationEmail({ username: username, otp: verifyCode }),
    });
    return { success: true, message: " The verification code has been successfully provided by the user" };
  } catch (emailError) {
    console.error("Error surrounding in emails", emailError);
    return { success: false, message: "Faild to send verfication" };
  }
}
