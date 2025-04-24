import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET || 'dev-secret-key'

export function signJWT(payload: object) {
  return jwt.sign(payload, SECRET, { expiresIn: '1h' })
}

export function verifyJWT(token: string) {
  try {
    return jwt.verify(token, SECRET)
  } catch {
    return null
  }
}
