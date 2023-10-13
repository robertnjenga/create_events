import Event from '@models/Event';
import connect from '@utils/db';
import { NextResponse } from 'next/server';
import Attendee from '@models/Attendee';

export const POST = async (req, { params }) => {
  const { passcode } = await req.json();

  try {
    await connect();

    // Find the existing event by ID
    const existingEvent = await Event.findById(params.id).populate({
      path: 'attendees'});

    if (!existingEvent)
      return new NextResponse('Event not found', { status: 404 });

    // Find the attendee by passcode
    const attendee = existingEvent.attendees.find((a) => a.passcode === passcode)
    if (!attendee)
    return new NextResponse('Invalid passcode', { status: 404 });

    // Mark the attendee as validated
    attendee.validated = true;
    await existingEvent.save();

    return new NextResponse(JSON.stringify(existingEvent), { status: 200 });
  } catch (error) {
    return new NextResponse('Bad Request', { status: 400 });
  }
};
