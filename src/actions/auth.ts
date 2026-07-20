"use server";

import { redirect } from "next/navigation";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { hashPassword, verifyPassword, setSessionCookie, clearSessionCookie } from "@/lib/auth";
import { loginSchema, registerSchema } from "@/lib/validations";

export type ActionResult = { success: boolean; message: string };

export async function registerUser(formData: FormData): Promise<ActionResult> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  const parsed = registerSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  try {
    await connectToDatabase();
    const existing = await User.findOne({ email: parsed.data.email });
    if (existing) return { success: false, message: "An account with this email already exists." };

    const passwordHash = await hashPassword(parsed.data.password);
    const user = await User.create({
      name: parsed.data.name,
      email: parsed.data.email,
      passwordHash,
    });

    await setSessionCookie({
      userId: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    return {
      success: false,
      message:
        err instanceof Error && err.message.includes("MONGODB_URI")
          ? "Database isn't connected yet — add MONGODB_URI to .env.local to enable real accounts."
          : "Something went wrong while creating your account.",
    };
  }

  redirect("/dashboard");
}

export async function loginUser(formData: FormData): Promise<ActionResult> {
  const raw = { email: formData.get("email"), password: formData.get("password") };
  const parsed = loginSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  try {
    await connectToDatabase();
    const user = await User.findOne({ email: parsed.data.email });
    if (!user) return { success: false, message: "Invalid email or password." };

    const valid = await verifyPassword(parsed.data.password, user.passwordHash);
    if (!valid) return { success: false, message: "Invalid email or password." };

    await setSessionCookie({
      userId: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    return {
      success: false,
      message:
        err instanceof Error && err.message.includes("MONGODB_URI")
          ? "Database isn't connected yet — add MONGODB_URI to .env.local to enable real accounts."
          : "Something went wrong while logging in.",
    };
  }

  redirect("/dashboard");
}

export async function logoutUser() {
  await clearSessionCookie();
  redirect("/login");
}
