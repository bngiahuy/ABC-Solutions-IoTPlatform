import supabase from 'utils/supabase-init'
import { NextResponse, NextRequest } from 'next/server'

export async function GET(req: NextRequest, { params }: any) {
  const id = params.id
  if (!id || isNaN(parseInt(id))) {
    return NextResponse.json(
      {
        body: 'Invalid or missing id parameter'
      },
      {
        status: 400
      }
    )
  }
  const { count, data, error } = await supabase.from('notification').select('*', { count: 'exact' }).eq('id', id)
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
  return NextResponse.json({ count: count, results: data }, { status: 200 })
}

export async function DELETE(req: NextRequest, { params }: any) {
  try {
    const idToDelete = params.id

    if (!idToDelete || isNaN(parseInt(idToDelete))) {
      return NextResponse.json({ body: 'Invalid or missing id parameter' }, { status: 400 })
    }
    // Construct and execute the Supabase delete query
    const { error } = await supabase.from('notification').delete().eq('id', idToDelete) //

    if (error) {
      return NextResponse.json({ body: JSON.stringify(error) }, { status: 500 })
    }

    return NextResponse.json(
      { body: 'Record deleted successfully' },
      {
        status: 200
      }
    )
  } catch (error) {
    return NextResponse.json({ body: JSON.stringify({ error: 'Internal server error' }) }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest, { params }: any) {
  try {
    const id = params.id
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        {
          body: 'Invalid or missing id parameter'
        },
        {
          status: 400
        }
      )
    }
    const res = await req.json()
    const dataToUpdate = res.body

    const { error } = await supabase.from('notification').update(dataToUpdate).eq('id', id)

    if (error) {
      return NextResponse.json({ body: JSON.stringify(error) }, { status: 500 })
    }

    return NextResponse.json({ body: 'Updated' }, { status: 200 })
  } catch (error: any) {
    let error_response = {
      body: error.message
    }
    return NextResponse.json(JSON.stringify(error_response), {
      status: 500
    })
  }
}

export async function PUT(req: NextRequest, { params }: any) {
  try {
    const id = params.id
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        {
          body: 'Invalid or missing id parameter'
        },
        {
          status: 400
        }
      )
    }
    const res = await req.json()
    const dataToUpdate = res.body

    const { error } = await supabase.from('notification').update(dataToUpdate).eq('id', id)

    if (error) {
      return NextResponse.json({ body: JSON.stringify(error) }, { status: 500 })
    }

    return NextResponse.json({ body: 'Updated' }, { status: 200 })
  } catch (error: any) {
    let error_response = {
      body: error.message
    }
    return NextResponse.json(JSON.stringify(error_response), {
      status: 500
    })
  }
}
