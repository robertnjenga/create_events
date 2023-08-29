import { NextResponse } from 'next/server';
import Event from '@models/Event';
import connect from '@utils/db';

// export const POST = async (request) => {
//   const body = await request.json();
//   const newEvent = new Event(body);
//   try {
//     await connect();

//     await newEvent.save();
//     return new NextResponse('Event has been created', { status: 201 });
//   } catch (error) {
//     return new NextResponse('Database Error', { status: 500 });
//   }
// };

export const POST = async (req) => {
  const { userId, title, date, time, venue, description } = await req.json();
  try {
    await connect();
    const newEvent = new Event({
      creator: userId,
      title,
      date,
      time,
      venue,
      description,
    });
    await newEvent.save();
    return new NextResponse('Event has been created', { status: 201 });
  } catch (error) {
    return new NextResponse('Failed to create Event', { status: 500 });
  }
};
