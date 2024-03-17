const API_INFO = {
  API_BASE_URL: "http://127.0.0.1:5000",
  API_ENDPOINTS: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    ME: "/auth/me",
    CREATESUPPLIER:"/users/suppliers",
    ADMIN: {
      GET_USERS: "/users",
      ACTIVATE_USER: ["/users", "/activate"],
      DEACTIVATE_USER: ["/users", "/suspend"],
    },
    CATEGORIES: {
      GET_CATEGORIES: "/apis/categories",
      CREATE_CATEGORY: "/apis/categories/create",
      DELETE_CATEGORY: "/categories/delete",
    },
  },
};

export default API_INFO;
