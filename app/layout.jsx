'use client';

import AuthProvider from '@components/AuthProvider/AuthProvider';
import Navbar from '@components/Navbar';

import '@styles/globals.css';
import { usePathname } from 'next/navigation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
  title: 'Create Events',
  description: 'Event Ticketing System',
};

const RootLayout = ({ children }) => {
  const pathname = usePathname();
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            {pathname === '/dashboard/login' ||
            pathname === '/dashboard/register' ? (
              <>{children}</>
            ) : (
              <>
                <Navbar />
                {children}
              </>
            )}
            <ToastContainer
              position="bottom-right"
              theme="dark"
              autoClose={3000}
            />
          </main>
        </AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
