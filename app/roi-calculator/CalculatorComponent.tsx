'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Loader2, ArrowRight, ArrowLeft, ShieldCheck, Mail, Phone, Building2, Truck, Palette, DollarSign, Clock, MessageSquare, LogIn, UserPlus, RefreshCw, Zap, ClipboardList } from 'lucide-react';

type FormStep = 'loading' | 'choose' | 'form' | 'signin' | 'waiting-link' | 'calculator';

const STORAGE_KEY = 'roi-lead-form';
const FLOW_KEY = 'roi-lead-flow';

export default function CalculatorComponent() {
    // Calculator state
    const [vehicles, setVehicles] = useState<number>(5);
    const [dailyKm, setDailyKm] = useState<number>(50);
    const [area, setArea] = useState<string>('cbd');

    // Form state
    const [step, setStep] = useState<FormStep>('loading');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [leadId, setLeadId] = useState<string | null>(null);
    const [userName, setUserName] = useState('');
    const [pendingEmail, setPendingEmail] = useState('');
    const [quickFill, setQuickFill] = useState(true);

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        companyName: '',
        fleetSize: '',
        vehicleTypes: '',
        brandingInterest: '',
        budgetRange: '',
        timeline: '',
        currentBranding: '',
        message: '',
    });

    // Handle a fully authenticated user — check for existing lead or save data & proceed
    const handleAuthenticatedUser = useCallback(async (email: string) => {
        // Try to find an existing lead record
        const { data: lead } = await supabase
            .from('pro_graphic_leads_magnet')
            .select('id, full_name')
            .eq('email', email)
            .limit(1)
            .single();

        if (lead) {
            // Returning user — go straight to calculator
            setUserName(lead.full_name);
            setLeadId(lead.id);
            localStorage.removeItem(STORAGE_KEY);
            localStorage.removeItem(FLOW_KEY);
            setStep('calculator');
        } else {
            // Authenticated but no lead record — save from localStorage form data
            const savedForm = localStorage.getItem(STORAGE_KEY);
            if (savedForm) {
                try {
                    const parsed = JSON.parse(savedForm);
                    // Auto-save the lead record
                    const { data, error: dbError } = await supabase
                        .from('pro_graphic_leads_magnet')
                        .insert([{
                            full_name: parsed.fullName || 'Unknown',
                            email: email,
                            phone: parsed.phone || '',
                            company_name: parsed.companyName || '',
                            fleet_size: parsed.fleetSize || '',
                            vehicle_types: parsed.vehicleTypes || '',
                            branding_interest: parsed.brandingInterest || '',
                            budget_range: parsed.budgetRange || '',
                            timeline: parsed.timeline || '',
                            current_branding: parsed.currentBranding || '',
                            message: parsed.message || '',
                            email_verified: true,
                            source: 'roi-calculator',
                        }])
                        .select('id')
                        .single();

                    if (!dbError && data) {
                        setLeadId(data.id);
                        setUserName(parsed.fullName || '');
                        localStorage.removeItem(STORAGE_KEY);
                        localStorage.removeItem(FLOW_KEY);
                        setStep('calculator');
                        return;
                    }
                } catch {
                    // Fall through if parse fails
                }
            }
            // If no saved form data, still go to calculator
            setStep('calculator');
        }
    }, []);

    // On mount: check existing session AND listen for auth state changes (magic link redirect)
    useEffect(() => {
        let mounted = true;

        // 1. Check if user already has a session
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (!mounted) return;
            if (session?.user?.email) {
                handleAuthenticatedUser(session.user.email);
            } else {
                setStep('choose');
            }
        });

        // 2. Listen for auth changes (triggered when magic link redirect arrives)
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                if (!mounted) return;
                if (event === 'SIGNED_IN' && session?.user?.email) {
                    handleAuthenticatedUser(session.user.email);
                }
            }
        );

        return () => {
            mounted = false;
            subscription.unsubscribe();
        };
    }, [handleAuthenticatedUser]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Get the redirect URL for the magic link
    const getRedirectUrl = () => {
        if (typeof window !== 'undefined') {
            return `${window.location.origin}/roi-calculator`;
        }
        return 'http://localhost:3000/roi-calculator';
    };

    // ─── COMBINED FORM SUBMIT: Save data + Send magic link ───
    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);
        try {
            // Save form data to localStorage so it survives the redirect
            localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
            localStorage.setItem(FLOW_KEY, 'signup');

            const { error: otpError } = await supabase.auth.signInWithOtp({
                email: formData.email,
                options: {
                    emailRedirectTo: getRedirectUrl(),
                },
            });
            if (otpError) throw new Error(otpError.message);
            setPendingEmail(formData.email);
            setStep('waiting-link');
        } catch (err: any) {
            setError(err.message || 'Failed to send verification link.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // ─── SIGN IN: Send magic link ───
    const handleSignInSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);
        try {
            localStorage.setItem(FLOW_KEY, 'signin');

            const { error: otpError } = await supabase.auth.signInWithOtp({
                email: pendingEmail,
                options: {
                    emailRedirectTo: getRedirectUrl(),
                },
            });
            if (otpError) throw new Error(otpError.message);
            setStep('waiting-link');
        } catch (err: any) {
            setError(err.message || 'Failed to send verification link.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // ─── Resend magic link ───
    const handleResendLink = async () => {
        setError('');
        setIsSubmitting(true);
        try {
            const { error: otpError } = await supabase.auth.signInWithOtp({
                email: pendingEmail,
                options: {
                    emailRedirectTo: getRedirectUrl(),
                },
            });
            if (otpError) throw new Error(otpError.message);
        } catch (err: any) {
            setError(err.message || 'Failed to resend link.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Calculator logic
    const areas: Record<string, { name: string; impressionsPerKm: number }> = {
        'cbd': { name: 'Durban CBD & Harbour', impressionsPerKm: 850 },
        'highway': { name: 'N2/M4 Highway', impressionsPerKm: 650 },
        'umhlanga': { name: 'Umhlanga/Ballito', impressionsPerKm: 720 },
        'phoenix': { name: 'Phoenix/Verulam', impressionsPerKm: 480 },
        'pinetown': { name: 'Pinetown/Westville', impressionsPerKm: 550 },
    };

    const IMPRESSION_VALUE = 0.05;
    const currentArea = areas[area] || areas['cbd'];
    const dailyImpressionsPerVehicle = dailyKm * currentArea.impressionsPerKm;
    const totalDailyImpressions = dailyImpressionsPerVehicle * vehicles;
    const dailyValue = totalDailyImpressions * IMPRESSION_VALUE;
    const monthlyValue = dailyValue * 30;
    const annualValue = monthlyValue * 12;

    // ─── Shared Styles ───
    const inputClass = "w-full px-4 py-3 bg-blue-950/50 border-2 border-blue-800 rounded-lg text-white font-medium placeholder:text-blue-400 focus:border-amber-500 focus:outline-none transition-colors";
    const selectClass = "w-full px-4 py-3 bg-blue-950/50 border-2 border-blue-800 rounded-lg text-white font-medium focus:border-amber-500 focus:outline-none transition-colors";
    const labelClass = "block text-sm font-bold text-blue-200 mb-1.5";

    // ─── Progress for sign-up flow ───
    const signUpSteps = ['Your Details', 'Verify Email', 'Calculator'];
    const signUpStepIndex = step === 'form' ? 0 : (step === 'waiting-link' && localStorage.getItem(FLOW_KEY) === 'signup') ? 1 : 2;
    const showSignUpProgress = ['form'].includes(step) || (step === 'waiting-link' && typeof window !== 'undefined' && localStorage.getItem(FLOW_KEY) === 'signup');

    // ─── Progress for sign-in flow ───
    const signInSteps = ['Sign In', 'Verify Email', 'Calculator'];
    const signInStepIndex = step === 'signin' ? 0 : (step === 'waiting-link' && typeof window !== 'undefined' && localStorage.getItem(FLOW_KEY) === 'signin') ? 1 : 2;
    const showSignInProgress = ['signin'].includes(step) || (step === 'waiting-link' && typeof window !== 'undefined' && localStorage.getItem(FLOW_KEY) === 'signin');

    return (
        <div className="mt-8">
            {/* Sign-Up Progress Bar */}
            {showSignUpProgress && (
                <div className="max-w-md mx-auto mb-10">
                    <div className="flex items-center justify-between mb-3">
                        {signUpSteps.map((s, i) => (
                            <div key={s} className="flex items-center">
                                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${i <= signUpStepIndex
                                    ? 'bg-amber-500 text-blue-950 shadow-lg shadow-amber-500/30'
                                    : 'bg-blue-900/50 text-blue-400 border border-blue-700'
                                    }`}>
                                    {i < signUpStepIndex ? <CheckCircle size={18} /> : i + 1}
                                </div>
                                {i < signUpSteps.length - 1 && (
                                    <div className={`hidden sm:block w-24 md:w-32 h-0.5 mx-2 transition-all duration-300 ${i < signUpStepIndex ? 'bg-amber-500' : 'bg-blue-800'
                                        }`} />
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between">
                        {signUpSteps.map((s, i) => (
                            <span key={s} className={`text-xs font-medium transition-colors ${i <= signUpStepIndex ? 'text-amber-400' : 'text-blue-500'
                                }`}>{s}</span>
                        ))}
                    </div>
                </div>
            )}

            {/* Sign-In Progress Bar */}
            {showSignInProgress && (
                <div className="max-w-md mx-auto mb-10">
                    <div className="flex items-center justify-between mb-3">
                        {signInSteps.map((s, i) => (
                            <div key={s} className="flex items-center">
                                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${i <= signInStepIndex
                                    ? 'bg-amber-500 text-blue-950 shadow-lg shadow-amber-500/30'
                                    : 'bg-blue-900/50 text-blue-400 border border-blue-700'
                                    }`}>
                                    {i < signInStepIndex ? <CheckCircle size={18} /> : i + 1}
                                </div>
                                {i < signInSteps.length - 1 && (
                                    <div className={`hidden sm:block w-24 md:w-32 h-0.5 mx-2 transition-all duration-300 ${i < signInStepIndex ? 'bg-amber-500' : 'bg-blue-800'
                                        }`} />
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between">
                        {signInSteps.map((s, i) => (
                            <span key={s} className={`text-xs font-medium transition-colors ${i <= signInStepIndex ? 'text-amber-400' : 'text-blue-500'
                                }`}>{s}</span>
                        ))}
                    </div>
                </div>
            )}

            <AnimatePresence mode="wait">
                {/* ════════════════════════════════════════════════ */}
                {/* LOADING STATE                                    */}
                {/* ════════════════════════════════════════════════ */}
                {step === 'loading' && (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center py-20"
                    >
                        <Loader2 size={48} className="animate-spin text-amber-500 mb-4" />
                        <p className="text-blue-200 font-medium">Checking your session...</p>
                    </motion.div>
                )}

                {/* ════════════════════════════════════════════════ */}
                {/* CHOOSE: Sign Up or Sign In                       */}
                {/* ════════════════════════════════════════════════ */}
                {step === 'choose' && (
                    <motion.div
                        key="choose"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="max-w-2xl mx-auto">
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* New User Card */}
                                <button
                                    onClick={() => setStep('form')}
                                    className="group bg-gradient-to-br from-blue-950 to-blue-900 rounded-3xl shadow-2xl border-2 border-blue-800/50 hover:border-amber-500/70 overflow-hidden p-8 text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-amber-500/10"
                                >
                                    <div className="bg-amber-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-amber-500/30 transition-colors">
                                        <UserPlus size={32} className="text-amber-500" />
                                    </div>
                                    <h3 className="text-xl font-black text-white mb-2">I&apos;m New Here</h3>
                                    <p className="text-blue-300 text-sm mb-6">
                                        Create your free account to access the ROI calculator and get tailored branding recommendations.
                                    </p>
                                    <div className="flex items-center gap-2 text-amber-500 font-bold text-sm group-hover:gap-3 transition-all">
                                        Get Started <ArrowRight size={16} />
                                    </div>
                                </button>

                                {/* Returning User Card */}
                                <button
                                    onClick={() => setStep('signin')}
                                    className="group bg-gradient-to-br from-blue-950 to-blue-900 rounded-3xl shadow-2xl border-2 border-blue-800/50 hover:border-green-500/70 overflow-hidden p-8 text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-green-500/10"
                                >
                                    <div className="bg-green-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-500/30 transition-colors">
                                        <LogIn size={32} className="text-green-400" />
                                    </div>
                                    <h3 className="text-xl font-black text-white mb-2">I&apos;ve Been Here Before</h3>
                                    <p className="text-blue-300 text-sm mb-6">
                                        Sign in with your email to instantly access the calculator — no need to fill in your details again.
                                    </p>
                                    <div className="flex items-center gap-2 text-green-400 font-bold text-sm group-hover:gap-3 transition-all">
                                        Sign In <ArrowRight size={16} />
                                    </div>
                                </button>
                            </div>

                            <p className="text-center text-blue-400/60 text-xs mt-6">
                                🔒 Your data is 100% confidential. We never share your information with third parties.
                            </p>
                        </div>
                    </motion.div>
                )}

                {/* ════════════════════════════════════════════════ */}
                {/* SIGN IN: Email Entry                             */}
                {/* ════════════════════════════════════════════════ */}
                {step === 'signin' && (
                    <motion.div
                        key="signin"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="max-w-md mx-auto bg-gradient-to-br from-blue-950 to-blue-900 rounded-3xl shadow-2xl border border-blue-800/50 overflow-hidden">
                            <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-6">
                                <div className="flex items-center gap-3">
                                    <LogIn size={28} className="text-white" />
                                    <div>
                                        <h3 className="text-xl font-black text-white">Welcome Back!</h3>
                                        <p className="text-white/80 text-sm font-medium">Sign in with your email to continue</p>
                                    </div>
                                </div>
                            </div>

                            <form onSubmit={handleSignInSubmit} className="p-8 space-y-5">
                                <div>
                                    <label className={labelClass}>
                                        <span className="flex items-center gap-1.5"><Mail size={14} /> Your Email Address <span className="text-amber-500">*</span></span>
                                    </label>
                                    <input
                                        type="email"
                                        value={pendingEmail}
                                        onChange={(e) => setPendingEmail(e.target.value)}
                                        required
                                        className={inputClass}
                                        placeholder="you@company.co.za"
                                    />
                                </div>

                                {error && (
                                    <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg text-sm font-medium">{error}</div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-green-500 hover:bg-green-600 disabled:bg-green-500/50 text-white font-black py-4 rounded-xl text-lg transition-all transform hover:scale-[1.01] active:scale-95 uppercase tracking-wider shadow-xl border-b-4 border-green-700 flex items-center justify-center gap-3"
                                >
                                    {isSubmitting ? (
                                        <><Loader2 size={22} className="animate-spin" /> Sending Link...</>
                                    ) : (
                                        <>Send Login Link <ArrowRight size={20} /></>
                                    )}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => { setStep('choose'); setError(''); }}
                                    className="w-full text-blue-400 hover:text-white text-sm font-medium flex items-center justify-center gap-2 py-2 transition-colors"
                                >
                                    <ArrowLeft size={16} /> Back to options
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}

                {/* ════════════════════════════════════════════════ */}
                {/* WAITING FOR MAGIC LINK CLICK                     */}
                {/* ════════════════════════════════════════════════ */}
                {step === 'waiting-link' && (
                    <motion.div
                        key="waiting-link"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="max-w-md mx-auto bg-gradient-to-br from-blue-950 to-blue-900 rounded-3xl shadow-2xl border border-blue-800/50 overflow-hidden">
                            {/* Header */}
                            <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-6">
                                <div className="flex items-center gap-3">
                                    <Mail size={28} className="text-white" />
                                    <div>
                                        <h3 className="text-xl font-black text-white">Check Your Email!</h3>
                                        <p className="text-white/80 text-sm font-medium">We sent a login link to your inbox</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 space-y-6">
                                {/* Email Icon Animation */}
                                <div className="flex flex-col items-center text-center">
                                    <div className="relative mb-6">
                                        <div className="w-24 h-24 bg-amber-500/20 rounded-full flex items-center justify-center">
                                            <Mail size={48} className="text-amber-500" />
                                        </div>
                                        <motion.div
                                            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                            className="absolute inset-0 w-24 h-24 bg-amber-500/10 rounded-full"
                                        />
                                    </div>

                                    <p className="text-white font-bold text-lg mb-2">
                                        We sent a link to:
                                    </p>
                                    <p className="text-amber-400 font-bold text-lg mb-6 break-all">
                                        {pendingEmail}
                                    </p>

                                    <div className="bg-blue-900/50 border border-blue-700 rounded-xl p-5 text-left w-full space-y-3">
                                        <div className="flex items-start gap-3">
                                            <span className="text-amber-500 font-bold text-lg mt-0.5">1.</span>
                                            <p className="text-blue-200 text-sm">Open your <strong className="text-white">email inbox</strong> (check spam/junk folder too)</p>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <span className="text-amber-500 font-bold text-lg mt-0.5">2.</span>
                                            <p className="text-blue-200 text-sm">Look for an email from <strong className="text-white">Pro Graphics</strong></p>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <span className="text-amber-500 font-bold text-lg mt-0.5">3.</span>
                                            <p className="text-blue-200 text-sm"><strong className="text-white">Click the login link</strong> in the email — you&apos;ll be redirected right back here</p>
                                        </div>
                                    </div>
                                </div>

                                {error && (
                                    <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg text-sm font-medium">{error}</div>
                                )}

                                {/* Resend Button */}
                                <button
                                    type="button"
                                    onClick={handleResendLink}
                                    disabled={isSubmitting}
                                    className="w-full bg-blue-800 hover:bg-blue-700 disabled:bg-blue-800/50 text-white font-bold py-3 rounded-xl text-sm transition-all flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <><Loader2 size={18} className="animate-spin" /> Resending...</>
                                    ) : (
                                        <><RefreshCw size={18} /> Didn&apos;t receive it? Resend Link</>
                                    )}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => { setStep('choose'); setError(''); }}
                                    className="w-full text-blue-400 hover:text-white text-sm font-medium flex items-center justify-center gap-2 py-2 transition-colors"
                                >
                                    <ArrowLeft size={16} /> Start over
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* ════════════════════════════════════════════════ */}
                {/* COMBINED FORM: Contact + Needs Assessment         */}
                {/* ════════════════════════════════════════════════ */}
                {step === 'form' && (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="max-w-2xl mx-auto bg-gradient-to-br from-blue-950 to-blue-900 rounded-3xl shadow-2xl border border-blue-800/50 overflow-hidden">
                            {/* Header */}
                            <div className="bg-gradient-to-r from-amber-500 to-amber-600 px-8 py-6">
                                <div className="flex items-center gap-3">
                                    <ShieldCheck size={28} className="text-blue-950" />
                                    <div>
                                        <h3 className="text-xl font-black text-blue-950">Unlock Your Free ROI Report</h3>
                                        <p className="text-blue-950/70 text-sm font-medium">Tell us about yourself and your fleet</p>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Fill / Full Details Toggle */}
                            <div className="px-8 pt-6 pb-2">
                                <div className="flex items-center gap-1 bg-blue-900/60 rounded-xl p-1">
                                    <button
                                        type="button"
                                        onClick={() => setQuickFill(true)}
                                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-bold transition-all duration-200 ${quickFill
                                            ? 'bg-amber-500 text-blue-950 shadow-lg'
                                            : 'text-blue-300 hover:text-white'
                                            }`}
                                    >
                                        <Zap size={16} /> Quick Fill
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setQuickFill(false)}
                                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-bold transition-all duration-200 ${!quickFill
                                            ? 'bg-amber-500 text-blue-950 shadow-lg'
                                            : 'text-blue-300 hover:text-white'
                                            }`}
                                    >
                                        <ClipboardList size={16} /> Full Details
                                    </button>
                                </div>
                                <p className="text-center text-blue-400/60 text-xs mt-2">
                                    {quickFill
                                        ? '⚡ Just the essentials — get access in seconds'
                                        : '📋 Share more details for a tailored branding quote'}
                                </p>
                            </div>

                            <form onSubmit={handleFormSubmit} className="p-8 pt-4 space-y-5">
                                {/* ── SECTION 1: Contact Info (always visible) ── */}
                                <div className="grid md:grid-cols-2 gap-5">
                                    <div>
                                        <label className={labelClass}>
                                            <span className="flex items-center gap-1.5"><Building2 size={14} /> Full Name <span className="text-amber-500">*</span></span>
                                        </label>
                                        <input name="fullName" value={formData.fullName} onChange={handleChange} required className={inputClass} placeholder="Your full name" />
                                    </div>
                                    <div>
                                        <label className={labelClass}>
                                            <span className="flex items-center gap-1.5"><Mail size={14} /> Email Address <span className="text-amber-500">*</span></span>
                                        </label>
                                        <input name="email" type="email" value={formData.email} onChange={handleChange} required className={inputClass} placeholder="you@company.co.za" />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-5">
                                    <div>
                                        <label className={labelClass}>
                                            <span className="flex items-center gap-1.5"><Phone size={14} /> Phone Number <span className="text-amber-500">*</span></span>
                                        </label>
                                        <input name="phone" type="tel" value={formData.phone} onChange={handleChange} required className={inputClass} placeholder="082 123 4567" />
                                    </div>
                                    <div>
                                        <label className={labelClass}>
                                            <span className="flex items-center gap-1.5"><Truck size={14} /> Fleet Size <span className="text-amber-500">*</span></span>
                                        </label>
                                        <select name="fleetSize" value={formData.fleetSize} onChange={handleChange} required className={selectClass}>
                                            <option value="">Select fleet size</option>
                                            <option value="1">1 Vehicle</option>
                                            <option value="2-5">2-5 Vehicles</option>
                                            <option value="6-10">6-10 Vehicles</option>
                                            <option value="11-20">11-20 Vehicles</option>
                                            <option value="21-50">21-50 Vehicles</option>
                                            <option value="50+">50+ Vehicles</option>
                                        </select>
                                    </div>
                                </div>

                                {/* ── SECTION 2: Extended Details (only in Full Details mode) ── */}
                                <AnimatePresence>
                                    {!quickFill && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="space-y-5 overflow-hidden"
                                        >
                                            <div className="border-t border-blue-800/50 pt-5">
                                                <p className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                                    <Palette size={14} /> Branding Details
                                                </p>
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-5">
                                                <div>
                                                    <label className={labelClass}>
                                                        <span className="flex items-center gap-1.5"><Building2 size={14} /> Company Name</span>
                                                    </label>
                                                    <input name="companyName" value={formData.companyName} onChange={handleChange} className={inputClass} placeholder="Your company (optional)" />
                                                </div>
                                                <div>
                                                    <label className={labelClass}>
                                                        <span className="flex items-center gap-1.5"><Truck size={14} /> Vehicle Types</span>
                                                    </label>
                                                    <select name="vehicleTypes" value={formData.vehicleTypes} onChange={handleChange} className={selectClass}>
                                                        <option value="">Select primary type</option>
                                                        <option value="sedan">Sedans / Hatchbacks</option>
                                                        <option value="bakkie">Bakkies / Pickups</option>
                                                        <option value="suv">SUVs</option>
                                                        <option value="van">Vans / Panel Vans</option>
                                                        <option value="truck">Trucks</option>
                                                        <option value="trailer">Trailers</option>
                                                        <option value="mixed">Mixed Fleet</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-5">
                                                <div>
                                                    <label className={labelClass}>
                                                        <span className="flex items-center gap-1.5"><Palette size={14} /> Branding Interest</span>
                                                    </label>
                                                    <select name="brandingInterest" value={formData.brandingInterest} onChange={handleChange} className={selectClass}>
                                                        <option value="">What are you looking for?</option>
                                                        <option value="full-wrap">Full Vehicle Wrap</option>
                                                        <option value="half-wrap">Half Wrap</option>
                                                        <option value="decals">Logo & Decals Only</option>
                                                        <option value="contravision">Contravision (Window Graphics)</option>
                                                        <option value="magnetics">Magnetic Signs</option>
                                                        <option value="not-sure">Not Sure Yet — Need Advice</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className={labelClass}>
                                                        <span className="flex items-center gap-1.5"><DollarSign size={14} /> Budget Range</span>
                                                    </label>
                                                    <select name="budgetRange" value={formData.budgetRange} onChange={handleChange} className={selectClass}>
                                                        <option value="">Select budget range</option>
                                                        <option value="under-5k">Under R5,000</option>
                                                        <option value="5k-10k">R5,000 - R10,000</option>
                                                        <option value="10k-25k">R10,000 - R25,000</option>
                                                        <option value="25k-50k">R25,000 - R50,000</option>
                                                        <option value="50k-100k">R50,000 - R100,000</option>
                                                        <option value="100k+">R100,000+</option>
                                                        <option value="unsure">Not Sure — Need a Quote</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-5">
                                                <div>
                                                    <label className={labelClass}>
                                                        <span className="flex items-center gap-1.5"><Clock size={14} /> Timeline</span>
                                                    </label>
                                                    <select name="timeline" value={formData.timeline} onChange={handleChange} className={selectClass}>
                                                        <option value="">When do you want to start?</option>
                                                        <option value="asap">ASAP — Ready Now</option>
                                                        <option value="1-2-weeks">Within 1-2 Weeks</option>
                                                        <option value="1-month">Within a Month</option>
                                                        <option value="2-3-months">2-3 Months</option>
                                                        <option value="just-exploring">Just Exploring Options</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className={labelClass}>
                                                        <span className="flex items-center gap-1.5"><Palette size={14} /> Current Branding?</span>
                                                    </label>
                                                    <select name="currentBranding" value={formData.currentBranding} onChange={handleChange} className={selectClass}>
                                                        <option value="">Current status (optional)</option>
                                                        <option value="none">No Branding at All</option>
                                                        <option value="basic-stickers">Basic Stickers / Logo</option>
                                                        <option value="partial-wrap">Partial Wrap — Needs Refresh</option>
                                                        <option value="full-wrap-old">Full Wrap — Outdated Design</option>
                                                        <option value="competitor">Currently Using a Competitor</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div>
                                                <label className={labelClass}>
                                                    <span className="flex items-center gap-1.5"><MessageSquare size={14} /> Anything else we should know?</span>
                                                </label>
                                                <textarea name="message" value={formData.message} onChange={handleChange} rows={3} className={`${inputClass} resize-none`} placeholder="E.g. We need all 10 bakkies done by March for a rebrand..." />
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {error && (
                                    <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg text-sm font-medium">{error}</div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-amber-500/50 text-blue-950 font-black py-5 rounded-xl text-xl transition-all transform hover:scale-[1.01] active:scale-95 uppercase tracking-wider shadow-2xl border-b-4 border-amber-700 flex items-center justify-center gap-3"
                                >
                                    {isSubmitting ? (
                                        <><Loader2 size={22} className="animate-spin" /> Sending Link...</>
                                    ) : (
                                        <>🚀 Unlock My Free ROI Calculator</>
                                    )}
                                </button>

                                <div className="text-center">
                                    <button
                                        type="button"
                                        onClick={() => { setStep('choose'); setError(''); }}
                                        className="text-blue-400 hover:text-white text-sm font-medium inline-flex items-center gap-2 py-2 transition-colors"
                                    >
                                        <ArrowLeft size={16} /> Back to options
                                    </button>
                                </div>

                                <p className="text-center text-blue-400 text-xs">
                                    We&apos;ll email you a secure login link. Click it to verify and access the calculator.
                                </p>
                            </form>
                        </div>
                    </motion.div>
                )}

                {/* ════════════════════════════════════════════════ */}
                {/* CALCULATOR (Unlocked)                            */}
                {/* ════════════════════════════════════════════════ */}
                {step === 'calculator' && (
                    <motion.div
                        key="calculator"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                    >
                        {/* Welcome Banner */}
                        <div className="max-w-4xl mx-auto mb-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 flex items-center gap-4 shadow-xl">
                            <CheckCircle size={36} className="text-white flex-shrink-0" />
                            <div>
                                <h3 className="text-xl font-black text-white">Welcome{userName ? `, ${userName}` : ''}! 🎉</h3>
                                <p className="text-white/90 text-sm">Your email has been verified. Enjoy your personalized ROI calculator below!</p>
                            </div>
                        </div>

                        {/* Calculator */}
                        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 flex flex-col md:flex-row">
                            {/* Controls */}
                            <div className="w-full md:w-5/12 p-8 sm:p-10 bg-white">
                                <h2 className="text-2xl font-bold text-gray-900 mb-8">Your Fleet Details</h2>
                                <div className="space-y-8">
                                    <div>
                                        <label className="flex justify-between text-sm font-semibold text-gray-700 mb-2">
                                            Number of Unbranded Vehicles
                                            <span className="text-blue-950">{vehicles} {vehicles === 1 ? 'Vehicle' : 'Vehicles'}</span>
                                        </label>
                                        <input type="range" min="1" max="50" value={vehicles} onChange={(e) => setVehicles(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-950" />
                                    </div>
                                    <div>
                                        <label className="flex justify-between text-sm font-semibold text-gray-700 mb-2">
                                            Average Daily Distance per Vehicle
                                            <span className="text-blue-950">{dailyKm} km/day</span>
                                        </label>
                                        <input type="range" min="10" max="300" step="10" value={dailyKm} onChange={(e) => setDailyKm(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-950" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Primary Driving Area</label>
                                        <select value={area} onChange={(e) => setArea(e.target.value)} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-950 focus:border-blue-950 block p-3">
                                            {Object.entries(areas).map(([key, value]) => (
                                                <option key={key} value={key}>{value.name}</option>
                                            ))}
                                        </select>
                                        <p className="text-xs text-gray-500 mt-2">Based on Durban traffic analytics and R0.05 industry standard impression value.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Results */}
                            <div className="w-full md:w-7/12 p-8 sm:p-10 bg-blue-950 text-white flex flex-col justify-center">
                                <h3 className="text-amber-500 font-bold tracking-wider text-sm uppercase mb-2">Your Lost Brand Value</h3>
                                <div className="mb-8">
                                    <span className="text-blue-300 text-sm block mb-1">Monthly Lost Value</span>
                                    <div className="text-5xl sm:text-6xl font-extrabold text-white">R{monthlyValue.toLocaleString()}</div>
                                </div>
                                <div className="grid grid-cols-2 gap-6 mb-10">
                                    <div>
                                        <span className="text-blue-300 text-xs uppercase tracking-wider block mb-1">Daily Loss</span>
                                        <div className="text-2xl font-bold text-white">R{dailyValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                                    </div>
                                    <div>
                                        <span className="text-blue-300 text-xs uppercase tracking-wider block mb-1">Annual Loss</span>
                                        <div className="text-2xl font-bold text-white">R{annualValue.toLocaleString()}</div>
                                    </div>
                                    <div className="col-span-2">
                                        <span className="text-blue-300 text-xs uppercase tracking-wider block mb-1">Total Daily Impressions Wasted</span>
                                        <div className="text-2xl font-bold text-white">{totalDailyImpressions.toLocaleString()} views</div>
                                    </div>
                                </div>
                                <div className="mt-auto">
                                    <Link href="/branding-blueprint" className="block w-full text-center bg-amber-500 hover:bg-amber-400 text-blue-950 font-bold py-4 px-6 rounded-xl transition-colors duration-300 shadow-lg">
                                        Stop the Bleeding — Book a Free Assessment
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
