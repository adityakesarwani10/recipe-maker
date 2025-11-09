import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;
  console.log("Middleware Token:", token);

  if (pathname.startsWith('/home') || pathname.startsWith('/profile')) {
    if (!token) {
      console.log("No token found, redirecting to sign-up");
      return NextResponse.redirect(new URL("/sign-up", req.url));
    }

    return NextResponse.next();
  }
  return NextResponse.next();
}

// Protect only certain routes
export const config = {
  matcher: ["/home/:path*", "/profile/:path*"],
};
