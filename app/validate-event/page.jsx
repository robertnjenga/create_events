'use client';

import { useState, useEffect } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

const ValidateEventPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const eventId = searchParams.get('id');
  const [event, setEvent] = useState('');
  const [passcode, setPasscode] = useState('');
  const [validationResult, setValidationResult] = useState('');

  useEffect(() => {
    const getEventDetails = async () => {
      const response = await fetch(`/api/event/${eventId}`);
      const data = await response.json();

      setEvent(data);
    };
    if (eventId) getEventDetails();
  }, [eventId]);

  const handleValidation = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/event/validate/${eventId}`, {
        method: 'POST',
        body: JSON.stringify({ passcode }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      if (response.status === 200) {
        const validationData = await response.json()
        setValidationResult(validationData.message)
      }
      return response.json();
    } catch (error) {
      console.log(error);
    }
  };
  
console.log(event.attendees);
  return (
    <section className="w-full flex-center flex-col">
      {event && (
        <div>
          <h1>{event.title}</h1>
          <p>Number Of Attendees: {event.attendees.length}</p>
          <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
            <button
              type="submit"
              className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
            >
              Disable Registration
            </button>
           
          </div>
          <ul>
            {event.attendees.map((attendee) => (
              <li key={attendee._id}>
                {attendee.name} 
              </li>
            ))}
          </ul>
          <div>
            <h3>Validate Attendee</h3>
            <form className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism">
              <label>
                <span className="font-satoshi font-semibold text-base text-gray-700">
                  Passcode:{' '}
                </span>
                <input
                  type="text"
                  placeholder="Passcode"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  required
                />
              </label>
              <button
                type="submit"
                className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
                onClick={handleValidation}
              >
                Validate
              </button>
              {validationResult && <p>{validationResult}</p>}
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default ValidateEventPage;
