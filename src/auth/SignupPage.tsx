import { Link as WaspRouterLink, routes } from 'wasp/client/router';
import { SignupForm } from 'wasp/client/auth';
import { Logo } from '../components/logo';
import type { CustomizationOptions } from 'wasp/client/auth';

const appearance: CustomizationOptions['appearance'] = {
    colors: {
        brand: 'hsl(var(--primary))',
        brandAccent: 'rgb(75 85 99)', // gray-600
        submitButtonText: 'white',
        inputBorder: 'hsl(var(--input))',
        inputText: 'hsl(var(--foreground))',
        inputBackground: 'transparent',
        defaultButtonBackground: 'white',
        defaultButtonBorder: 'hsl(var(--input))',
        defaultButtonText: 'hsl(var(--foreground))',
        anchorTextColor: 'hsl(var(--foreground))',
        dividerBackground: 'hsl(var(--input))',
    },
    elements: {
        input: 'rounded-md border',
        submitButton: 'rounded-md',
        formButtonPrimary: 'shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary',
        card: 'shadow-none',
    },
};

export function Signup() {
    return (
        <div className='mt-10 px-6'>
            <div className="bg-muted m-auto h-fit w-full max-w-sm overflow-hidden rounded-[calc(var(--radius)+.125rem)] border shadow-md shadow-zinc-950/5 dark:[--color-muted:var(--color-zinc-900)]">
                <div className="bg-card -m-px rounded-[calc(var(--radius)+.125rem)] border p-8 pb-6">
                    <div className="text-center">
                        <a href="/" aria-label="go home" className="mx-auto block w-fit">
                            <Logo />
                        </a>
                        <h1 className="mb-1 mt-4 text-xl font-semibold">Sign Up</h1>
                        <p className="text-sm">Create your account to get started</p>
                    </div>

                    <div className="mt-6">
                        <SignupForm appearance={appearance} />
                    </div>
                </div>

                <div className="p-3">
                    <p className="text-accent-foreground text-center text-sm">
                        Already have an account?{' '}
                        <WaspRouterLink to={routes.LoginRoute.to} className="underline">
                            Sign in
                        </WaspRouterLink>
                    </p>
                </div>
            </div>
        </div>
    );
}
