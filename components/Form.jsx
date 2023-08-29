import Link from 'next/link';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css'; 

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
          <span className="font-satoshi font-semibold text-base text-gray-700">Title: {' '}</span>
          <input
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
            Venue: {' '}
          </span>
          <input
            type="text"
            placeholder="Event Venue"
            value={eventVenue}
            onChange={(e) => setEventVenue(e.target.value)}
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

export default Form;
