import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose'; // Import jwtVerify from 'jose'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value; // Get the token cookie

  console.log('Retrieved token:', token); // Log token to see its value

  // Check if the token is missing or invalid
  if (!token || typeof token !== 'string') {
    console.error('Invalid or missing token');
  // Append a timestamp to force page refresh
  const loginUrl = new URL('/login', request.url);
  loginUrl.searchParams.set('refresh', Date.now().toString() ); // Add a unique query parameter

  return NextResponse.redirect(loginUrl);  }

  try {
    // Use 'jose' to verify the JWT
    const { payload } = await jwtVerify(token, new TextEncoder().encode('secretkey')); // Secret key encoded to Uint8Array

    // You can attach the decoded user info to the request or response here
    request.headers.set('user', JSON.stringify(payload)); // Attach user data to the request headers

    return NextResponse.next(); // Continue if the token is valid
  } catch (error) {
    console.error('Token verification failed:', error);
    return NextResponse.redirect(new URL('/login', request.url)); // Redirect to login if verification fails
  }
}

// Optional: Set a matcher to apply middleware only to specific routes
export const config = {
  matcher: ['/orders','/checkout','/reviews/:id'], // Apply only to specific routes
};
