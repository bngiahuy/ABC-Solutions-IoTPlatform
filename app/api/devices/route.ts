import supabase from 'utils/supabase-init'
import { NextResponse, NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const { data, error } = await supabase.from('device').select('*')
    if (error) throw error
    data?.sort((a, b) => a.id - b.id)
    return NextResponse.json({ body: data }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ body: err }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const res = await req.json()
    const dataToCreate = res.body
    const { error } = await supabase.from('device').insert(dataToCreate)
    if (error) throw error
    return NextResponse.json({ body: 'Inserted' }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ body: error }, { status: 500 })
  }
}
