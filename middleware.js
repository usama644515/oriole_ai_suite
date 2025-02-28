import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;

  const protectedRoutes = ["/dashboard", "/ai-models", "/settings", "/live-cameras"];

  if (protectedRoutes.includes(req.nextUrl.pathname) && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/ai-models", "/settings", "/live-cameras"],
};
