'use client';

import EventFeed from '@components/EventFeed';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
  const session = useSession();
  const router = useRouter();

  if (session.status === 'loading') {
    return <p>Loading...</p>;
  }
  if (session.status === 'unauthenticated') {
    router.push('/dashboard/login');
  }

  if (session.status === 'authenticated') {
    return (
      <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
          <span className="blue_gradient">Featured Events</span>
        </h1>
        <EventFeed />
      </section>
    );
  }
};

export default Dashboard; 
