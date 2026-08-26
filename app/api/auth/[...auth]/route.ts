import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

type bodyDataType = {
  email: string;
  name: string;
  password: string;
  role?: "USER" | "ADMIN"; // 👈 اضافه شدن آپشن رول به تایپ بادی
};

export async function POST(
  req: Request,
  { params }: { params: { auth: string[] } },
) {
  const authParams = await params;
  const action = authParams.auth?.[0];

  const contentType = req.headers.get("content-type") || "";
  let body: bodyDataType = {
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
      body.role = (formData.get("role") as "USER" | "ADMIN") || "USER"; // 👈 دریافت رول از فرم‌دیتا
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
        role: body.role === "ADMIN" ? "ADMIN" : "USER", // 👈 ذخیره نقش ادمین یا کاربر معمولی در دیتابیس
        wallet: {
          create: {
            balance: 0,
          },
        },
      },
      include: {
        wallet: true,
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
      include: { wallet: true },
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

    // ۱. ساخت نوتیفیکیشن خودکار لاگین
    await prisma.notification.create({
      data: {
        userId: user.id,
        title: "New Login Detected",
        message: "You have successfully logged into your account.",
      },
    });

    // ۲. ساخت رویداد تقویم برای لاگین
    await prisma.calendarEvent.create({
      data: {
        userId: user.id,
        title: "User Login",
        description: "Logged into the system successfully.",
        startDate: new Date(),
        endDate: new Date(),
        type: "CUSTOM",
        color: "#10b981",
      },
    });

    // 🔑 ۳. قرار دادن نقش کاربر (role) در توکن برای امنیت روت‌های حساس
    const token = jwt.sign(
      { userId: user.id, role: user.role }, // 👈 اضافه شدن نقش به توکن
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
