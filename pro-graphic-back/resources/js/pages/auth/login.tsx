import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

type Props = {
    status?: string;
    canResetPassword: boolean;
};

export default function Login({ status, canResetPassword }: Props) {
    return (
        <>
            <Head title="Log in" />

            <div className="rounded-xl border border-blue-800/50 bg-blue-900/40 p-6 backdrop-blur-sm">
                <Form
                    {...store.form()}
                    resetOnSuccess={['password']}
                    className="flex flex-col gap-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="email" className="text-white">Email address</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="email"
                                        placeholder="email@example.com"
                                        className="border-blue-700/50 bg-blue-950/60 text-white placeholder:text-blue-300/50"
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password" className="text-white">Password</Label>
                                        {canResetPassword && (
                                            <TextLink
                                                href={request()}
                                                className="ml-auto text-sm text-blue-300 hover:text-amber-400"
                                                tabIndex={5}
                                            >
                                                Forgot your password?
                                            </TextLink>
                                        )}
                                    </div>
                                    <PasswordInput
                                        id="password"
                                        name="password"
                                        required
                                        tabIndex={2}
                                        autoComplete="current-password"
                                        placeholder="Password"
                                        className="border-blue-700/50 bg-blue-950/60 text-white placeholder:text-blue-300/50"
                                    />
                                    <InputError message={errors.password} />
                                </div>

                                <div className="flex items-center space-x-3">
                                    <Checkbox
                                        id="remember"
                                        name="remember"
                                        tabIndex={3}
                                        className="border-blue-700/50 data-[state=checked]:bg-amber-400 data-[state=checked]:text-blue-950"
                                    />
                                    <Label htmlFor="remember" className="text-white">Remember me</Label>
                                </div>

                                <Button
                                    type="submit"
                                    className="mt-4 w-full bg-amber-400 text-blue-950 hover:bg-amber-300"
                                    tabIndex={4}
                                    disabled={processing}
                                    data-test="login-button"
                                >
                                    {processing && <Spinner />}
                                    Log in
                                </Button>
                            </div>

                            <p className="text-center text-sm text-blue-200/70">
                                Don't have an account?{' '}
                                <TextLink href="/register" className="text-amber-400 hover:text-amber-300">Register</TextLink>
                            </p>
                        </>
                    )}
                </Form>
            </div>

            {status && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    {status}
                </div>
            )}
        </>
    );
}

Login.layout = {
    title: 'Welcome back',
    description: 'Enter your credentials to access the Pro Graphics backend',
};
