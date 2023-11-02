import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies"
import * as jose from "jose"

export interface IAccountJwt {
  id: number
  type: "eth" | "email"
  address: string
  name: string
}

export interface IRefreshJwt {
  id: number
}

export const createJwt = async <T extends object>(
  payload: T,
  expiresIn: "15m" | "1hr" | "30 days",
): Promise<string> => {
  const secret = getJwtSecret()
  const alg = "HS256"

  const jwt = await new jose.SignJWT(payload as jose.JWTPayload)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setIssuer("urn:example:issuer")
    .setAudience("urn:example:audience")
    .setExpirationTime(expiresIn)
    .sign(secret)

  return jwt
}

export const verifyJwt = async <T>(token: RequestCookie) => {
  const jwtSecret = getJwtSecret()
  const { payload } = await jose.jwtVerify(token.value, jwtSecret)
  return payload as T
}

export const getJwtSecret = () => {
  // TODO: Load this from env vars and throw error if not set
  const jwtSecret = process.env.JWT_SECRET ?? "JWT_SECRET Must be set."
  return new TextEncoder().encode(jwtSecret)
}
