import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

type VoteBody = {
  email?: string;
  fingerprint?: string;
  ip_address: string;
  vote_option: string;
};

export async function POST(req: Request) {
  try {
    const body: VoteBody = await req.json();
    const { email, fingerprint, ip_address, vote_option } = body;

    // Check for duplicate votes by email, fingerprint, or IP
    const { data: existingVote, error: voteCheckError } = await supabase
      .from('votes')
      .select('*')
      .or(
        `${email ? `email.eq.${email},` : ''}${
          fingerprint ? `fingerprint.eq.${fingerprint},` : ''
        }ip_address.eq.${ip_address}`
      )
      .maybeSingle();

    if (voteCheckError) throw voteCheckError;

    if (existingVote) {
      return NextResponse.json(
        { error: 'Duplicate vote detected' },
        { status: 400 }
      );
    }

    // Insert vote
    const { error: insertVoteError } = await supabase.from('votes').insert([
      {
        email: email || null,
        fingerprint: fingerprint || null,
        ip_address,
        vote_option,
      },
    ]);

    if (insertVoteError) throw insertVoteError;

    // If email provided, insert into subscribers (ignore duplicate)
    if (email) {
      await supabase
        .from('subscribers')
        .upsert({ email }, { onConflict: 'email' });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Vote API Error:', err);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}


