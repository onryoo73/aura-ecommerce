import NextAuth from "next-auth"
import { supabase } from "@/lib/supabase"
import bcrypt from "bcryptjs"
import authConfig from "./auth.config"
import Credentials from "next-auth/providers/credentials"

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log("[AUTH] Missing email or password");
          return null;
        }

        try {
          const { data: user, error } = await supabase
            .from("users")
            .select("*")
            .eq("email", (credentials.email as string).toLowerCase())
            .maybeSingle();

          if (error) {
            console.error("[AUTH] Database query error:", error);
            return null;
          }

          if (!user) {
            console.log("[AUTH] User not found for email:", credentials.email);
            return null;
          }

          if (!user.password) {
            console.log("[AUTH] User has no password hash");
            return null;
          }

          const isValid = await bcrypt.compare(
            credentials.password as string,
            user.password
          );

          if (!isValid) {
            console.log("[AUTH] Password mismatch for email:", credentials.email);
            return null;
          }

          console.log("[AUTH] Login successful for:", credentials.email);
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
            isAdmin: user.is_admin,
          };
        } catch (err) {
          console.error("[AUTH] Unexpected error:", err);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.isAdmin = (user as any).isAdmin
      }
      return token
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
        session.user.isAdmin = token.isAdmin as boolean
      }
      return session
    },
  },
})
