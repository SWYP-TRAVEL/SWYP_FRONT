export async function login({ username, password }: { username: string; password: string }) {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // ✅ 쿠키 포함 요청
      body: JSON.stringify({ username, password }),
    })  
    console.log(res);
    if (!res.ok) throw new Error('로그인 실패')
    return res.json()
}
  

