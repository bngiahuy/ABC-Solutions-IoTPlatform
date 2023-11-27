import supabase from 'utils/supabase-init'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const obj = Object.fromEntries(searchParams.entries())

    const offset = obj['offset'] ? parseInt(obj['offset']) : 0 // Offset default = 0
    const limit = obj['limit'] ? parseInt(obj['limit']) : 10 // Limit default = 10
    if (obj['offset'] && obj['limit']) {
      const { data, error } = await supabase.from('auth.users').select('*', { count: 'exact' })
      if (error) throw error
      return NextResponse.json({ body: data }, { status: 200 })
    }
  } catch (err) {
    return NextResponse.json({ body: err }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const res = await request.json()

  const { error } = await supabase.from('auth.users').insert(res.body)

  if (error) {
    return NextResponse.json(error, { status: 400 })
  }

  return NextResponse.json({ message: 'Created' }, { status: 200 })
}
