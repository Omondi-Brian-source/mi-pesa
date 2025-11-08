import * as React from "react";

interface MagicLinkEmailProps {
  url: string;
  email: string;
}

export const MagicLinkEmail: React.FC<Readonly<MagicLinkEmailProps>> = ({
  url,
  email,
}) => (
  <html>
    <head>
      <meta charSet="utf-8" />
      <style>
        {`
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
            line-height: 1.5;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
          }
          .logo {
            font-size: 24px;
            font-weight: bold;
            color: #000;
          }
          .content {
            background-color: #f9fafb;
            border-radius: 8px;
            padding: 30px;
            margin-bottom: 20px;
          }
          .greeting {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 15px;
          }
          .message {
            color: #666;
            margin-bottom: 30px;
          }
          .button {
            display: inline-block;
            background-color: #000;
            color: #fff;
            padding: 12px 30px;
            border-radius: 6px;
            text-decoration: none;
            font-weight: 600;
            margin-bottom: 20px;
          }
          .button:hover {
            background-color: #222;
          }
          .alt-link {
            font-size: 14px;
            color: #999;
            word-break: break-all;
          }
          .footer {
            text-align: center;
            color: #999;
            font-size: 12px;
            border-top: 1px solid #eee;
            padding-top: 20px;
            margin-top: 30px;
          }
          .expiry-notice {
            background-color: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 12px;
            margin-bottom: 20px;
            border-radius: 4px;
            font-size: 14px;
          }
        `}
      </style>
    </head>
    <body>
      <div className="container">
        <div className="header">
          <div className="logo">📱 myPesa</div>
        </div>

        <div className="content">
          <div className="greeting">Sign In to Your Account</div>

          <div className="message">
            Someone requested a magic sign-in link for the email address{" "}
            <strong>{email}</strong>. If this was you, click the button below to
            sign in:
          </div>

          <div style={{ marginBottom: "20px" }}>
            <a href={url} className="button">
              Sign In
            </a>
          </div>

          <div className="expiry-notice">
            This link will expire in 24 hours for security reasons.
          </div>

          <div className="alt-link">
            Or copy and paste this link in your browser:
            <br />
            <a href={url} style={{ color: "#0066cc" }}>
              {url}
            </a>
          </div>
        </div>

        <div style={{ marginBottom: "20px", fontSize: "14px", color: "#666" }}>
          <p>
            <strong>Didn't request this email?</strong> You can safely ignore it
            if you didn't request a magic link. Your account is secure.
          </p>
        </div>

        <div className="footer">
          <p>© 2025 myPesa. All rights reserved.</p>
          <p>
            <a
              href="https://mypesa.app/privacy"
              style={{ color: "#999", textDecoration: "none" }}
            >
              Privacy Policy
            </a>{" "}
            •{" "}
            <a
              href="https://mypesa.app/terms"
              style={{ color: "#999", textDecoration: "none" }}
            >
              Terms of Service
            </a>
          </p>
        </div>
      </div>
    </body>
  </html>
);

export const MagicLinkEmailPlainText = ({ url, email }: MagicLinkEmailProps) => `
Sign In to Your Account

Someone requested a magic sign-in link for the email address ${email}. If this was you, visit this link to sign in:

${url}

This link will expire in 24 hours for security reasons.

Didn't request this email? You can safely ignore it if you didn't request a magic link. Your account is secure.

---
© 2025 myPesa. All rights reserved.
Privacy Policy: https://mypesa.app/privacy
Terms of Service: https://mypesa.app/terms
`;
