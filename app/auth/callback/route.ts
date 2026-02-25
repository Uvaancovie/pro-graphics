import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get('code');
    const token_hash = requestUrl.searchParams.get('token_hash');
    const type = requestUrl.searchParams.get('type');
    const next = requestUrl.searchParams.get('next') || '/roi-calculator';

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

    if (token_hash && type) {
        // Magic link flow — verify the OTP token
        const supabase = createClient(supabaseUrl, supabaseAnonKey);
        const { error } = await supabase.auth.verifyOtp({
            token_hash,
            type: type as 'email' | 'magiclink',
        });

        if (!error) {
            // Successfully verified — redirect to the ROI calculator
            return NextResponse.redirect(new URL(next, requestUrl.origin));
        }
    }

    if (code) {
        // PKCE flow — exchange the code for a session
        const supabase = createClient(supabaseUrl, supabaseAnonKey);
        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (!error) {
            return NextResponse.redirect(new URL(next, requestUrl.origin));
        }
    }

    // If verification failed, redirect to ROI calculator anyway
    // The onAuthStateChange listener in the component will handle the state
    return NextResponse.redirect(new URL(next, requestUrl.origin));
}
