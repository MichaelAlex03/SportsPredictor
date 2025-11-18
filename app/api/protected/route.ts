import { NextRequest, NextResponse } from 'next/server';
import { requireAuth, unauthorizedResponse } from '@/middleware/auth';

/**
 * GET /api/protected
 * Example of a protected route that requires authentication
 *
 * Headers:
 * Authorization: Bearer <jwt-token>
 *
 * Response:
 * {
 *   "message": "This is a protected route",
 *   "user": {
 *     "userId": "user-id",
 *     "email": "user@example.com"
 *   }
 * }
 */
export async function GET(request: NextRequest) {
  // Verify authentication
  const authResult = requireAuth(request);

  if (!authResult.authenticated) {
    return unauthorizedResponse(authResult.error);
  }

  // Access authenticated user data
  const user = authResult.user!;

  return NextResponse.json({
    message: 'This is a protected route',
    user: {
      userId: user.userId,
      email: user.email,
    },
  });
}
