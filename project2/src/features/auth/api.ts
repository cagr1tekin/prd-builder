import axios from "axios";
import type { LoginCredentials, User } from "./types";

const api = axios.create({ baseURL: "/api" });

export async function loginRequest(credentials: LoginCredentials): Promise<User> {
  const { data } = await api.post<User>("/auth/login", credentials);
  return data;
}

export async function logoutRequest(): Promise<void> {
  await api.post("/auth/logout");
}
