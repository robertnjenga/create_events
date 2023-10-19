import Event from '@models/Event';
import connect from '@utils/db';
import { NextResponse } from 'next/server';
import Attendee from '@models/Attendee';
import nodemailer from 'nodemailer';
import { transporter, mailOptions } from '@config/nodemailer';

const email = process.env.EMAIL;
const pass = process.env.EMAIL_PASS;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const crypto = require('crypto');

const usedPasscodes = []; // Store used passcodes

// const handler = async (req, res, { params } ) => {
//   const { name, email } =  await req.json();
// // console.log(req.json);
//   try {

//     const event = await Event.findById(params.id);

//     if (!event) return new NextResponse('Event Not Found', { status: 404 });

//     // Create New Attendee
//     const attendee = new Attendee({ name, email });
//     await attendee.save();

//     // Add  attendee to event's attendee list
//     event.attendees.push();
//     await attendee.save();

//     // send email with event details and passcode

//     // return new NextResponse(JSON.stringify(event), { status: 200 });
//   } catch (error) {
//     return new NextResponse('Registration Error', { status: 500 });
//   }
// };

// export { handler as GET, handler as POST };

// const handler = async (req, res) => {
//   // const { id } = params;
//   const { name, email } = await req.json();
//   if (!name || !email) {
//     return new NextResponse('Bad Request', { status: 400 });
//   }
//   try {
//     await connect();

//     // Find the existing event by ID
//     const existingEvent = await Event.findById(params.id);

//     if (!existingEvent)
//       return new NextResponse('Event not found', { status: 404 });

//     // Create New Attendee
//     const attendee = new Attendee({ name, userEmail });
//     await attendee.save();

//     // Add  attendee to event's attendee list
//     existingEvent.attendees.push();
//     await existingEvent.save();

//     return new NextResponse(JSON.stringify(existingEvent), { status: 200 });

//     // send email with event details and passcode
//     transporter.sendMail({ ...mailOptions }, (error, info) => {
//       if (error) {
//         console.log(error);
//       } else {
//         console.log('Email sent: ' + info.response);
//         return new NextResponse('success', { status: 200 });
//       }
//     });
//   } catch (error) {
//     return new NextResponse('Bad Request', { status: 400 });
//   }
// };
// export { handler as GET, handler as POST };


export const POST = async (req, { params }) => {
  const { name, email } = await req.json();
  if (!name || !email) {
    return new NextResponse('Bad Request', { status: 400 });
  }

  try {
    await connect();

    // Find the existing event by ID
    const event = await Event.findById(params.id).populate({
      path: 'attendees'});
    if (!event) return new NextResponse('Event not found', { status: 404 });

    // Generate a unique passcode for the attendee
    let passcode = generateUniquePasscode(8);

    // Create New Attendee
    const newAttendee = new Attendee({ name, email, passcode });
    await newAttendee.save();

    // Add  attendee to event's attendee list
    event.attendees.push(newAttendee);

    await event.save();

    // send email with event details and passcode
    const transporter = nodemailer.createTransport({
      // pool: true,
      service: 'hotmail',
      // port: 2525,
      auth: {
        user: 'njoro60@hotmail.com',
        pass: process.env.EMAIL_PASSWORD,
      },
      // maxConnections: 1
    });
    // console.log(event.attendees);
    const mailOptions = {
      from: 'njoro60@hotmail.com',
      to: email,
      subject: 'Event Registration Confirmation',
      text: `Thank you for registering for ${event.title} Your passcode is ${passcode}`,
    };

    transporter.sendMail({ ...mailOptions }, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    event.attendees.toObject();
    return new NextResponse(JSON.parse(JSON.stringify(event)), { status: 200 });
  } catch (error) {
    return new NextResponse('Bad Request', { status: 400 });
  }
};

const generateUniquePasscode = (length) => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let passcode = '';

  do {
    passcode = Array.from(crypto.randomFillSync(new Uint32Array(length)))
      .map((number) => characters.charAt(number % characters.length))
      .join('');
  } while (usedPasscodes.includes(passcode));
  usedPasscodes.push(passcode); // Store the generated passcode
  return passcode;
};
