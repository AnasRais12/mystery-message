import { createGoogleGenerativeAI } from '@ai-sdk/google';
import {google} from '@ai-sdk/google'
// import { GeminiError } from "gemini/index.mjs";
import { streamText } from "ai";

// Gemini provider ka instance create karna
const gemini = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_APIKEY,
//   compatibility: "strict", // strict mode enable karte hain agar Gemini API ka istemal kar rahe hain
});

// Function to handle POST request
export async function POST(res: Response) {
  try {
    const prompt =
      "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. Three questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes and encouraging friendly interactions. For example, your output should be structured like this: 'What's a hobby you've recently started? || If you could have dinner with a historical figure, who would it be? || What's a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

    // Language model ko call karna
    const result = await streamText({
      model: gemini("gemini-1.5-flash"), // yahan model ka naam specify karein
      messages: [{ role: "user", content: prompt }],
      maxTokens: 15,
      async onFinish({ text }) {
        console.log("Response:", text);
      },
    });
    console.log("Result:", result);

    // Stream ka response return karna
    return Response.json(
        {
          success: true,
          message: "Message Status Updatance Succesfully",
          result
        },
        { status: 200 }
      ); 
  } catch (error) {
    // if (error instanceof GeminiError) {
    //   return new Response(
        // 
    //     JSON.stringify({
    //       error:
    //         (error.stack && error.message && error.name) ||
    //         "Error message in GEMINI",
    //     }),
    //     {
    //       headers: { "Content-Type": "application/json" },
    //     }
    //   );
    // } else {
    //   console.error("An expected error in routes suggest message ", error);
    //   throw error;
    // }
    return Response.json(
        {
          success: true,
          message: "Message Status Updatance Succesfully",
          error,
        },
        { status: 500 }
      ); 
    //   throw error;
  }
}
