import { sendEmail, sendEmails } from "@/common/sendMail";
import { connectDatabase } from "@/config/databaseConnection";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { email, emailType, userId } = await request.json();
  try {
    // await connectDatabase();
    // // check if user exists !!
    // const user = await User.findOne({ email });

    // if (!user) {
    //   return NextResponse.json({ error: "User not found !!" }, { status: 400 });
    // }

    // send verify email
  const mailresponse =  await sendEmails(email,"Email in Mern stack",`Hello its just a Testing Message ${userId} email for ${emailType}`);
  // const mailresponse =  await sendEmail({ email, emailType, userId });
  
  console.log("🚀 ~ POST ~ mailresponse:", mailresponse)


    return NextResponse.json({
      message: "email send successfully",
      success: true,
      result: mailresponse,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
