import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("access_token")?.value || "";

  const publicPaths = ["/login", "/register"];
  const protectedPaths = ["/home", "/post", "/explore"]; // Adjusted paths

  if (token) {
    // If logged in, prevent access to the login and register pages
    if (publicPaths.includes(pathname) || pathname === "/") {
      return NextResponse.redirect(new URL("/home", req.url));
    }
  } else {
    // If not logged in, restrict access to protected pages
    if (!publicPaths.includes(pathname)) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }
  return NextResponse.next();
}

// Define the routes where this middleware should be applied
export const config = {
  matcher: [
    "/login",
    "/register",
    "/",
    "/home",
    "/post",
    "/explore",
    "/profile",
    "/dashboard/:path*",
  ],
};
