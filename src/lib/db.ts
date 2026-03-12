import { neon } from '@neondatabase/serverless'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set')
}

// Create Neon database connection
export const sql = neon(process.env.DATABASE_URL)

// Test connection
export async function testConnection() {
  try {
    const result = await sql`SELECT NOW()`
    console.log('Database connected:', result[0].now)
    return true
  } catch (error) {
    console.error('Database connection failed:', error)
    return false
  }
}
