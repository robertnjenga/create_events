import { NextResponse } from 'next/server';
import Event from '@models/Event';
import connect from '@utils/db';

export const GET = async () => {
  try {
    await connect();
    
    const events = await Event.find({}).populate('creator');
    return new NextResponse(JSON.stringify(events), { status: 200 });
    
  } catch (error) {
    return new NextResponse('Database Error', { status: 500 });
  }
} 