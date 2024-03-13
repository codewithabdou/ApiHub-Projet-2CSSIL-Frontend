const API_INFO = {
  API_BASE_URL: "http://127.0.0.1:5000",
  API_ENDPOINTS: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    ME: "/auth/me",
    ADMIN: {
      GET_USERS: "/users",
      ACTIVATE_USER: ["/users", "/activate"],
      DEACTIVATE_USER: ["/users", "/suspend"],
    },
  },
};

export default API_INFO;
