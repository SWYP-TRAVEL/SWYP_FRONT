import { NextResponse } from 'next/server'
import { signJWT } from '@/lib/jwt'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'; // ✅ 동적 렌더링으로 강제 설정

export async function POST(req: Request) {
  const { username, password } = await req.json()

  if (username === 'admin' && password === '1234') {
    const token = signJWT({ username })

    ;(await cookies()).set({
      name: 'token',
      value: token,
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60, // 1시간
    })

    return NextResponse.json({ success: true })
  }

  return NextResponse.json({ success: false }, { status: 401 })
}
