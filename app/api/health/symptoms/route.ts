import { NextRequest, NextResponse } from 'next/server'

const BACKEND = process.env.BACKEND_URL || 'http://localhost:4000'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const res = await fetch(`${BACKEND}/api/health/symptoms?${searchParams.toString()}`)
    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
  } catch {
    return NextResponse.json([], { status: 200 })
  }
}
