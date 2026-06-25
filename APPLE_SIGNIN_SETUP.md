# Apple Sign In Setup

## Prerequisites
- Apple Developer Account
- Xcode configured with your Team ID

## Step 1: Apple Developer Console

1. Go to https://developer.apple.com
2. Navigate to Account > Certificates, Identifiers & Profiles
3. Create a **Services ID** (under Identifiers > Services)
4. Enable **Sign in with Apple** for this Services ID
5. Configure the **Return URLs**:
   - Development: `http://localhost:3000/api/auth/callback/apple`
   - Production: `https://yourdomain.com/api/auth/callback/apple`

## Step 2: Create a Key

1. Go to **Keys** in Apple Developer Console
2. Create a new Key with **Sign in with Apple** enabled
3. Download the private key (.p8 file)
4. Note the **Key ID**

## Step 3: Get Your Team ID

1. Go to https://developer.apple.com/account
2. Your Team ID is shown in the top-right corner

## Step 4: Update Environment Variables

Create `frontend/.env.local`:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate-a-secret-string-here

# Apple Sign In
APPLE_CLIENT_ID=your-service-id (e.g., com.yourcompany.floodwatch)
APPLE_TEAM_ID=your-team-id (10 alphanumeric characters)
APPLE_KEY_ID=your-key-id
APPLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----
your-private-key-content-here
-----END PRIVATE KEY-----"
```

## Generate NEXTAUTH_SECRET

```bash
openssl rand -base64 32
```

## Step 5: Configure in Next.js

The Apple Sign In button will appear on the login and register pages once the environment variables are set.

## Notes
- Apple requires a real device for testing Sign in with Apple
- The private key must be kept secure and never committed to git