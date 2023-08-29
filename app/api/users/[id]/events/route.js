import Event from '@models/Event';
import connect from '@utils/db';
import { NextResponse } from 'next/server';

export const GET = async (req,{ params }) => {
  try {
    await connect();
    
    const events = await Event.find({creator: params.id}).populate('creator');
    
    return new NextResponse(JSON.stringify(events), { status: 200 });
  } catch (error) {
    return new NextResponse('Database Error', { status: 500 });
  }
} 
