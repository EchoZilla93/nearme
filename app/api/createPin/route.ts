import connect from '@/db';
import Pin from '@/models/Pins';
import { NextResponse, NextRequest } from 'next/server';

export const POST = async (req: NextRequest) => {
  try {
    await connect();
    let passedValue = await new Response(req.body).text();
    let reqBody = JSON.parse(passedValue);
    const pin = await Pin.create(reqBody);
    return new NextResponse(
      JSON.stringify({
        status: 'success',
        pin,
      }),
      { status: 200 }
    );
  } catch (error) {
    if (error.name === 'ValidationError') {
      const missingFields = Object.keys(error.errors); // Get missing fields
      const errorMessage = `Missing required fields: ${missingFields.join(
        ', '
      )}`;
      return new NextResponse(errorMessage, { status: 400 }); // Bad request
    } else {
      return new NextResponse(`Error fetching pins: ${error}`, { status: 500 });
    }
  }
};
