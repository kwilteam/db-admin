import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies"
import * as jose from "jose"
import { EnumAccountType } from "./schema"

export interface IAccountJwt {
  id: number
  type: EnumAccountType
  address: string
  name: string
  /** Any other JWT Claim Set member. */
  [propName: string]: unknown
}

export interface IRefreshJwt {
  id: number
  /** Any other JWT Claim Set member. */
  [propName: string]: unknown
}

export const createJwt = async <T extends jose.JWTPayload>(
  payload: T,
  expiresIn: "15m" | "1hr" | "30 days",
): Promise<string> => {
  const secret = getJwtSecret()
  const alg = "HS256"

  const jwt = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setIssuer("urn:example:issuer")
    .setAudience("urn:example:audience")
    .setExpirationTime(expiresIn)
    .sign(secret)

  return jwt
}

export const verifyJwt = async <T>(token: RequestCookie) => {
  try {
    const jwtSecret = getJwtSecret()
    const { payload } = await jose.jwtVerify(token.value, jwtSecret)
    return payload as T
  } catch (e) {
    console.error(e)
    return undefined
  }
}

export const getJwtSecret = () => {
  // TODO: Load this from env vars and throw error if not set
  const jwtSecret = process.env.JWT_SECRET ?? "JWT_SECRET Must be set."
  return new TextEncoder().encode(jwtSecret)
}

export const generateAccessCode = (): number => {
  if (process.env.APP_ENV === "test") {
    return 111111 // For testing login
  } else {
    return Math.floor(100000 + Math.random() * 900000)
  }
}
