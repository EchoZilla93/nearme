import { NextResponse } from 'next/server';

import connect from '@/db';
import Pin from '@/models/Pins';

export const GET = async () => {
  try {
    await connect();
    const pins = await Pin.find();
    return new NextResponse(
      JSON.stringify({
        status: 'success',
        pins,
        items: pins.length,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(`Error fetching pins: ${error}`, { status: 500 });
  }
};
