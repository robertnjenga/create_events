'use client';

import { useState, useEffect } from 'react';

import { toast } from 'react-toastify';

import { useRouter, useSearchParams } from 'next/navigation';
import { convertTo12HourFormat } from '@utils/util';

const RegisterEventPage = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const eventId = searchParams.get('id');

  const [event, setEvent] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [error, seterror] = useState(false);

  const formatted = new Date(event.date).toLocaleDateString('en', {
    year: 'numeric',
    day: '2-digit',
    month: 'long',
  });

  // const [eventTitle, setEventTitle] = useState('');
  // const [eventDate, setEventDate] = useState(new Date());
  // const [eventTime, setEventTime] = useState('00:00');
  // const [eventVenue, setEventVenue] = useState('');
  // const [eventDescription, setEventDescription] = useState('');
  // const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const getEventDetails = async () => {
      const response = await fetch(`/api/event/${eventId}`);
      const data = await response.json();

      setEvent(data);

      // setEventTitle(data.title)
      // setEventDate(new Date(data.date))
      // setEventTime(data.time)
      // setEventVenue(data.venue)
      // setEventDescription(data.description)
    };
    if (eventId) getEventDetails();
  }, [eventId]);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/event/register/${eventId}`, {
        next: {
          revalidate: 0,
        },
        method: 'POST',
        body: JSON.stringify({ name, email }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      if (response.status === 200) {
        toast.success("Registration successful");
        router.push('/dashboard');
      }
      return response.json();
    } catch (error) {
      toast.error("Registration Error: " + error.message);
    }
  };

  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center mb-16">
        <span className="blue_gradient">Reserve a Spot</span>
      </h1>
      {event && (
        <div className="event_card">
          <h1 className="desc">{event.title}</h1>
          <p className="my-4 font-satoshi text-md text-gray-700">
            {event.description}
          </p>
          <p className="my-4 font-satoshi text-md text-gray-700">
            Date: {formatted}
          </p>
          <p className="my-4 font-satoshi text-md text-gray-700">
            Time: {convertTo12HourFormat(event.time)}
          </p>
          <form className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism">
            <label>
              <span className="font-satoshi font-semibold text-base text-gray-700">
                Name:{' '}
              </span>
              <input
                type="text"
                placeholder="Name"
                className="form_input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
            <label>
              <span className="font-satoshi font-semibold text-base text-gray-700">
                Email:{' '}
              </span>
              <input
                type="email"
                placeholder="Email"
                className="form_input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <button
              type="submit"
              className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
              onClick={handleRegister}
            >
              Register
            </button>
          </form>
        </div>
      )}
    </section>
  );
};

export default RegisterEventPage;
