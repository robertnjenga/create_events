'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import Form from '@components/Form';

const CreateEventPage = () => {
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState(new Date());
  const [eventTime, setEventTime] = useState('00:00');
  const [eventVenue, setEventVenue] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const router = useRouter();
  const { data: session } = useSession();

  const createEvent = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('/api/event/new', {
        next: {
          revalidate: 0,
        },
        method: 'POST',
        body: JSON.stringify({
          userId: session?.user.id,
          title: eventTitle,
          date: eventDate,
          time: eventTime,
          venue: eventVenue,
          description: eventDescription,
        }),
      });
      if (response.ok) {
        toast.success("Event created successfully");
        router.push('/dashboard');
        router.refresh();
      }
    } catch (error) {
      toast.error("Error creating event: " + error.message);
    } finally {
      setSubmitting(false);
    }
  }; 
  
  return (
    <Form
      type="Create"
      eventTitle={eventTitle}
      setEventTitle={setEventTitle}
      eventDate={eventDate}
      setEventDate={setEventDate}
      eventTime={eventTime}
      setEventTime={setEventTime}
      eventVenue={eventVenue}
      setEventVenue={setEventVenue}
      eventDescription={eventDescription}
      setEventDescription={setEventDescription}
      submitting={submitting}
      handleSubmit={createEvent}
    />
  );
};

export default CreateEventPage;
