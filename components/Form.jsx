import Link from 'next/link';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';

import {
  useLoadScript,
  GoogleMap,
  MarkerF,
  CircleF,
} from '@react-google-maps/api';

import { useMemo, useState } from 'react';

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';

import styles from '../styles/page.module.css';

const Form = ({
  type,
  submitting,
  handleSubmit,
  eventTitle,
  setEventTitle,
  eventDate,
  setEventDate,
  eventTime,
  setEventTime,
  eventVenue,
  setEventVenue,
  eventDescription,
  setEventDescription,
}) => {
  const [lat, setLat] = useState(27.672932021393862);
  const [lng, setLng] = useState(85.31184012689732);

  const libraries = useMemo(() => ['places'], []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY, 
    libraries: libraries,
  });

  if (!isLoaded) {
    return <p>Loading...</p>;
  }
  
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Event</span>
      </h1>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Title:{' '}
          </span>
          <input
            className="form_input"
            type="text"
            placeholder="Event Title"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Event Date:{' '}
          </span>
          <DatePicker
            className="form_input"
            selected={eventDate}
            minDate={new Date()}
            onChange={(date) => setEventDate(date)}
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Event Time:{' '}
          </span>
          <TimePicker
            value={eventTime}
            onChange={(time) => setEventTime(time)}
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Venue:{' '}
          </span>
          <PlacesAutocomplete
            onAddressSelect={(address) => {
              getGeocode({ address: address }).then((results) => {
                const { lat, lng } = getLatLng(results[0]);

                setLat(lat);
                setLng(lng);
                setEventVenue(address);
                // console.log(eventVenue);
              });
            }}
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Description:
          </span>
          <textarea
            placeholder="Event Description"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            className="form_textarea"
          />
        </label>
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};
const PlacesAutocomplete = ({ onAddressSelect }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: { componentRestrictions: { country: 'us' } },
    debounce: 300,
    cache: 86400,
  });

  const renderSuggestions = () => {
    return data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
        description,
      } = suggestion;

      return (
        <li
          key={place_id}
          onClick={() => {
            setValue(description, false);
            clearSuggestions();
            onAddressSelect && onAddressSelect(description);
          }}
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });
  };

  return (
    <div className={styles.autocompleteWrapper}>
      <input
        className="form_input"
        value={value}
        disabled={!ready}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Event Venue"
      />

      {status === 'OK' && (
        <ul className={styles.suggestionWrapper}>{renderSuggestions()}</ul>
      )}
    </div>
  );
};

export default Form; 
