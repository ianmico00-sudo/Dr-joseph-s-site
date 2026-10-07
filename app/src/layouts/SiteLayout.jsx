import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

export default function SiteLayout() {
  const { pathname } = useLocation();

  // Start every page at the top.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {/* key restarts the scroll-in effects on each page */}
      <main key={pathname} className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
