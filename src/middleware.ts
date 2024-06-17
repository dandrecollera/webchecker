import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Retrieve the user token from cookies
  const userToken = request.cookies.get('your-key')?.value;

  // // If the user token does not exist, redirect to the login page
  if (!userToken) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If the user token exists, redirect to the home page
  return NextResponse.redirect(new URL('/login', request.url));
}

export const config = {
  // Apply this middleware to the specified route
  matcher: '/test',
}
