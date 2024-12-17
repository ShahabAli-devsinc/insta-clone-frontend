import { NextResponse } from "next/server";

export async function middleware(req: any) {
  const { pathname } = req.nextUrl;

  // Parse the cookies
  const token = req.cookies.get("access_token")?.value || "";

  if (token) {
    // If logged in, prevent access to the login and register pages
    if (pathname === "/login" || pathname === "/register" || pathname === "/") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  } else {
    // If not logged in, restrict access to protected pages
    if (pathname !== "/login" && pathname !== "/register") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // Allow the request to continue if no redirection is needed
  return NextResponse.next();
}

// Define the routes where this middleware should be applied
export const config = {
  matcher: ["/login", "/register", "/", "/dashboard/:path*"],
};
