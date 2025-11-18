import { User } from '@/types/auth.types';

export class UserModel {
  // Placeholder methods for database operations
  // These will be implemented with Supabase later

  static async findByEmail(email: string): Promise<User | null> {
    // TODO: Implement Supabase query
    // Example: const { data } = await supabase.from('users').select('*').eq('email', email).single()
    throw new Error('Database query not implemented yet');
  }

  static async findById(id: string): Promise<User | null> {
    // TODO: Implement Supabase query
    // Example: const { data } = await supabase.from('users').select('*').eq('id', id).single()
    throw new Error('Database query not implemented yet');
  }

  static async create(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    // TODO: Implement Supabase query
    // Example: const { data } = await supabase.from('users').insert(user).select().single()
    throw new Error('Database query not implemented yet');
  }
}
