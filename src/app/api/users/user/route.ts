import { getUserInfoFromToken } from "@/common/userInfo";
import { connectDatabase } from "@/config/databaseConnection";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

connectDatabase();

export async function GET(request: NextRequest) {
  try {
    // console.log("current useerId: ", request);
    const userId = await getUserInfoFromToken(request);

    const user = await User.findOne({ _id: userId }).select("-password");
    // console.log("current useer: ", user);

    return NextResponse.json({
      message: "user found",
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
