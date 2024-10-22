import UserModel from "@/model/user";
import { z } from "zod";
import dbConnect from "@/lib/dbConnect";
import { userNameValidation } from "@/schema/signupScheam";

const userNameQuery = z.object({
  username: userNameValidation,
});

export async function GET(request: Request) {
  await dbConnect();
  try {
    const { searchParams } = new URL(request.url);
    const queryParam = {
      username: searchParams.get("username"),
    };
    const result = userNameQuery.safeParse(queryParam);
    console.log(result);
    
    // Error handling for invalid query
    if (!result.success) {
      const userNameError = result.error.format().username?._errors || [];
      return Response.json({
        success: false,
        message: "Invalid Query",
        userNameError,
      }, { status: 404 });  // Use correct format for response status
    }

    const { username } = result.data;

    // Check if username is already taken
    const existingUser = await UserModel.findOne({
      username,
      isVerified: true,
    });
    
    if (existingUser) {
      return Response.json({
        success: false,
        message: "Username is already taken",
      }, { status: 409 });  // Use correct format for response status
    }

    // If username is available
    return Response.json({
      success: true,
      message: "Username is available",
    }, { status: 200 });  // Use correct format for response status
  } catch (error) {
    console.error("Error Checking in Username ", error);
    return Response.json({ 
      success: false, 
      message: "Error Checking Username" 
    }, { status: 500 });  // Use correct format for response status
  }
}


// 


// import UserModel from "@/model/user";
// import { z } from "zod";
// import dbConnect from "@/lib/dbConnect";
// import { userNameValidation } from "@/schema/signupScheam";

// const userNameQuery = z.object({
//   username: userNameValidation,
// });

// export async function GET(request: Request) {
//   await dbConnect();
//   try {
//     const { searchParams } = new URL(request.url);
//     const queryParam = {
//       username: searchParams.get("username"),
//     };
//     const result = userNameQuery.safeParse(queryParam);
//     console.log(result);
//     if (!result.success) {
//       const userNameError = result.error.format().username?._errors || [];

//       return (
//         Response.json({
//           sucess: false,
//           message: "Invalid Query",
//           userNameError,
//         }),
//         { status: 404 }
//       );
//     }

//     const { username } = result.data;

//     const existingUser = await UserModel.findOne({
//       username,
//       isVerified: true,
//     });
//     if (existingUser) {
//       return (
//         Response.json({
//           sucess: false,
//           message: "Username is already taken",
//         }),
//         { status: 409 }
//       );
//     }

    
//       Response.json({
//         sucess: true,
//         message: "Username is avalible",
//       }),
//       { status: 200 }
   
//   } catch (error) {
//     console.error("Error Checking in Username ", error);

//     return (
//       Response.json({ success: false, message: "Error Checking Username" }),
//       { status: 500 }
//     );
//   }
// }