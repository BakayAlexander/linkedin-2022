import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const { pathname, origin } = req.nextUrl;
  if (pathname === '/') {
    const token = await getToken({
      req: req,
      secret: process.env.NEXTAUTH_SECRET,
      raw: true,
      secureCookie: process.env.NODE_ENV === 'production',
    });
    if (!token) return NextResponse.redirect(`${origin}/home`);
  }
}
