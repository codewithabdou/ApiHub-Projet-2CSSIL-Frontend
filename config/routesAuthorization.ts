const routesAuthorization: Record<string, string[]> = {
  user: ["/user", "/"],
  admin: [
    "/admin",
    "/",
    "/admin/users",
    "/admin/suppliers",
    "/admin/profil",
    "/admin/statistics",
    "/admin/settings",
    "/admin/categories",
    // Dynamic category authorization
    "/admin/categories/:categoryId",
  ],
  supplier: ["/supplier", "/", "/supplier/apis"],
};

export default routesAuthorization;
