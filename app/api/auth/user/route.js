import connect from '@utils/db';
import User from '@models/User';
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { name, email, image } = await request.json();
  await connect();
  await User.create({ name, email, image });
  return NextResponse.json({ message: "User Registered" }, { status: 201 });
}