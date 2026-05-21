"use client";

import { signIn, signOut } from "next-auth/react";

export async function loginWithCredentials(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/",
    });
    return { success: true };
  } catch (error) {
    return { error: "Invalid credentials" };
  }
}

export async function logout() {
  await signOut({ callbackUrl: "/" });
}
