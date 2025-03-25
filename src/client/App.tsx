// App.tsx
import './Main.css';
import NavBar from './components/NavBar/NavBar';
import CookieConsentBanner from './components/cookie-consent/Banner';
import { useMemo, useEffect } from 'react';
import { routes } from 'wasp/client/router';
import { Outlet, useLocation } from 'react-router-dom';
import { useAuth } from 'wasp/client/auth';
import { updateCurrentUser } from 'wasp/client/operations';
import { Component as FeedbackPopup } from '../components/ui/feedbackpopup';

export default function App() {
  const location = useLocation();
  const { data: user } = useAuth();

  const isAdminDashboard = useMemo(() => {
    return location.pathname.startsWith('/admin');
  }, [location]);

  useEffect(() => {
    if (user) {
      const lastSeenAt = new Date(user.lastActiveTimestamp);
      const today = new Date();
      if (today.getTime() - lastSeenAt.getTime() > 5 * 60 * 1000) {
        updateCurrentUser({ lastActiveTimestamp: today });
      }
    }
  }, [user]);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView();
      }
    }
  }, [location]);

  return (
    <>
      <div className='min-h-screen dark:text-white dark:bg-boxdark relative z-0'>
        {isAdminDashboard ? (
          <Outlet />
        ) : (
          <>
            <NavBar />
            <Outlet />
          </>
        )}
      </div>
      <div className="fixed bottom-4 right-4 z-1000">
        <FeedbackPopup />
      </div>
      <CookieConsentBanner />
    </>
  );
}