'use client';

import { useState, useEffect } from 'react';
import EventCard from './EventCard';
import Link from 'next/link';

const EventCardList = ({ data }) => {
  return (
    <div className="mt-16 event_layout">
      {data.map((event) => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  );
};

const EventFeed = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch('/api/event');
      const data = await res.json();
      setEvents(data);
    };
    fetchEvents();
  }, []);
  return (
    <section className="feed">
      <EventCardList data={events} />
    </section>
  );
};

export default EventFeed;
