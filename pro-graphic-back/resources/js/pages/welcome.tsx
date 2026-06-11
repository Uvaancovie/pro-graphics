import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard, login } from '@/routes';

export default function Welcome() {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Pro Graphics Backend" />
            <div className="flex min-h-screen flex-col items-center bg-blue-950 p-6 text-white lg:justify-center lg:p-8">
                <header className="mb-6 w-full max-w-[335px] text-sm lg:max-w-4xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={dashboard()}
                                className="inline-block rounded-lg border border-amber-400/30 bg-amber-400/10 px-5 py-2 text-sm font-medium text-amber-400 transition-colors hover:bg-amber-400/20"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={login()}
                                    className="inline-block rounded-lg border border-white/20 px-5 py-2 text-sm font-medium text-white/80 transition-colors hover:border-white/40 hover:text-white"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href="/register"
                                    className="inline-block rounded-lg border border-amber-400/30 bg-amber-400/10 px-5 py-2 text-sm font-medium text-amber-400 transition-colors hover:bg-amber-400/20"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>

                <div className="flex w-full items-center justify-center lg:grow">
                    <main className="flex w-full max-w-[335px] flex-col items-center text-center lg:max-w-4xl">
                        <div className="mb-8">
                            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                                Pro Graphics
                            </h1>
                            <p className="mt-3 text-lg text-blue-200/80 sm:text-xl">
                                Backend Management System
                            </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-3">
                            <div className="rounded-xl border border-blue-800/50 bg-blue-900/50 p-6 text-left backdrop-blur-sm">
                                <div className="mb-2 text-2xl">📝</div>
                                <h3 className="mb-1 font-semibold text-amber-400">Blog CMS</h3>
                                <p className="text-sm text-blue-200/70">
                                    Create, edit and manage blog content with the full CMS.
                                </p>
                            </div>
                            <div className="rounded-xl border border-blue-800/50 bg-blue-900/50 p-6 text-left backdrop-blur-sm">
                                <div className="mb-2 text-2xl">🔐</div>
                                <h3 className="mb-1 font-semibold text-amber-400">User Management</h3>
                                <p className="text-sm text-blue-200/70">
                                    Secure authentication with email verification and profile settings.
                                </p>
                            </div>
                            <div className="rounded-xl border border-blue-800/50 bg-blue-900/50 p-6 text-left backdrop-blur-sm">
                                <div className="mb-2 text-2xl">⚡</div>
                                <h3 className="mb-1 font-semibold text-amber-400">API Ready</h3>
                                <p className="text-sm text-blue-200/70">
                                    Built on Laravel with a modern Inertia + React stack.
                                </p>
                            </div>
                        </div>

                        {auth.user ? (
                            <Link
                                href={dashboard()}
                                className="mt-10 inline-flex items-center gap-2 rounded-xl bg-amber-400 px-8 py-3 text-base font-semibold text-blue-950 transition-colors hover:bg-amber-300"
                            >
                                Go to Dashboard
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Link>
                        ) : (
                            <Link
                                href={login()}
                                className="mt-10 inline-flex items-center gap-2 rounded-xl bg-amber-400 px-8 py-3 text-base font-semibold text-blue-950 transition-colors hover:bg-amber-300"
                            >
                                Get Started
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Link>
                        )}
                    </main>
                </div>

                <footer className="pb-6 text-center text-sm text-blue-300/50">
                    Pro Graphics &mdash; Durban's Vehicle Branding & Signage Specialists
                </footer>
            </div>
        </>
    );
}
