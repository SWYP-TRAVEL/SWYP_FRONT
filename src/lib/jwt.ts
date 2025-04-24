import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET || 'dev-secret-key'

export function signJWT(payload: object) {
  console.log(payload, SECRET)
  let test = jwt.sign(payload, SECRET, { expiresIn: '1h' })
  console.log(test);
  return test;
}

export function verifyJWT(token: string) {
  try {
    return jwt.verify(token, SECRET)
  } catch {
    return null
  }
}
