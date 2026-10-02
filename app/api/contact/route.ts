import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// POST /api/contact  { name, email, subject?, message }
export async function POST(req: Request) {
  const { name, email, subject, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "name, email and message are required" },
      { status: 400 },
    );
  }

  const contactMessage = await prisma.contactMessage.create({
    data: { name, email, subject, message },
  });

  return NextResponse.json(
    { message: "Your message has been sent", contactMessage },
    { status: 201 },
  );
}
