import connectToDB from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectToDB();
    const { email, password } = await request.json();
    const userExists = await User.findOne({ email });
    if (!userExists) {
      return NextResponse.json(
        { error: "user not registered" },
        { status: 401 }
      );
    }
    const checkPwd = await bcrypt.compare(password, userExists.password);
    if (!checkPwd) {
      return NextResponse.json(
        {
          error: "Wrong password",
        },
        { status: 401 }
      );
    }
    return NextResponse.json({
      message: "success",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ error: "POST error", status: 400 });
  }
}
