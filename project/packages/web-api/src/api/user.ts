import { apiRequest } from "./core";

interface RegisterResponse {
  accessToken: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export const userApi = {
  validateEmail({ token }: { token: string }) {
    return apiRequest("/users/validate-email", {
      method: "POST",
      body: JSON.stringify({ token }),
    });
  },
  resendValidateEmail({ email, role }: { email: string; role: string }) {
    return apiRequest("/users/resend-validate-email", {
      method: "POST",
      body: JSON.stringify({ email, role }),
    });
  },
  register({ name, email, password }: RegisterRequest) {
    return apiRequest<RegisterResponse>("/users", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });
  },
};
