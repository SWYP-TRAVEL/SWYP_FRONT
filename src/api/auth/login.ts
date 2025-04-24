// export async function login({ username, password }: { username: string; password: string }) {
//     const res = await fetch('/api/login', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       credentials: 'include', // ✅ 쿠키 포함 요청
//       body: JSON.stringify({ username, password }),
//     })  
//     if (!res.ok) throw new Error('로그인 실패')
//     return res.json()
// }
  

// 임시 하드코딩 검사 
import { signJWT } from "@/lib/jwt";

export async function login({ username, password }: { username: string; password: string }) {
    if (username === 'admin' && password === '1234') {
      const token = signJWT({ username }) // jwt 서명
      return { token }
    }
  
    throw new Error('아이디 또는 비밀번호가 잘못되었습니다.')
  }