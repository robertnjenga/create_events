'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { convertTo12HourFormat } from '../utils/util';

const EventCard = ({ event, handleEdit, handleDelete }) => {
  const formatted = new Date(event.date).toLocaleDateString('en', {
    year: 'numeric',
    day: '2-digit',
    month: 'long',
  });

  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  // const handleRegisterEvent = (event) => {
  //   router.push(`/register-event?id=${event._id}`);
  // };

  return (
    <div className="event_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Link href="/profile">
            <Image
              src={
                event.creator.image
                  ? event.creator.image
                  : '/assets/images/logo.svg'
              }
              alt="user_image"
              width={40}
              height={40}
              className="rounded-full object-contain"
            />
          </Link>

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {event.creator.username
                ? event.creator.username
                : event.creator.name}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {event.creator.email}
            </p>
          </div>
        </div>
      </div>
      <h2 className="my-4 font-satoshi text-md blue_gradient">{event.title}</h2>
      <p className="my-4 font-satoshi text-md text-gray-700">
        Date: {formatted}
      </p>
      <p className="my-4 font-satoshi text-md text-gray-700">
        Time: {convertTo12HourFormat(event.time)}
      </p>
      <p className="my-4 font-satoshi text-md text-gray-700">
        Venue: {event.venue}
      </p>
      <p className="my-4 font-satoshi text-md text-gray-700">
        {event.description}
      </p>
      <p className="my-4 font-satoshi text-md text-gray-700">
        Attendees:{' '}
        {event.attendees.length > 0
          ? `${event.attendees.length} Attending`
          : `No attendees yet`}
      </p>
      {session?.user.id === event.creator._id && pathName === '/profile' && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm red_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
          <Link href={`/validate-event?id=${event._id}`}>
            <p className="font-inter text-sm green_gradient cursor-pointer">
              Validate
            </p>
          </Link>
        </div>
      )}
      {pathName === '/dashboard' && (
        <Link href={`/register-event?id=${event._id}`}>
          <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
            <p className="font-inter text-sm orange_gradient cursor-pointer">
              Register Now
            </p>
          </div>
        </Link>
      )}
    </div>
  );
};

export default EventCard;
