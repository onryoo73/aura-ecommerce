"use server";

import { supabase } from "@/lib/supabase";
import bcrypt from "bcryptjs";

export async function registerUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password || !name) {
    return { error: "Missing fields" };
  }

  const { data: existingUser, error: existingError } = await supabase
    .from("users")
    .select("id")
    .eq("email", email)
    .single();

  if (existingUser) {
    return { error: "Email already exists" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const { error: insertError } = await supabase.from("users").insert({
    name,
    email,
    password: hashedPassword,
  });

  if (insertError) {
    console.error("[REGISTER_ERROR]", insertError);
    return { error: "Failed to create account" };
  }

  return { success: true };
}
