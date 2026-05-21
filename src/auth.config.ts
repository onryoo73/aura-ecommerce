import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        // This is only used for type safety in middleware, 
        // the actual logic is in auth.ts
        return null
      },
    }),
  ],
} satisfies NextAuthConfig
