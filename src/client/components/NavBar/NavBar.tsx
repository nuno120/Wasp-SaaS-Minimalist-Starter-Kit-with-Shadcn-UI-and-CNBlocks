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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

                {/* Mobile Menu Button - Always visible */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
                  className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                  <Menu className={cn("m-auto size-6 duration-200", 
                    isMobileMenuOpen && "rotate-180 scale-0 opacity-0")} />
                  <X className={cn("absolute inset-0 m-auto size-6 -rotate-180 duration-200",
                    isMobileMenuOpen ? "rotate-0 scale-100 opacity-100" : "scale-0 opacity-0")} />
                </button>
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
                "bg-background fixed inset-0 top-[65px] z-50 flex flex-col items-center justify-start overflow-y-auto py-8 lg:relative lg:inset-auto lg:top-0 lg:z-auto lg:flex lg:w-fit lg:flex-row lg:items-center lg:gap-6 lg:py-0 lg:bg-transparent",
                isMobileMenuOpen ? "block" : "hidden lg:flex"
              )}>
                {/* Mobile Navigation - Always show when menu is open */}
                <div className="w-full px-6 lg:hidden">
                  <ul className="space-y-6 text-base">
                    {alwaysVisibleItems.map((item, index) => (
                      <li key={index}>
                        <Link
                          onClick={() => setIsMobileMenuOpen(false)}
                          to={item.to}
                          className="text-muted-foreground hover:text-accent-foreground block duration-150 text-lg">
                          <span>{item.name}</span>
                        </Link>
                      </li>
                    ))}
                    {user && navigationItems.map((item, index) => (
                      <li key={index}>
                        <Link
                          onClick={() => setIsMobileMenuOpen(false)}
                          to={item.to}
                          className="text-muted-foreground hover:text-accent-foreground block duration-150 text-lg">
                          <span>{item.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Auth Buttons */}
                <div className="mt-8 flex w-full flex-col space-y-3 px-6 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit lg:mt-0 lg:px-0">
                  {isUserLoading ? null : !user ? (
                    <>
                      {/* Login/Signup buttons - Only show on desktop or when not scrolled */}
                      <div className={cn("flex w-full flex-col gap-3 sm:flex-row transition-all duration-300",
                        isScrolled ? "lg:hidden" : "lg:flex")}> 
                        <Button
                          onClick={() => setIsMobileMenuOpen(false)}
                          asChild
                          variant="outline"
                          size="sm"
                          className="w-full sm:w-auto">
                          <Link to={routes.LoginRoute.to}>
                            <span>Login</span>
                          </Link>
                        </Button>
                        <Button
                          onClick={() => setIsMobileMenuOpen(false)}
                          asChild
                          size="sm"
                          className="w-full sm:w-auto">
                          <Link to={routes.SignupRoute.to}>
                            <span>{isScrolled ? "Get Started" : "Sign Up"}</span>
                          </Link>
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <Button
                        onClick={() => setIsMobileMenuOpen(false)}
                        asChild
                        size="sm"
                        variant="outline"
                        className="w-full sm:w-auto">
                        <Link to={routes.AccountRoute.to}>
                          <span>Account</span>
                        </Link>
                      </Button>
                      {user.isAdmin && (
                        <Button
                          onClick={() => setIsMobileMenuOpen(false)}
                          asChild
                          size="sm"
                          className="w-full sm:w-auto">
                          <Link to={routes.AdminRoute.to}>
                            <span>Admin</span>
                          </Link>
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          logout();
                        }}
                        className="w-full sm:w-auto"> 
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