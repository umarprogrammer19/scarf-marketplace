import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Test if environment variable is loaded
    const dbUrl = process.env.DATABASE_URL
    
    return NextResponse.json({
      success: true,
      message: 'API is working!',
      envLoaded: !!dbUrl,
      dbUrlPrefix: dbUrl ? dbUrl.substring(0, 20) + '...' : 'NOT SET'
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}
