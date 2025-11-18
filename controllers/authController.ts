import { UserModel } from '@/models/User';
import { generateToken } from '@/lib/jwt';
import { hashPassword, comparePassword } from '@/lib/password';
import { LoginRequest, SignupRequest, AuthResponse } from '@/types/auth.types';

export class AuthController {
  /**
   * Handle user login
   * @param credentials - Email and password
   * @returns userId and JWT token
   */
  static async login(credentials: LoginRequest): Promise<AuthResponse> {
    const { email, password } = credentials;

    // Validate input
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    // TODO: Uncomment when Supabase is configured
    // Find user by email
    // const user = await UserModel.findByEmail(email);
    // if (!user) {
    //   throw new Error('Invalid credentials');
    // }

    // Verify password
    // const isValidPassword = await comparePassword(password, user.password!);
    // if (!isValidPassword) {
    //   throw new Error('Invalid credentials');
    // }

    // For now, return mock data until Supabase is set up
    const mockUserId = 'mock-user-id-123';
    const mockEmail = email;

    // Generate JWT token
    const token = generateToken({
      userId: mockUserId,
      email: mockEmail,
    });

    return {
      userId: mockUserId,
      token,
    };
  }

  /**
   * Handle user signup
   * @param userData - Email and password
   * @returns userId and JWT token
   */
  static async signup(userData: SignupRequest): Promise<AuthResponse> {
    const { email, password } = userData;

    // Validate input
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email format');
    }

    // Validate password strength (minimum 6 characters)
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }

    // TODO: Uncomment when Supabase is configured
    // Check if user already exists
    // const existingUser = await UserModel.findByEmail(email);
    // if (existingUser) {
    //   throw new Error('User already exists');
    // }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // TODO: Uncomment when Supabase is configured
    // Create user
    // const newUser = await UserModel.create({
    //   email,
    //   password: hashedPassword,
    // });

    // For now, return mock data until Supabase is set up
    const mockUserId = 'mock-user-id-' + Date.now();
    const mockEmail = email;

    // Generate JWT token
    const token = generateToken({
      userId: mockUserId,
      email: mockEmail,
    });

    return {
      userId: mockUserId,
      token,
    };
  }
}
