export interface LoginResponse {
  message: string;
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
    role: string; // "admin" | "faculty" | "student"
  };
}

export interface LoginError {
  message: string;
}

export async function loginUser(
  email: string,
  password: string
): Promise<LoginResponse> {
  const res = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data as LoginResponse;
}

export function saveSession(data: LoginResponse) {
  if (typeof window === "undefined") return;
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));
}

export function getRedirectPath(role: string): string {
  switch (role.toLowerCase()) {
    case "student": return "http://localhost:3000/";
case "faculty": return "http://localhost:3001/";
case "admin":   return "http://localhost:3002/";
default: return "http://localhost:3000/";
  }
}
