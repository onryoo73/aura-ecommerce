"use server";

import { supabase } from "@/lib/supabase";
import bcrypt from "bcryptjs";

export async function registerUser(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Validate inputs
    if (!email || !password || !name) {
      return { error: "All fields are required" };
    }

    if (password.length < 6) {
      return { error: "Password must be at least 6 characters" };
    }

    // Check if email already exists
    const { data: existingUser, error: queryError } = await supabase
      .from("users")
      .select("id")
      .eq("email", email.toLowerCase())
      .maybeSingle();

    if (queryError && queryError.code !== "PGRST116") {
      console.error("[REGISTER] Query error:", queryError);
      return { error: "Failed to check existing user" };
    }

    if (existingUser) {
      return { error: "Email already registered" };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const { data: newUser, error: insertError } = await supabase
      .from("users")
      .insert({
        name: name.trim(),
        email: email.toLowerCase(),
        password: hashedPassword,
        is_admin: false,
      })
      .select("id")
      .single();

    if (insertError) {
      console.error("[REGISTER] Insert error:", insertError);
      return { error: "Failed to create account. Please try again." };
    }

    if (!newUser) {
      return { error: "Failed to create account" };
    }

    return { success: true };
  } catch (error) {
    console.error("[REGISTER] Unexpected error:", error);
    return { error: "An unexpected error occurred" };
  }
}
