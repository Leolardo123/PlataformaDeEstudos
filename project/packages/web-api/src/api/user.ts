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
  register({ name, email, password }: RegisterRequest) {
    return apiRequest<RegisterResponse>("/users", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });
  },
};
