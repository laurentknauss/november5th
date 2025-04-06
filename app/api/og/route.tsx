// app/api/og/route.tsx
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Get the path to your static image file
    const imagePath = path.join(process.cwd(), 'app', 'opengraph-image.png');

    // Read the image file
    const imageBuffer = fs.readFileSync(imagePath);

    // Create a response with the image buffer
    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=86400', // 24-hour cache
      },
    });
  } catch (error) {
    console.error('Error serving OG image:', error);
    return new NextResponse('Not found', { status: 404 });
  }
}