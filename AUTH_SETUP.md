# Authentication Setup Guide

This guide explains how to set up authentication in myPesa with NextAuth.js, Supabase, and magic link support.

## Overview

The authentication system includes:
- **Magic Links** (Email) - Primary authentication method
- **Google OAuth** - Social login option
- **Apple OAuth** - Social login option
- **Supabase** - Database adapter for user management

## Prerequisites

1. A Supabase project (https://supabase.com)
2. Gmail account for sending magic link emails (or other SMTP provider)
3. Google OAuth credentials (for OAuth)
4. Apple Developer account (optional, for Apple OAuth)

## Step 1: Set Up Supabase

### 1.1 Create a Supabase Project
- Go to https://supabase.com and create an account
- Create a new project
- Copy your project URL and API keys

### 1.2 Set Up Auth Tables
Supabase automatically handles auth table creation through NextAuth adapter.

### 1.3 Get Your Credentials
In your Supabase dashboard:
- Go to Settings → API
- Copy `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
- Copy `Service Role Key` → `SUPABASE_SERVICE_ROLE_KEY`
- Copy `Anon Key` → `NEXT_PUBLIC_SUPABASE_ANON_KEY` (optional, for client-side operations)

## Step 2: Set Up Magic Link Email

### Option A: Gmail SMTP

1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to https://myaccount.google.com/apppasswords
   - Select Mail and Windows Computer
   - Copy the generated 16-character password

3. In `.env.local`:
   ```
   EMAIL_SERVER_HOST=smtp.gmail.com
   EMAIL_SERVER_PORT=587
   EMAIL_SERVER_USER=your-email@gmail.com
   EMAIL_SERVER_PASSWORD=your-16-char-password
   EMAIL_FROM=noreply@mypesa.app
   ```

### Option B: Custom SMTP

Update `.env.local` with your SMTP provider details:
```
EMAIL_SERVER_HOST=your-smtp-host.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@example.com
EMAIL_SERVER_PASSWORD=your-password
EMAIL_FROM=noreply@yourdomain.com
```

## Step 3: Google OAuth Setup

### 3.1 Create Google OAuth Credentials
1. Go to https://console.developers.google.com
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials:
   - Type: Web application
   - Authorized redirect URIs:
     - `http://localhost:3000/api/auth/callback/google` (development)
     - `https://yourdomain.com/api/auth/callback/google` (production)
5. Copy Client ID and Client Secret

### 3.2 Update Environment Variables
In `.env.local`:
```
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
```

## Step 4: Apple OAuth Setup (Optional)

### 4.1 Get Apple Credentials
1. Go to https://developer.apple.com
2. Register an app ID
3. Create a Service ID for Sign in with Apple
4. Create a Private Key
5. Configure Return URLs: `https://yourdomain.com/api/auth/callback/apple`

### 4.2 Update Environment Variables
In `.env.local`:
```
APPLE_ID=your-team-id.your-service-id
APPLE_SECRET=your-private-key
```

## Step 5: NextAuth Configuration

### 5.1 Generate Secret
```bash
openssl rand -base64 32
```

### 5.2 Update Environment Variables
```
NEXTAUTH_SECRET=your-generated-secret
NEXTAUTH_URL=http://localhost:3000  # (change to your domain in production)
```

## Step 6: Test Authentication

### 6.1 Start Development Server
```bash
npm run dev
```

### 6.2 Test Magic Link
1. Go to http://localhost:3000/login
2. Enter your email address
3. Check your email for a magic link
4. Click the link to sign in

### 6.3 Test Social Login (if configured)
- Click "Apple" or "Google" buttons
- You should be redirected to sign in with that provider

## Database Schema

The Supabase adapter automatically creates these tables:
- `users` - User accounts
- `accounts` - OAuth provider accounts
- `sessions` - Session tokens
- `verification_tokens` - Magic link tokens

## Environment Variables Summary

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret

# Email (Magic Links)
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@gmail.com
EMAIL_SERVER_PASSWORD=your-app-password
EMAIL_FROM=noreply@mypesa.app

# Google OAuth
GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxx

# Apple OAuth (Optional)
APPLE_ID=com.apple.xxx
APPLE_SECRET=xxxxxxx
```

## Production Checklist

- [ ] Update `NEXTAUTH_URL` to your production domain
- [ ] Generate a new `NEXTAUTH_SECRET` with `openssl rand -base64 32`
- [ ] Use production Supabase credentials
- [ ] Use production email credentials
- [ ] Update OAuth redirect URIs with production domain
- [ ] Set environment variables in your hosting platform (Vercel, etc.)
- [ ] Test sign-in, magic links, and social login in production

## Troubleshooting

### Magic Link Not Received
- Check spam/junk folder
- Verify EMAIL_FROM matches your Gmail address
- Check Gmail App Passwords setting

### OAuth Returns 401
- Verify client ID and secret are correct
- Check redirect URIs match exactly
- Clear browser cache and cookies

### Database Connection Error
- Verify Supabase URL and keys
- Check Supabase project is active
- Verify Service Role key has correct permissions

## Additional Resources

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [NextAuth.js Supabase Adapter](https://next-auth.js.org/adapters/supabase)
- [Supabase Documentation](https://supabase.com/docs)
- [Gmail App Passwords](https://support.google.com/accounts/answer/185833)
