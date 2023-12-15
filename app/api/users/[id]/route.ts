import supabase from 'utils/supabase-init'
import { NextResponse, NextRequest } from 'next/server'

export async function GET(req: NextRequest, { params }: any) {
  // Get current login user info from Supabase
  const {
    data: { user },
    error
  } = await supabase.auth.getUser()
  if (error) {
    return NextResponse.json(
      {
        body: JSON.stringify(error)
      },
      {
        status: 500
      }
    )
  }
  return NextResponse.json({ results: user }, { status: 200 })
}

// Update a user's password
export async function PATCH(req: NextRequest) {
  const res = await req.json()
  const newPassword = res.body

  const { data, error } = await supabase.auth.updateUser({ password: newPassword })
  if (error) {
    return NextResponse.json({ body: JSON.stringify(error) }, { status: 500 })
  }

  return NextResponse.json({ body: 'Password updated' }, { status: 200 })
}
