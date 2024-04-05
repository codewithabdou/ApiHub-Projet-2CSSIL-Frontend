import { routesAuthorization } from "@config";
import User from "@typings/entities/User";

const authorization = {
  /**
   * Checks if the given pathname corresponds to a protected route.
   * @param pathname - The pathname to check.
   * @returns True if the pathname is a protected route, otherwise false.
   */
  isProtectedRoute(pathname: string): boolean {
    // Construct a regex pattern for protected routes based on the keys in routesAuthorization.
    const protectedRoutesPattern = new RegExp(
      `^\\/(?:${Object.keys(routesAuthorization).join("|")})($|\\/)`
    );
    // Test if the pathname matches the protected routes pattern.
    return protectedRoutesPattern.test(pathname);
  },

  /**
   * Checks if the given user is authorized to access the specified pathname.
   * @param user - The user object, or null if the user is not logged in.
   * @param pathname - The pathname to check authorization for.
   * @returns True if the user is authorized, otherwise false.
   */

  // Original one.
  // isUserAuthorized(user: User | null, pathname: string): boolean {
  //   // Get the list of authorized routes for the user's role from routesAuthorization.
  //   const authorizedRoutes = routesAuthorization[user?.role || ""];
  //   // Check if the pathname is included in the authorized routes.
  //   return authorizedRoutes?.includes(pathname) ?? false;
  // },

  // new one made by Ilyes.
  isUserAuthorized(userRole: string | undefined, pathname: string): boolean {
    // Get the list of authorized routes for the user's role from routesAuthorization.
    const authorizedRoutes = routesAuthorization[userRole || ""];

    // Check if the pathname matches any of the authorized routes.
    const isAuthorized =
      authorizedRoutes?.some((route) => {
        // Replace dynamic parameters in the route with a regex pattern that matches any value.
        const routeRegex = new RegExp(route.replace(/:[^/]+/g, "[^/]+"));
        return routeRegex.test(pathname);
      }) ?? false;

    return isAuthorized;
  },

  /**
   * Checks if the given pathname corresponds to an authentication route.
   * @param pathname - The pathname to check.
   * @returns True if the pathname is an authentication route, otherwise false.
   */
  isAuthRoute(pathname: string): boolean {
    // Use a regex pattern to check if the pathname matches the authentication route pattern.
    return /^\/auth\/(login|register)($|\/)/.test(pathname);
  },
};

export default authorization;
