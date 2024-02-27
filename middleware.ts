import createIntlMiddleware from "next-intl/middleware";
import { locales, localePrefix } from "./navigation";
import { NextRequest, NextResponse } from "next/server";
import { getExtractedPath } from "@helpers";
import authorization from "@services/authorizations.service";

import User from "@typings/entities/User";
import { cookies } from "next/headers";

export const config = {
  matcher: [
    "/",
    "/auth/:path*",
    "/admin/:path*",
    "/hub/:path*",
    "/provider/:path*",
    "/not-found/:path*", // 404 page
    "/(fr|en|ar)/:path*",
  ],
};

export default async function middleware(
  request: NextRequest
): Promise<NextResponse> {
  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone();
  const extractedPath = getExtractedPath(pathname);
  console.log(extractedPath);
  const user = getUser(); //TODO :  Replace with a real user fetching mechanism

  if (authorization.shouldRedirectToUserRolePath(extractedPath, user)) {
    url.pathname = `/${user?.role}`;
    return NextResponse.redirect(url);
  }

  if (
    authorization.shouldHandleAuthRequest(extractedPath, user) ||
    authorization.shouldHandleRoleSpecificRequest(extractedPath, user) ||
    extractedPath.startsWith("/not-found") ||
    (extractedPath === "/" && user === null)
  ) {
    // Handle internationalization authorization directly
    return intlAuthorize(request);
  }

  if (authorization.shouldRedirectToNotFound(extractedPath, user)) {
    url.pathname = "/not-found";
    return NextResponse.redirect(url);
  }

  // Default: handle internationalization authorization
  return intlAuthorize(request);
}

const intlAuthorize = (request: NextRequest): NextResponse =>
  createIntlMiddleware({
    defaultLocale: "en",
    localePrefix,
    locales,
  })(request);

function getUser(): User | null {
  // Replace with a real user fetching mechanism
  if (!cookies().get("user")) return null;
  return {
    role: cookies().get("user")?.value as string,
    name: "abdou",
    email: "",
  };
}
