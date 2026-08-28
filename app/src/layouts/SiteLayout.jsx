import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import { ProfileProvider } from '../context/ProfileContext.jsx';

export default function SiteLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  }, [pathname]);

  return (
    <ProfileProvider>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </ProfileProvider>
  );
}
