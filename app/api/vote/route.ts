import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { PostgrestError } from "@supabase/supabase-js";


const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

// Define types for better type safety
interface VoteRequestBody {
  vote_option: string;
  email?: string;
  fingerprint?: string;
}

interface Vote {
  id: string;
  vote_option: string;
  email: string | null;
  fingerprint: string | null;
  ip_address: string | null;
  created_at: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: VoteRequestBody = await req.json();
    const { vote_option, email, fingerprint } = body;

    // Validate required fields
    if (!vote_option) {
      return NextResponse.json(
        { error: "vote_option is required" }, 
        { status: 400 }
      );
    }

    // Normalize email (if provided)
    const normalizedEmail = email?.trim().toLowerCase() || null;

    // Get user IP (try both next/server and proxy headers)
    const forwarded = req.headers.get("x-forwarded-for");
    const ip_address = req.ip || 
      (forwarded ? forwarded.split(",")[0]?.trim() : null) || 
      null;

    // Step 1: Check for duplicate votes
    if (normalizedEmail) {
      const { data: existingVote, error: checkError } = await supabase
        .from("votes")
        .select("id")
        .eq("email", normalizedEmail)
        .maybeSingle();

      if (checkError) {
        console.error("Error checking existing email vote:", checkError);
        throw checkError;
      }

      if (existingVote) {
        return NextResponse.json(
          { error: "You have already voted (email match)" },
          { status: 400 }
        );
      }
    }

    if (fingerprint) {
      const { data: existingVote, error: checkError } = await supabase
        .from("votes")
        .select("id")
        .eq("fingerprint", fingerprint)
        .maybeSingle();

      if (checkError) {
        console.error("Error checking existing fingerprint vote:", checkError);
        throw checkError;
      }

      if (existingVote) {
        return NextResponse.json(
          { error: "You have already voted (device match)" },
          { status: 400 }
        );
      }
    }

    if (ip_address) {
      const { data: existingVote, error: checkError } = await supabase
        .from("votes")
        .select("id")
        .eq("ip_address", ip_address)
        .maybeSingle();

      if (checkError) {
        console.error("Error checking existing IP vote:", checkError);
        throw checkError;
      }

      if (existingVote) {
        return NextResponse.json(
          { error: "You have already voted (IP match)" },
          { status: 400 }
        );
      }
    }

    // Step 2: Insert vote into database
    const { data: vote, error: voteError } = await supabase
      .from("votes")
      .insert({
        vote_option,
        email: normalizedEmail,
        fingerprint,
        ip_address,
      })
      .select()
      .single();

    if (voteError) {
      console.error("Error inserting vote:", voteError);
      throw voteError;
    }

    // Step 3: If email provided, also insert into subscribers (handle duplicates gracefully)
    if (normalizedEmail) {
      const { error: subError } = await supabase
        .from("subscribers")
        .insert({ email: normalizedEmail })
        .select()
        .single();

      // Handle duplicate email constraint violation gracefully
      if (subError && subError.code !== "23505") {
        console.error("Error inserting subscriber:", subError);
        // Don't throw here - subscriber insertion is optional
      }
    }

    return NextResponse.json(
      { 
        success: true, 
        vote,
        message: "Vote recorded successfully"
      },
      { status: 201 }
    );

  } catch (error: unknown) {
    console.error("Vote API error:", error);
    
    // Handle PostgreSQL/Supabase specific errors
    if (error && typeof error === 'object' && 'code' in error) {
      const dbError = error as PostgrestError;
      
      switch (dbError.code) {
        case '23505': // Unique constraint violation
          return NextResponse.json(
            { error: "Duplicate entry detected" },
            { status: 409 }
          );
        case '23502': // Not null constraint violation
          return NextResponse.json(
            { error: "Required field is missing" },
            { status: 400 }
          );
        case 'PGRST116': // Supabase RLS policy violation
          return NextResponse.json(
            { error: "Access denied" },
            { status: 403 }
          );
        default:
          return NextResponse.json(
            { error: "Database error occurred" },
            { status: 500 }
          );
      }
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}