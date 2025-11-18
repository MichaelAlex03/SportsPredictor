import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/jwt';
import { JWTPayload } from '@/types/auth.types';

export interface AuthenticatedRequest extends NextRequest {
  user?: JWTPayload;
}

/**
 * Middleware to verify JWT token
 * Extracts token from Authorization header and verifies it
 * Attaches user info to request if valid
 */
export function authMiddleware(request: NextRequest): {
  authenticated: boolean;
  user?: JWTPayload;
  error?: string;
} {
  try {
    // Get token from Authorization header
    const authHeader = request.headers.get('Authorization');

    if (!authHeader) {
      return {
        authenticated: false,
        error: 'No authorization header provided',
      };
    }

    // Extract token from "Bearer <token>" format
    const token = authHeader.startsWith('Bearer ')
      ? authHeader.substring(7)
      : authHeader;

    if (!token) {
      return {
        authenticated: false,
        error: 'No token provided',
      };
    }

    // Verify token
    const user = verifyToken(token);

    return {
      authenticated: true,
      user,
    };
  } catch (error) {
    return {
      authenticated: false,
      error: error instanceof Error ? error.message : 'Invalid token',
    };
  }
}

/**
 * Helper function to create an unauthorized response
 */
export function unauthorizedResponse(message: string = 'Unauthorized') {
  return NextResponse.json(
    { error: message },
    { status: 401 }
  );
}

/**
 * Wrapper function to protect API routes
 * Usage example:
 *
 * export async function GET(request: NextRequest) {
 *   const authResult = requireAuth(request);
 *   if (!authResult.authenticated) {
 *     return unauthorizedResponse(authResult.error);
 *   }
 *
 *   // Access authenticated user
 *   const userId = authResult.user.userId;
 *   // ... your protected route logic
 * }
 */
export function requireAuth(request: NextRequest) {
  return authMiddleware(request);
}
