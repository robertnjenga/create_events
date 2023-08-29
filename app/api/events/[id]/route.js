import Event from '@models/Event';
import connect from '@utils/db';
import { NextResponse } from 'next/server';

// GET (read)
export const GET = async (req, { params } ) => {
  try {
    await connect();

    const event = await Event.findById(params.id).populate('creator');
    
    if (!event) return new NextResponse('Event Not Found', { status: 404 });

    return new NextResponse(JSON.stringify(event), { status: 200 });
  } catch (error) {
    return new NextResponse('Database Error', { status: 500 });
  }
}; 