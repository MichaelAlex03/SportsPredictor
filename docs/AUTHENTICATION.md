# Authentication System Documentation

This project uses JWT (JSON Web Tokens) for authentication with an MVC architecture pattern.

## Project Structure

```
├── app/
│   └── api/
│       ├── auth/
│       │   ├── login/
│       │   │   └── route.ts          # Login endpoint
│       │   └── signup/
│       │       └── route.ts          # Signup endpoint
│       └── protected/
│           └── route.ts              # Example protected route
├── controllers/
│   └── authController.ts             # Authentication business logic
├── middleware/
│   └── auth.ts                       # JWT verification middleware
├── models/
│   └── User.ts                       # User model (Supabase placeholders)
├── types/
│   └── auth.types.ts                 # TypeScript interfaces
└── lib/
    ├── jwt.ts                        # JWT utility functions
    └── password.ts                   # Password hashing utilities
```

## Setup

1. **Install dependencies** (already done):
   ```bash
   npm install jsonwebtoken bcryptjs
   npm install -D @types/jsonwebtoken @types/bcryptjs
   ```

2. **Configure environment variables**:
   - Copy `.env.example` to `.env.local`
   - Set a strong `JWT_SECRET` value
   ```env
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRES_IN=7d
   ```

## API Endpoints

### 1. Signup
**POST** `/api/auth/signup`

Create a new user account.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "userId": "user-id-123",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Validations:**
- Email must be valid format
- Password must be at least 6 characters

---

### 2. Login
**POST** `/api/auth/login`

Authenticate existing user.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "userId": "user-id-123",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 3. Protected Routes
Any route can be protected using the JWT middleware.

**Example Request:**
```
GET /api/protected
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (200):**
```json
{
  "message": "This is a protected route",
  "user": {
    "userId": "user-id-123",
    "email": "user@example.com"
  }
}
```

## Usage Examples

### Testing with cURL

**Signup:**
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

**Login:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

**Access Protected Route:**
```bash
curl -X GET http://localhost:3000/api/protected \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

### Creating Protected Routes

To protect any API route, use the `requireAuth` middleware:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { requireAuth, unauthorizedResponse } from '@/middleware/auth';

export async function GET(request: NextRequest) {
  // Verify authentication
  const authResult = requireAuth(request);

  if (!authResult.authenticated) {
    return unauthorizedResponse(authResult.error);
  }

  // Access authenticated user data
  const user = authResult.user!;

  // Your protected route logic here
  return NextResponse.json({
    message: 'Success',
    userId: user.userId,
  });
}
```

## Integrating with Supabase

The authentication system is ready for Supabase integration. To complete the setup:

1. **Configure Supabase** in your `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
   ```

2. **Update `models/User.ts`**:
   - Uncomment the Supabase queries
   - Replace placeholder implementations with actual Supabase calls

3. **Update `controllers/authController.ts`**:
   - Uncomment the database operations
   - Remove mock data returns

## Security Notes

- **Always** set a strong `JWT_SECRET` in production
- **Never** commit `.env.local` to version control
- Passwords are automatically hashed using bcrypt (10 salt rounds)
- JWT tokens expire after 7 days by default (configurable via `JWT_EXPIRES_IN`)
- Invalid tokens return 401 Unauthorized responses

## Next Steps

1. Set up your Supabase database
2. Create a `users` table with columns: `id`, `email`, `password`, `created_at`, `updated_at`
3. Implement the Supabase queries in `models/User.ts`
4. Uncomment database operations in `controllers/authController.ts`
5. Test the full authentication flow
