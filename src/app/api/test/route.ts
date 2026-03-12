import { NextResponse } from 'next/server'
import { sql } from '@/lib/db'

export async function GET() {
  try {
    // Test if environment variable is loaded
    const dbUrl = process.env.DATABASE_URL
    
    if (!dbUrl) {
      return NextResponse.json({
        success: false,
        error: 'DATABASE_URL not set'
      }, { status: 500 })
    }

    // Test database connection
    const result = await sql`SELECT NOW()`
    
    return NextResponse.json({
      success: true,
      message: 'Database connected successfully!',
      envLoaded: true,
      dbUrlPrefix: dbUrl.substring(0, 20) + '...',
      timestamp: result[0].now
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message || 'Database connection failed'
    }, { status: 500 })
  }
}
