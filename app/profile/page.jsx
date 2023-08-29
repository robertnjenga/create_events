'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile';

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch(`/api/users/${session?.user.id}/events`);
      const data = await res.json();

      setEvents(data);
    };

    if (session?.user.id) {
      fetchEvents();
    }
  }, [session?.user.id]);

  const handleEdit = (event) => {
    router.push(`/update-event?id=${event._id}`);
  };
  const handleDelete = async (event) => {
    const hasConfirmed = confirm('Are you sure you want to delete this Event?');

    if (hasConfirmed) {
      try {
        await fetch(`/api/event/${event._id.toString()}`, {
          method: 'DELETE',
        });

        const filteredEvents = events.filter((item) => item._id !== event._id);

        setEvents(filteredEvents);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your profile page"
      data={events}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
