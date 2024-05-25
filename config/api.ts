const API_INFO = {
  API_BASE_URL: "http://127.0.0.1:5000",
  API_ENDPOINTS: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    ME: "/auth/me",
    CREATEAPI: "/apis/create",
    GETCATEGORIES: "/apis/categories",
    CREATESUPPLIER: "/users/suppliers",
    ADMIN: {
      GET_USERS: "/users",
      ACTIVATE_USER: ["/users", "/activate"],
      DEACTIVATE_USER: ["/users", "/suspend"],
      GET_APIS: "/apis",
      GET_USER: "/users",
    },
    SUPPLIER: {
      GET_MY_APIS: "/apis/mine",
      ACTIVATE_API: ["/apis", "/activate"],
      DEACTIVATE_API: ["/apis", "/deactivate"],
      ACTIVATE_VERSION: ["/apis", "/versions", "/activate"],
      DEACTIVATE_VERSION: ["/apis", "/versions", "/deactivate"],
    },
    CATEGORIES: {
      GET_CATEGORIES: "/apis/categories",
      CREATE_CATEGORY: "/apis/categories/create",
      DELETE_CATEGORY: "/categories/delete",
      EDIT_CATEGORY: "/categories/edit",
    },
    GENERAL: {
      GET_APIS: "/apis",
    },
    CREATETICKET: "/tickets/create"
    ,
    CREATEAPIVERSION: ["/apis", "/versions/create"],
  },
};

export default API_INFO;
