'use client';

import { useState, useEffect } from 'react';

import { useRouter, useSearchParams } from 'next/navigation'; 

import Form from '@components/Form';

const EditEvent = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const eventId = searchParams.get('id');

  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState(new Date());
  const [eventTime, setEventTime] = useState('00:00');
  const [eventVenue, setEventVenue] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  
  useEffect(() => {
    const getEventDetails = async () => {
      const response = await fetch(`/api/event/${eventId}`);  
      const data = await response.json();

      setEventTitle(data.title)
      setEventDate(new Date(data.date))
      setEventTime(data.time)
      setEventVenue(data.venue)
      setEventDescription(data.description)
    };
    if (eventId)  getEventDetails();
  }, [eventId]);

  const updateEvent = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!eventId) return alert('Event ID not found');

    try {
      const response = await fetch(`/api/event/${eventId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          title: eventTitle,
          date: eventDate,
          time: eventTime,
          venue: eventVenue,
          description: eventDescription,
        }),
      });
      if (response.ok) {
        router.push('/dashboard');  
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
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
      handleSubmit={updateEvent}
    />
  );
};

export default EditEvent; 
