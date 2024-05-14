import type { NextAuthConfig } from "next-auth"
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { db } from "./db/db"
import { DrizzleAdapter } from "@auth/drizzle-adapter"

export const authConfig = {
  adapter: DrizzleAdapter(db),
  providers: [GitHub],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user

      const paths = ['/']
      const isProtected = paths.some((path) => nextUrl.pathname.startsWith(path))

      if (isProtected && !isLoggedIn) {
        const redirectUrl = new URL("api/auth/signin", nextUrl.origin)
        redirectUrl.searchParams.append('callbackURL', nextUrl.href)
        return Response.redirect(redirectUrl)
      }
      return true
    },
  }
} satisfies NextAuthConfig

export const {
  handlers,
  auth,
  signOut
} = NextAuth(authConfig)


