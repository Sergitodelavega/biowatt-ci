import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken } from '@/lib/auth/jwt';

export async function GET(req: NextRequest) {
  const token = req.cookies.get('biowatt_session')?.value;

  if (!token) {
    return NextResponse.json({ user: null });
  }

  const user = await verifySessionToken(token);
  return NextResponse.json({ user });
}
