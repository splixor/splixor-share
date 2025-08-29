import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

function getClientIP(request: NextRequest): string {
  // Check various headers for client IP
  const xForwardedFor = request.headers.get('x-forwarded-for')
  const xRealIP = request.headers.get('x-real-ip')
  const cfConnectingIP = request.headers.get('cf-connecting-ip')
  
  if (xForwardedFor) {
    return xForwardedFor.split(',')[0].trim()
  }
  if (cfConnectingIP) {
    return cfConnectingIP
  }
  if (xRealIP) {
    return xRealIP
  }
  
  // Fallback to localhost if no IP headers are found
  return '127.0.0.1'
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { serviceName, email, fingerprint } = body

    if (!serviceName) {
      return NextResponse.json({ error: 'Service name is required' }, { status: 400 })
    }

    const ipAddress = getClientIP(request)

    // Check if user has already voted using IP and fingerprint
    let existingVoteQuery = supabase
      .from('votes')
      .select('*')
      .eq('ip_address', ipAddress)

    if (fingerprint) {
      existingVoteQuery = existingVoteQuery.eq('fingerprint', fingerprint)
    }

    const { data: existingVotes } = await existingVoteQuery

    if (existingVotes && existingVotes.length > 0) {
      return NextResponse.json(
        { message: 'Already voted', vote: existingVotes[0] },
        { status: 409 }
      )
    }

    // Insert new vote
    const { data: newVote, error: voteError } = await supabase
      .from('votes')
      .insert({
        email: email || null,
        fingerprint: fingerprint || null,
        ip_address: ipAddress,
        vote_option: serviceName
      })
      .select()
      .single()

    if (voteError) {
      console.error('Vote insert error:', voteError)
      return NextResponse.json({ error: 'Failed to record vote' }, { status: 500 })
    }

     // If email is provided, also add to subscribers (but don't fail if duplicate)
    if (email) {
      const { error: subscriberError } = await supabase
        .from('subscribers')
        .insert({ email })
        .select()

      if (subscriberError && subscriberError.code !== '23505') { // Ignore unique constraint violations
        console.error('Subscriber insert error:', subscriberError)
      }
    }

    return NextResponse.json({ message: 'Vote recorded successfully', vote: newVote })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const { data: votes, error } = await supabase
      .from('votes')
      .select('vote_option')

    if (error) {
      console.error('Error fetching votes:', error)
      return NextResponse.json({ error: 'Failed to fetch votes' }, { status: 500 })
    }

    // Define predefined services
    const predefinedServices = new Set([
      'Apple Music', 'Canva', 'Freepik', 'Netflix', 
      'Spotify', 'YouTube Premium', 'Others'
    ]);

    // Count votes by service
    const voteCounts: { [key: string]: number } = {}
    const totalVotes = votes.length

    votes.forEach(vote => {
      // If the vote is for a predefined service, count it normally
      // Otherwise, add it to "Others"
      const serviceKey = predefinedServices.has(vote.vote_option) 
        ? vote.vote_option 
        : 'Others';
      voteCounts[serviceKey] = (voteCounts[serviceKey] || 0) + 1
    });

    // Calculate percentages
    const voteStats = Object.entries(voteCounts).map(([service, count]) => ({
      service,
      count,
      percentage: totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0
    }))

    return NextResponse.json({ voteStats, totalVotes })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}