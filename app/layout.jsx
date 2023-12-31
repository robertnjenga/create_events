"use client"

import AuthProvider from '@components/AuthProvider/AuthProvider';
import Navbar from '@components/Navbar';

import '@styles/globals.css';
import { usePathname } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
              position="top-right"
              theme="light"
              autoClose={3000}
            />
          </main>
        </AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
