import axios from "axios";

type SignIn = { email: string; password: string };
type User = { id: string; email: string };

// Fixed API Base URL for development
const API_BASE_URL = "http://localhost:4004/api";

// Set axios base URL once at the start
axios.defaults.baseURL = API_BASE_URL;

export const testApiConnection = async (): Promise<string> => {
  try {
    const response = await axios.get(`/ping`);
    if (response.status === 200) {
      console.log("✅ API is available at", API_BASE_URL);
      return API_BASE_URL;
    }
  } catch (err) {
    console.error("❌ API connection failed at", API_BASE_URL, err);
  }
  return API_BASE_URL;
};

export const validateTokenOnInit = async (): Promise<boolean> => {
  const savedToken = localStorage.getItem("token");
  if (!savedToken) return false;

  axios.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;
  return validToken(savedToken);
};

export const validToken = async (token: string): Promise<boolean> => {
  try {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await axios.post(`/users/refresh`);
    const { token: newToken } = response.data.data;

    if (typeof window !== "undefined") {
      localStorage.setItem("token", newToken);
    }

    axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
    return true;
  } catch (err: any) {
    console.error("Token validation error:", err.response?.data?.message || err.message);
    localStorage.removeItem("token");
    return false;
  }
};

export const login = async (props: SignIn): Promise<{ token: string; user: User }> => {
  const { email, password } = props;
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const response = await axios.post(`/users/login`, { email, password });
  const { token, user } = response.data.data;

  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
  }

  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return { token, user };
};

export const register = async (props: SignIn): Promise<void> => {
  const { email, password } = props;
  if (!email || !password) {
    throw new Error("Email and password are required");
  }
  await axios.post(`/users/register`, { email, password });
};

export const updateUser = async (
  props: { email?: string; password?: string },
  token: string
): Promise<User> => {
  const response = await axios.put(
    `/users/me`,
    props,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data.data.user;
};

export const deleteUser = async (token: string): Promise<void> => {
  try {
    await axios.delete(`/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
  } catch (err: any) {
    throw new Error(err.response?.data?.message || "Failed to delete user");
  }
};


export const refreshToken = async (refreshToken: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/refresh`, { refreshToken });
    return response.data;  // Should include new token, maybe user info
  } catch (error) {
    throw new Error("Failed to refresh token");
  }
};