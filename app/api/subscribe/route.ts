import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // Add email to subscribers table
    const { data: subscriber, error: subscriberError } = await supabase
      .from('subscribers')
      .insert({ email })
      .select()
      .single()

    if (subscriberError) {
      // If it's a duplicate email, that's okay - just return success
      if (subscriberError.code === '23505') {
        return NextResponse.json({ message: 'Already subscribed' })
      }
      console.error('Subscriber insert error:', subscriberError)
      return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 })
    }

    return NextResponse.json({ 
      message: 'Successfully subscribed', 
      subscriber 
    })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}