// localStorage-based mock authentication

export type UserRole = "team" | "organizer";

export interface AuthUser {
  email: string;
  role: UserRole;
  data: Record<string, unknown>;
}

const USERS_KEY = "huntUsers";
const SESSION_KEY = "huntSession";

function getUsers(): AuthUser[] {
  const raw = localStorage.getItem(USERS_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveUsers(users: AuthUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function register(email: string, password: string, role: UserRole, data: Record<string, unknown>): { success: boolean; error?: string } {
  const users = getUsers();
  if (users.find((u) => u.email === email)) {
    return { success: false, error: "An account with this email already exists." };
  }
  const user: AuthUser = { email, role, data: { ...data, password } };
  users.push(user);
  saveUsers(users);
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  return { success: true };
}

export function login(email: string, password: string): { success: boolean; user?: AuthUser; error?: string } {
  const users = getUsers();
  const user = users.find((u) => u.email === email);
  if (!user) return { success: false, error: "No account found with this email." };
  if ((user.data as any).password !== password) return { success: false, error: "Incorrect password." };
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  return { success: true, user };
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem("huntTeam");
}

export function getSession(): AuthUser | null {
  const raw = localStorage.getItem(SESSION_KEY);
  return raw ? JSON.parse(raw) : null;
}
