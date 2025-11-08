import Email from "next-auth/providers/email";
import Google from "next-auth/providers/google";
import Apple from "next-auth/providers/apple";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const authConfig = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt" as const,
  },
  providers: [
    Email({
      server: {
        host: "smtp.resend.com",
        port: 465,
        auth: {
          user: "resend",
          pass: process.env.RESEND_API_KEY,
        },
      },
      from: process.env.EMAIL_FROM || "onboarding@resend.dev",
      maxAge: 24 * 60 * 60, // 24 hours
      async sendVerificationRequest({ identifier: email, url, expires, provider, theme }) {
        try {
          const result = await resend.emails.send({
            from: process.env.EMAIL_FROM || "onboarding@resend.dev",
            to: email,
            subject: "Sign in to myPesa",
            html: `
              <h1>Welcome to myPesa</h1>
              <p>Click the link below to sign in:</p>
              <a href="${url}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">
                Sign in to myPesa
              </a>
              <p>Or copy and paste this link:</p>
              <p><code>${url}</code></p>
              <p>This link will expire in 24 hours.</p>
              <p>If you didn't request this link, you can safely ignore this email.</p>
            `,
            text: `Sign in to myPesa\n\nClick here to sign in:\n${url}\n\nOr copy and paste this link:\n${url}\n\nThis link will expire in 24 hours.\n\nIf you didn't request this link, you can safely ignore this email.`,
          });

          if (!result.data?.id) {
            throw new Error("Failed to send email");
          }
        } catch (error) {
          console.error("Error sending verification email:", error);
          throw new Error("Could not send verification email");
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
    async session({ session, token }: any) {
      if (session.user) {
        (session.user as any).id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }: any) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
  events: {
    async signIn({ user, account }: any) {
      console.log(`User ${user.email} signed in`);
    },
  },
} as any;
