import { NextRequest, NextResponse } from "next/server";
import { connectDatabase } from "@/config/databaseConnection";
import User from "@/models/user.model";

connectDatabase();

export async function POST(request: NextRequest) {
  try {
    const requestFromBody = await request.json();
    const { token } = requestFromBody;
    console.log(token);

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ message: "inavalid token" }, { status: 400 });
    }

    console.log(user);

    user.isVerfied = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({
      message: "Email verifyed successfull",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
