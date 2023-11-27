import supabase from 'utils/supabase-init'
import { NextResponse, NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const obj = Object.fromEntries(searchParams.entries())

    const offset = obj['offset'] ? parseInt(obj['offset']) : 0 // Offset default = 0
    const limit = obj['limit'] ? parseInt(obj['limit']) : 10 // Limit default = 10
    if (obj['offset'] && obj['limit']) {
      const { data, error } = await supabase.from('sensor_reading').select('*').range(offset, limit)
      if (error) throw error
      return NextResponse.json({ body: data }, { status: 200 })
    }
  } catch (err) {
    return NextResponse.json({ body: err }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const res = await req.json()
    const dataToCreate = res.body
    const { error } = await supabase.from('sensor_reading').insert(dataToCreate)
    if (error) throw error
    return NextResponse.json({ body: 'Inserted' }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ body: error }, { status: 500 })
  }
}
