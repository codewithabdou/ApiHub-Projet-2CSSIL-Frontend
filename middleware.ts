import { NextRequest, NextResponse } from "next/server";
import User from "@typings/entities/User";
import { getLoggedInUser } from "@services/authentication.service";
import authorization from "@services/authorizations.service";
import { cookies } from "next/headers";

/**
 * Middleware function to handle route authorization.
 * @param request - The incoming NextRequest.
 * @returns A Promise of NextResponse.
 */
export default async function middleware(
  request: NextRequest
): Promise<NextResponse> {
  // Extract pathname and clone URL for modifications.
  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone();

  // Get the currently logged-in user.
  const userRole: string | undefined = cookies().get("role")?.value;
  const UserIsNotAuthenticated: boolean = !userRole || !userRole.length;

  // Check if the current route is a protected route.
  if (authorization.isProtectedRoute(pathname)) {
    // If the user is not logged in or is not authorized, redirect to not found.
    if (
      UserIsNotAuthenticated ||
      !authorization.isUserAuthorized(userRole, pathname)
    ) {
      return redirectToNotFound(url);
    }
  } else if (authorization.isAuthRoute(pathname)) {
    // If it's an authentication route and the user is logged in, redirect based on user's role.
    if (!UserIsNotAuthenticated) {
      url.pathname = `/${userRole}`;
      return NextResponse.redirect(url);
    }
  } else {
    // If the route is neither protected nor an authentication route, proceed to the next handler.
    return NextResponse.next();
  }

  // Proceed to the next handler for other cases.
  return NextResponse.next();
}

/**
 * Redirects to the "/not-found" route.
 * @param url - The URL object to modify for the redirection.
 * @returns A NextResponse for redirecting to the "/not-found" route.
 */
function redirectToNotFound(url: URL): NextResponse {
  url.pathname = "/not-found";
  return NextResponse.redirect(url);
}

// Configuration for the middleware, specifying the path matcher.
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
