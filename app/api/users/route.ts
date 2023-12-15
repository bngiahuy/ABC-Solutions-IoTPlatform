import supabase from 'utils/supabase-init'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const obj = Object.fromEntries(searchParams.entries())

    const offset = obj['offset'] ? parseInt(obj['offset']) : 0 // Offset default = 0
    const limit = obj['limit'] ? parseInt(obj['limit']) : 10 // Limit default = 10
    if (obj['offset'] && obj['limit']) {
      const { data, error } = await supabase.from('users').select('*').range(offset, limit)
      if (error) throw error
      return NextResponse.json({ body: data }, { status: 200 })
    } else {
      const { data, error } = await supabase.from('users').select('*')
      if (error) throw error
      return NextResponse.json({ body: data }, { status: 200 })
    }
  } catch (err) {
    return NextResponse.json({ body: err }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const res = await request.json()
  const newData = res.body
  // res = {
  //   "body":{
  //     "email": "",
  //     "password": "",
  //   }
  // }
  // const { error } = await supabase.from('auth.users').insert(dataToUpdate)
  if (!newData.email || !newData.password) {
    return NextResponse.json({ message: 'Missing email or password' }, { status: 400 })
  }
  const { error } = await supabase.auth.signUp(newData)
  if (error) {
    return NextResponse.json(error, { status: 400 })
  }

  return NextResponse.json({ message: 'Created' }, { status: 200 })
}

export async function getSession() {
  const { data, error } = await supabase.auth.getSession()
  if (error) return NextResponse.json({ body: error }, { status: 500 })
  else return NextResponse.json({ body: data }, { status: 200 })
}
