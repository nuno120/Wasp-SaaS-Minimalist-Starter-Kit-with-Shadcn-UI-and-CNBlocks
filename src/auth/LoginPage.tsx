import { Link as WaspRouterLink, routes } from 'wasp/client/router';
import { LoginForm } from 'wasp/client/auth';
import logoUrl from '../../public/logo.png';
import type { CustomizationOptions } from 'wasp/client/auth';

const appearance: CustomizationOptions['appearance'] = {
    colors: {
        brand: 'hsl(var(--primary))', // Using our theme's primary color
        brandAccent: 'rgb(75 85 99)', // gray-600
        submitButtonText: 'white',
        submitButtonTextHover: 'black', // Text color on hover
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

export default function LoginPage() {
    return (
        <div className='mt-10 px-6'>
            <div className="bg-muted m-auto h-fit w-full max-w-sm overflow-hidden rounded-[calc(var(--radius)+.125rem)] border shadow-md shadow-zinc-950/5 dark:[--color-muted:var(--color-zinc-900)]">
                <div className="bg-card -m-px rounded-[calc(var(--radius)+.125rem)] border p-8 pb-6">
                    <div className="text-center">
                        <a href="/" aria-label="go home" className="mx-auto block w-fit">
                            <img src={logoUrl} alt="Logo" />
                        </a>
                        <h1 className="mb-1 mt-4 text-xl font-semibold">Sign In</h1>
                        <p className="text-sm">Welcome back! Sign in to continue</p>
                    </div>

                    <div className="mt-6">
                        <LoginForm appearance={appearance} />
                    </div>
                </div>

                <div className="p-3 space-y-2">
                    <p className="text-accent-foreground text-center text-sm">
                        Don't have an account?{' '}
                        <WaspRouterLink to={routes.SignupRoute.to} className="underline">
                            Create account
                        </WaspRouterLink>
                    </p>
                    <p className="text-accent-foreground text-center text-sm">
                        Forgot your password?{' '}
                        <WaspRouterLink to={routes.RequestPasswordResetRoute.to} className="underline">
                            Reset it
                        </WaspRouterLink>
                    </p>
                </div>
            </div>
        </div>
    );
}
