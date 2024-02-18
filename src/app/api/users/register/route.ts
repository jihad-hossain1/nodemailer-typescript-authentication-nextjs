import { connectDatabase } from "@/config/databaseConnection";
import User from "@/models/user.model";
import { validateJSON } from "@/utils/validJSON";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connectDatabase();

export async function POST(request: NextRequest) {
  const requestFromBody = await request.json();
  try {
    // check valid json or not
    const validjson = validateJSON(requestFromBody);

    if (validjson === true) {
      const { fullname, email, password, username } = requestFromBody;

      // check provided field given are not fullname && email && password && username
      if (!(fullname && email && password && username)) {
        return NextResponse.json(
          { message: "fullname || email || password || username are required" },
          { status: 400 }
        );
      }
      // check user are alredy exist or not
      const userExist = await User.findOne({ email: email });

      if (userExist) {
        return NextResponse.json(
          { message: "Email already exist" },
          { status: 400 }
        );
      }
      // passowrd hashed generate
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);

      // save new user on database
      const newUser = new User({
        fullname,
        email,
        password: hashedPassword,
        username,
      });

      const savedUser = await newUser.save();

      return NextResponse.json({
        message: "user created successfully",
        success: true,
        savedUser,
      });
    } else {
      return NextResponse.json({ message: "inavlid fields: ", validjson });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
