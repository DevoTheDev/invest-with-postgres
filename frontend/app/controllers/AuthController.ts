import axios from "axios";
import { error } from "console";

type SignIn = { email: string; password: string };
type User = { id: string; email: string };

const PORTS = [4004, 3001];
const BASE_PATH = "/api";
let dynamicBaseURL = "";

export const testApiConnection = async (): Promise<string> => {
  for (const port of PORTS) {
    const url = `http://localhost:${port}${BASE_PATH}/ping`;
    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        dynamicBaseURL = `http://localhost:${port}${BASE_PATH}`;
        axios.defaults.baseURL = dynamicBaseURL; // Set axios baseURL here
        return dynamicBaseURL;
      }
    } catch {
      // skip silently
    }
  }

  dynamicBaseURL = `http://localhost:${PORTS[PORTS.length - 1]}${BASE_PATH}`;
  axios.defaults.baseURL = dynamicBaseURL;
  console.error("❌ Failed to connect to any backend API. Using default:", dynamicBaseURL);
  return dynamicBaseURL;
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
    const { token: newToken, user } = response.data.data;

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

export const login = async (props: SignIn): Promise<any> => {
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
  const { user } = response.data.data;

  return user;
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
    const errorMessage = err.response?.data?.message || "Failed to delete user";
    throw new Error(errorMessage);
  }
};
