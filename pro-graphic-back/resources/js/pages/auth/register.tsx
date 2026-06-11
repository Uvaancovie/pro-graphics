import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { login } from '@/routes';

export default function Register() {
    return (
        <>
            <Head title="Register" />

            <div className="rounded-xl border border-blue-800/50 bg-blue-900/40 p-6 backdrop-blur-sm">
                <Form
                    action="/register"
                    method="post"
                    className="flex flex-col gap-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="name" className="text-white">Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        required
                                        autoFocus
                                        autoComplete="name"
                                        placeholder="Full name"
                                        className="border-blue-700/50 bg-blue-950/60 text-white placeholder:text-blue-300/50"
                                    />
                                    <InputError message={errors.name} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="email" className="text-white">Email address</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        required
                                        autoComplete="email"
                                        placeholder="email@example.com"
                                        className="border-blue-700/50 bg-blue-950/60 text-white placeholder:text-blue-300/50"
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password" className="text-white">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        name="password"
                                        required
                                        autoComplete="new-password"
                                        placeholder="Password"
                                        className="border-blue-700/50 bg-blue-950/60 text-white placeholder:text-blue-300/50"
                                    />
                                    <InputError message={errors.password} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password_confirmation" className="text-white">Confirm password</Label>
                                    <Input
                                        id="password_confirmation"
                                        type="password"
                                        name="password_confirmation"
                                        required
                                        autoComplete="new-password"
                                        placeholder="Confirm password"
                                        className="border-blue-700/50 bg-blue-950/60 text-white placeholder:text-blue-300/50"
                                    />
                                    <InputError message={errors.password_confirmation} />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-amber-400 text-blue-950 hover:bg-amber-300"
                                    disabled={processing}
                                >
                                    {processing && <Spinner />}
                                    Create account
                                </Button>
                            </div>

                            <p className="text-center text-sm text-blue-200/70">
                                Already have an account?{' '}
                                <TextLink href={login()} className="text-amber-400 hover:text-amber-300">Log in</TextLink>
                            </p>
                        </>
                    )}
                </Form>
            </div>
        </>
    );
}

Register.layout = {
    title: 'Create an account',
    description: 'Enter your details to get started with the Pro Graphics backend',
};
