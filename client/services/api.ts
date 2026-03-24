/// <reference types="vite/client"/>
import type { Session } from "../../shared/types.js";
import {authService} from "./authService.js";

export const BASE_URL = import.meta.env.DEV ? "http://localhost:3000/api" : "/api";

// helper function for headers
function getHeaders(){
  const token = authService.getToken();
  return{
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  }
}
async function handleJson<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Request failed with ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export async function getSessions(): Promise<Session[]> {
  const res = await fetch(`${BASE_URL}/exercises`, {
    headers: getHeaders(),
  });
  return handleJson<Session[]>(res);
}

export async function addSession(session: Session): Promise<Session> {
  const res = await fetch(`${BASE_URL}/exercises`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(session),
  });
  return handleJson<Session>(res);
}

export async function updateSession(id: string, data: Partial<Session>): Promise<{ message: string }> {
  const res = await fetch(`${BASE_URL}/exercises/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  return handleJson<{ message: string }>(res);
}

export async function deleteSession(id: string): Promise<{ message: string }> {
  const res = await fetch(`${BASE_URL}/exercises/${id}`, {
    method: "DELETE",
    headers: getHeaders()
  });
  return handleJson<{ message: string }>(res);
}
