import { cookies } from 'next/headers';
import { verifyJWT } from '@/lib/jwt';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const cookieStore = cookies(); // ✅ 타입 생략 가능

  // @ts-ignore
  const token = cookieStore.get('token')?.value;

  if (!token) return NextResponse.json({ user: null });

  const decoded = verifyJWT(token);

  if (!decoded) return NextResponse.json({ user: null });

  return NextResponse.json({ user: decoded });
}
``