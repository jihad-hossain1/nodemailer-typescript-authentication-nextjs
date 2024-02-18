import { validateJSON } from "@/utils/validJSON";
import { connectDatabase } from "@/config/databaseConnection";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connectDatabase();

export async function POST(request: NextRequest) {
  try {
    const requestFromBody = await request.json();
    // check valid json or not
    const validjson = validateJSON(requestFromBody);

    if (validjson === true) {
      const { email, password } = requestFromBody;

      if (!(email && password)) {
        return NextResponse.json(
          { message: "email & passowrd require " },
          { status: 400 }
        );
      }

      const user = await User.findOne({ email: email });
      if (!user) {
        return NextResponse.json(
          { message: "user dose not exist " },
          { status: 400 }
        );
      }

      // console.log("user from user", user);

      const comparePassword = await bcryptjs.compare(password, user.password);

      // console.log("user from comparePassword", comparePassword);

      if (!comparePassword) {
        return NextResponse.json(
          { message: "Invalid password" },
          { status: 400 }
        );
      }

      const tokenData = {
        id: user._id,
        username: user.username,
        fullname: user.fullname,
        email: user.email,
      };

      console.log("user from tokendata", tokenData);

      const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
        expiresIn: "5m",
      });

      const response = NextResponse.json({
        message: "login successfull",
        success: true,
      });

      response.cookies.set("token", token, {
        httpOnly: false,
      });

      return response;
    } else {
      return NextResponse.json(
        { message: "inavlid fields: ", validjson },
        { status: 401 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
