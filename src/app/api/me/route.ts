import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {

  const mockUser = {
    id: '12345',
    nickname: '테스트유저',
    email: 'test@example.com',
    profileImage: '/images/default-profile.png',
    createdAt: new Date().toISOString()
  };

  return NextResponse.json({ user: mockUser });
}
