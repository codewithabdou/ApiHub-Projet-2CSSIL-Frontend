import { routesAuthorization } from "@config";
import User from "@typings/entities/User";

// Group authorization-related logic for clarity
const authorization = {
  shouldRedirectToUserRolePath(
    extractedPath: string,
    user: User | null
  ): boolean {
    return (
      (extractedPath.startsWith("/auth") || extractedPath === "/") &&
      user !== null
    );
  },

  shouldHandleAuthRequest(extractedPath: string, user: User | null): boolean {
    return extractedPath.startsWith("/auth") && user === null;
  },

  shouldHandleRoleSpecificRequest(
    extractedPath: string,
    user: User | null
  ): boolean {
    const authorizedRoutes = routesAuthorization[user?.role || ""];
    return (
      authorizedRoutes &&
      authorizedRoutes.some((route) => extractedPath.startsWith(route))
    );
  },

  shouldRedirectToNotFound(extractedPath: string, user: User | null): boolean {
    const authorizedRoutes = routesAuthorization[user?.role || ""];
    return !authorizedRoutes || !authorizedRoutes.includes(extractedPath);
  },
};

export default authorization;
