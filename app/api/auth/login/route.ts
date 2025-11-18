import { NextRequest, NextResponse } from 'next/server';
import { AuthController } from '@/controllers/authController';
import { LoginRequest } from '@/types/auth.types';

/**
 * POST /api/auth/login
 * Authenticate user and return JWT token
 *
 * Request body:
 * {
 *   "email": "user@example.com",
 *   "password": "password123"
 * }
 *
 * Response:
 * {
 *   "userId": "user-id",
 *   "token": "jwt-token"
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body: LoginRequest = await request.json();

    // Validate request body
    if (!body.email || !body.password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Call controller to handle login
    const result = await AuthController.login(body);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Login error:', error);

    const errorMessage = error instanceof Error ? error.message : 'Login failed';

    return NextResponse.json(
      { error: errorMessage },
      { status: 401 }
    );
  }
}
