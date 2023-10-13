import Event from '@models/Event';
import connect from '@utils/db';
import { NextResponse } from 'next/server';

// GET (read)
export const GET = async (req, { params }) => {
  try {
    await connect();

    const event = await Event.findById(params.id).populate('creator'); 
    if (!event) return new NextResponse('Event Not Found', { status: 404 });

    return new NextResponse(JSON.stringify(event), { status: 200 });
  } catch (error) {
    return new NextResponse('Database Error', { status: 500 });
  }
}; 

// PATCH (update)
export const PATCH = async (req, { params }) => {
  const { title, date, time, venue, description } = await req.json();

  try {
    await connect();

    // Find the existing event by ID
    const existingEvent = await Event.findById(params.id);

    if (!existingEvent)
      return new NextResponse('Event not found', { status: 404 }); 

    // Update the Event with new data
    existingEvent.title = title;
    existingEvent.date = date;
    existingEvent.time = time;
    existingEvent.venue = venue;
    existingEvent.description = description;

    await existingEvent.save();

    return new NextResponse(JSON.stringify(existingEvent), { status: 200 });
  } catch (error) {
    return new NextResponse('Error Updating Event', { status: 500 });
  }
};

// DELETE (delete)
export const DELETE = async (req, { params }) => { 
  try {
    await connect();

    await Event.findByIdAndRemove(params.id);

    return new NextResponse('Event deleted successfully', { status: 200 });
  } catch (error) {
    return new NextResponse('Failed to delete event', { status: 500 });
  }
};
