import { prisma } from "./prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export async function createSession(userId: string): Promise<string> {
  const expiresAt = new Date(Date.now() + SESSION_DURATION);
  const token = crypto.randomUUID();

  await prisma.session.create({
    data: {
      userId,
      token,
      expiresAt,
    },
  });

  return token;
}

export async function getSession(): Promise<{
  userId: string;
  user: { id: string; username: string; role: string };
} | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("session_token")?.value;

  if (!token) return null;

  try {
    const session = await prisma.session.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!session || session.expiresAt < new Date()) {
      await prisma.session.deleteMany({ where: { token } });
      return null;
    }

    return {
      userId: session.userId,
      user: {
        id: session.user.id,
        username: session.user.username,
        role: session.user.role,
      },
    };
  } catch {
    return null;
  }
}

export async function deleteSession(token: string): Promise<void> {
  await prisma.session.deleteMany({ where: { token } });
}

export async function login(username: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isValid = await verifyPassword(password, user.password);
  if (!isValid) {
    throw new Error("Invalid credentials");
  }

  const sessionToken = await createSession(user.id);
  const cookieStore = await cookies();

  // cookieStore.set("session_token", sessionToken, {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === "production",
  //   sameSite: "lax",
  //   maxAge: SESSION_DURATION / 1000,
  //   path: "/",
  // });

  cookieStore.set("session_token", sessionToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: SESSION_DURATION / 1000,
    path: "/",
  });

  return {
    user: {
      id: user.id,
      username: user.username,
      role: user.role,
    },
  };
}

export async function logout() {
  const session = await getSession();
  if (session) {
    const cookieStore = await cookies();
    const token = cookieStore.get("session_token")?.value;
    if (token) {
      await deleteSession(token);
    }
    cookieStore.delete("session_token");
  }
}

export async function requireAuth() {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  return session;
}

export async function requireAdmin() {
  const session = await requireAuth();
  if (session.user.role !== "ADMIN") {
    throw new Error("Forbidden");
  }
  return session;
}
