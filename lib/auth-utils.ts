import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export type AuthPayload = {
  userId: string;
  role: "USER" | "ADMIN";
};

// Reads the "access" cookie and verifies the JWT.
// Returns null when the user is not authenticated or the token is invalid/expired.
export async function getAuthUser(): Promise<AuthPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("access")?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthPayload;
    return decoded;
  } catch (error) {
    return null;
  }
}

export async function requireAdmin(): Promise<AuthPayload | null> {
  const user = await getAuthUser();
  if (!user || user.role !== "ADMIN") return null;
  return user;
}
