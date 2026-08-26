import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function getAuthUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access")?.value;

  if (!token) return null;

  try {
    // تایید صحت توکن
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    
    return decoded;
  } catch (error) {
    return null;
  }
}