import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from "jose"; // استفاده از jose به جای jsonwebtoken به دلیل محیط Edge در Middleware

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ۱. دریافت توکن از کوکی‌ها
  const token = request.cookies.get("access")?.value;

  // مسیرهای تحت حفاظت ادمین و کاربران عادی
  const isAdminRoute = pathname.startsWith("/panel/admin");
  const isDashboardRoute = pathname.startsWith("/panel");
  const isAuthRoute = pathname.startsWith("/auth")

  // ۲. اگر کاربر می‌خواهد به صفحات محافظت‌شده برود
  if (isAdminRoute || isDashboardRoute) {
    if (!token) {
      // اگر توکن وجود نداشت، ریدایرکت به صفحه لاگین
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    try {
      // رمزگشایی توکن با jose (چون jwt بومی در Edge ران‌تایم نکس‌جی‌اس کار نمی‌کند)
      const { payload } = await jose.jwtVerify(token, JWT_SECRET);
      const userRole = payload.role as string;

      // بررسی دسترسی ادمین
      if (isAdminRoute && userRole !== "ADMIN") {
        // اگر روت ادمین بود ولی نقش کاربر ADMIN نبود، هدایت به صفحه معمولی یا ۴۰۳
        return NextResponse.redirect(new URL("/panel", request.url));
      }
    } catch (error) {
      // اگر توکن منقضی یا نامعتبر بود، کوکی را پاک کن و بفرستش لاگین
      const response = NextResponse.redirect(new URL("/auth/login", request.url));
      response.cookies.delete("access");
      return response;
    }
  }

  // ۳. اگر کاربر لاگین کرده و می‌خواهد دوباره به صفحه لاگین/رجیستر برود
  if (isAuthRoute && token) {
    try {
      const { payload } = await jose.jwtVerify(token, JWT_SECRET);
      if (payload.userId) {
        // هدایت مستقیم به داشبورد چون قبلاً لاگین شده است
        return NextResponse.redirect(new URL("/panel", request.url));
      }
    } catch {
      // توکن نامعتبر است، اجازه بده صفحه لاگین باز شود
    }
  }

  return NextResponse.next();
}

// 🎯 ۴. کانفیگ ترافیک: میان‌افزار روی چه مسیرهایی نظارت کند
export const config = {
  matcher: [
    "/panel/:path*",
    "/panel/admin/:path*",
    "/login",
    "/register",
  ],
};