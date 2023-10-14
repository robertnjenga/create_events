import { NextResponse } from 'next/server';
import Event from '@models/Event';
import connect from '@utils/db';

export const GET = async () => {
  try {
    await connect();
    
    const events = await Event.find({}).populate('creator');
    return new NextResponse(JSON.stringify(events), { status: 200 });
     // Add a unique identifier to the URL to force a cache-busting reload
     const url = new URL(request.url);
     url.searchParams.set("t", Date.now());
     response.headers.set("Cache-Control", "no-cache, no-store, must-revalidate");
     response.headers.set("Pragma", "no-cache");
     response.headers.set("Expires", "0");
     response.headers.set("Location", url.toString());

     return response;
  } catch (error) {
    return new NextResponse('Database Error', { status: 500 });
  }
} 