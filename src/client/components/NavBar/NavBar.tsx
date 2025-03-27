//navbar.tsx
import { Link } from 'react-router-dom';
import { routes } from 'wasp/client/router';
import { useAuth } from 'wasp/client/auth';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { cn } from '../../../lib/utils';
import logoUrl from '../../../../public/logo.png';
import { logout } from 'wasp/client/auth';

// Export the NavigationItem type for use in other components
export interface NavigationItem {
  name: string;
  to: string;
}

// Define navigation items directly in the component
const navigationItems: NavigationItem[] = [
  { name: 'Projects', to: '/projects' },
  { name: 'Blueprints', to: '/view-blueprints' },
];

// Define always-visible navigation items
const alwaysVisibleItems: NavigationItem[] = [
  { name: 'Pricing', to: '/pricing' },
];

export default function NavBar() {
  const [menuState, setMenuState] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: user, isLoading: isUserLoading } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { LandingPageRoute } = routes; // Destructure routes if used elsewhere

  const logoLinkClasses = "flex items-center space-x-2"; // Define classes
  return (
    <>
      <header className="h-1">
        <nav
          data-state={menuState ? 'active' : undefined}
          className="fixed z-50 w-full px-2">
          <div className={cn('mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12', 
            isScrolled && 'bg-background/50 max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5')}>
            <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
              {/* Logo Section */}
              <div className="flex w-full justify-between lg:w-auto">
      <Link
        to={LandingPageRoute.to} // Shorter with destructuring
        aria-label="home"
        className={logoLinkClasses} // Use class string
      >
        <img src={logoUrl} alt="Logo" style={{ width: '40px', height: '40px' }} />
      </Link>


                {user && (
                  <button
                    onClick={() => setMenuState(!menuState)}
                    aria-label={menuState ? 'Close Menu' : 'Open Menu'}
                    className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                    <Menu className={cn("m-auto size-6 duration-200", 
                      menuState && "rotate-180 scale-0 opacity-0")} />
                    <X className={cn("absolute inset-0 m-auto size-6 -rotate-180 duration-200",
                      menuState ? "rotate-0 scale-100 opacity-100" : "scale-0 opacity-0")} />
                  </button>
                )}
              </div>

              {/* Combined Navigation Items */}
              <div className="absolute inset-0 m-auto hidden size-fit lg:block">
                <ul className="flex gap-8 text-sm">
                  {alwaysVisibleItems.concat(user ? navigationItems : []).map((item, index) => (
                    <li key={index}>
                      <Link
                        to={item.to}
                        className="text-muted-foreground hover:text-accent-foreground block duration-150">
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Mobile Menu & Auth Buttons */}
              <div className={cn(
                "bg-background absolute right-6 top-16 mb-6 w-[calc(100%-3rem)] flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:static lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent",
                menuState ? "block" : "hidden lg:flex"
              )}>
                {/* Mobile Navigation - Only show when user is logged in */}
                {user && (
                  <div className="lg:hidden">
                    <ul className="space-y-6 text-base">
                      {alwaysVisibleItems.map((item, index) => (
                        <li key={index}>
                          <Link
                            to={item.to}
                            className="text-muted-foreground hover:text-accent-foreground block duration-150">
                            <span>{item.name}</span>
                          </Link>
                        </li>
                      ))}
                      {navigationItems.map((item, index) => (
                        <li key={index}>
                          <Link
                            to={item.to}
                            className="text-muted-foreground hover:text-accent-foreground block duration-150">
                            <span>{item.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Auth Buttons */}
                <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                  {isUserLoading ? null : !user ? (
                    <>
                      {/* Login/Signup buttons - visible when not scrolled */}
                      <div className={cn("flex gap-3 transition-all duration-300",
                        isScrolled ? "lg:hidden lg:opacity-0" : "lg:flex lg:opacity-100")}>
                        <Button
                          asChild
                          variant="outline"
                          size="sm">
                          <Link to={routes.LoginRoute.to}>
                            <span>Login</span>
                          </Link>
                        </Button>
                        <Button
                          asChild
                          size="sm">
                          <Link to={routes.SignupRoute.to}>
                            <span>Sign Up</span>
                          </Link>
                        </Button>
                      </div>
                      {/* Get Started button - visible when scrolled */}
                      <div className={cn("transition-all duration-300",
                        isScrolled ? "lg:flex lg:opacity-100" : "lg:hidden lg:opacity-0")}>
                        <Button
                          asChild
                          size="sm">
                          <Link to={routes.SignupRoute.to}>
                            <span>Get Started</span>
                          </Link>
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <Button
                        asChild
                        size="sm"
                        variant="outline">
                        <Link to={routes.AccountRoute.to}>
                          <span>Account</span>
                        </Link>
                      </Button>
                      {user.isAdmin && (
                        <Button
                          asChild
                          size="sm">
                          <Link to={routes.AdminRoute.to}>
                            <span>Admin</span>
                          </Link>
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => logout()}>
                        Logout
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      {/* Spacer div to push content below the fixed navbar */}
      <div className="h-16" />
    </>
  );
}