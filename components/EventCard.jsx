'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { convertTo12HourFormat } from '../utils/util';

import { useLoadScript, GoogleMap, MarkerF } from '@react-google-maps/api';
import { useState, useEffect, useMemo } from 'react';

import { getGeocode } from 'use-places-autocomplete';

const EventCard = ({ event, handleEdit, handleDelete }) => {
  const formatted = new Date(event.date).toLocaleDateString('en', {
    year: 'numeric',
    day: '2-digit',
    month: 'long',
  });

  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [lat, setLat] = useState(27.672932021393862);
  const [lng, setLng] = useState(85.31184012689732);

  // const libraries = useMemo(() => ['places'], []);
  const mapCenter = useMemo(() => ({ lat: lat, lng: lng }), [lat, lng]);

  const mapOptions = useMemo(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: false,
    }),
    []
  );

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
    // libraries: libraries,
  });

  const getGeocode = async () => {
    const location = event.venue;
    const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${key}`
      );
      const data = await response.json();

      const eventLat = data.results[0].geometry?.location.lat;
      const eventLng = data.results[0].geometry?.location.lng;

      setLat(eventLat);
      setLng(eventLng);
    } catch (error) {
      console.log(error);
    }
  };

  if (!isLoaded) {
    return <p>Loading...</p>;
  }
  // console.log(event.venue);
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
      <GoogleMap
      className="w-full"
        options={mapOptions}
        zoom={14}
        center={mapCenter}
        mapTypeId={google.maps.MapTypeId.ROADMAP}
        mapContainerStyle={{ width: '100%', height: '300px' }}
        onLoad={() => getGeocode()}
      >
        <MarkerF
          position={mapCenter}
          onLoad={() => console.log('Marker Loaded')}
        />
      </GoogleMap>

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
          {/* <Link href={`/validate-event?id=${event._id}`}>
            <p className="font-inter text-sm green_gradient cursor-pointer">
              Validate
            </p>
          </Link> */}
        </div>
      )}
      {pathName === '/dashboard' && (
        <Link href={`/register-event?id=${event._id}`}>
          <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
            <button className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white">
              Register Now
            </button>
          </div>
        </Link>
      )}
    </div>
  );
};

export default EventCard;
