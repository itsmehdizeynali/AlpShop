import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

type BodyDataType = {
  email: string;
  name: string;
  password: string;
  role?: "USER" | "ADMIN";
};

export async function POST(
  req: Request,
  { params }: { params: { auth: string[] } },
) {
  const authParams = await params;
  const action = authParams.auth?.[0];

  const contentType = req.headers.get("content-type") || "";
  let body: BodyDataType = {
    email: "",
    name: "",
    password: "",
  };

  try {
    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      body.email = formData.get("email") as string;
      body.name = formData.get("name") as string;
      body.password = formData.get("password") as string;
      body.role = (formData.get("role") as "USER" | "ADMIN") || "USER";
    } else if (contentType.includes("application/json")) {
      body = await req.json();
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }

  // ==========================================
  // REGISTER
  // ==========================================
  if (action === "register") {
    if (!body.email || !body.password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 },
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const user = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name || null,
        password: hashedPassword,
        role: body.role === "ADMIN" ? "ADMIN" : "USER",
        cart: {
          create: {},
        },
      },
      include: {
        cart: true,
      },
    });

    const { password: _, ...userWithoutPassword } = user;
    return NextResponse.json(
      { user: userWithoutPassword, message: "User created successfully" },
      { status: 201 },
    );
  }

  // ==========================================
  // LOGIN
  // ==========================================
  if (action === "login") {
    if (!body.email || !body.password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 400 },
      );
    }

    const isValid = await bcrypt.compare(body.password, user.password);

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 400 },
      );
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" },
    );
    const { password: _, ...userWithoutPassword } = user;
    const response = NextResponse.json(
      { user: userWithoutPassword, message: "Logged in successfully" },
      { status: 200 },
    );

    response.cookies.set("access", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  }

  // ==========================================
  // LOGOUT
  // ==========================================
  if (action === "logout") {
    const response = NextResponse.json(
      { message: "Logged out successfully" },
      { status: 200 },
    );

    response.cookies.set("access", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      expires: new Date(0),
    });

    return response;
  }

  return NextResponse.json({ error: "Invalid route" }, { status: 404 });
}
