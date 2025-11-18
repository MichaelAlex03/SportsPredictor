import { NextRequest, NextResponse } from 'next/server';
import { AuthController } from '@/controllers/authController';
import { SignupRequest } from '@/types/auth.types';

/**
 * POST /api/auth/signup
 * Register a new user and return JWT token
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
    const body: SignupRequest = await request.json();

    // Validate request body
    if (!body.email || !body.password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Call controller to handle signup
    const result = await AuthController.signup(body);

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Signup error:', error);

    const errorMessage = error instanceof Error ? error.message : 'Signup failed';

    // Determine appropriate status code
    const statusCode = errorMessage.includes('already exists') ? 409 : 400;

    return NextResponse.json(
      { error: errorMessage },
      { status: statusCode }
    );
  }
}
