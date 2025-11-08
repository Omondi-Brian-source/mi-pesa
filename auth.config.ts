import { type NextAuthConfig } from "next-auth";
import Email from "next-auth/providers/email";
import Google from "next-auth/providers/google";
import Apple from "next-auth/providers/apple";
import { SupabaseAdapter } from "@next-auth/supabase-adapter";
import { Resend } from "resend";
import { MagicLinkEmail } from "@/lib/email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export const authConfig = {
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY || "",
  }),
  providers: [
    Email({
      from: process.env.EMAIL_FROM || "noreply@mypesa.app",
      maxAge: 24 * 60 * 60, // 24 hours
      async sendVerificationRequest({ identifier, url, provider, theme }) {
        try {
          const result = await resend.emails.send({
            from: process.env.EMAIL_FROM || "noreply@mypesa.app",
            to: identifier,
            subject: "Sign in to myPesa",
            react: MagicLinkEmail({
              url,
              email: identifier,
            }),
          });

          if (!result.data?.id) {
            throw new Error("Failed to send email with Resend");
          }
        } catch (error) {
          console.error("Email send error:", error);
          throw new Error("Could not send email");
        }
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      allowDangerousEmailAccountLinking: true,
    }),
    Apple({
      clientId: process.env.APPLE_ID || "",
      clientSecret: process.env.APPLE_SECRET || "",
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  events: {
    async signIn({ user, account }) {
      console.log(`User ${user.email} signed in`);
    },
  },
} satisfies NextAuthConfig;
