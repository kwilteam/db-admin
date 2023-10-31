import { cookies } from "next/headers"
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies"
import jwt from "jsonwebtoken"
import * as jose from "jose"
import nodemailer from "nodemailer"

export interface IAccountJwt {
  id: number
  type: "eth" | "email"
  address: string
}

export interface IRefreshJwt {
  id: number
}

// TODO: Load this from env vars and throw error if not set
const jwtSecret = process.env.JWT_SECRET ?? "JWT_SECRET Must be set."

export const setCookie = (name: string, value: string, options = {}) => {
  cookies().set({
    name,
    value,
    httpOnly: true,
    path: "/",
    sameSite: "strict",
  })
}

export const getCookie = (name: string): RequestCookie | undefined => {
  return cookies().get(name)
}

export const createJwt = <T extends string | object | Buffer>(
  payload: T,
  expiresIn: "5m" | "1hr" | "30 days",
) => {
  return jwt.sign(payload, jwtSecret, { expiresIn })
}

export const verifyJwt = <T>(token: RequestCookie) => {
  return jwt.verify(token.value, jwtSecret) as T
}

// TODO: Send the code to the email address / load credentials from env vars
export const sendAccessCode = async (
  emailAddress: string,
  accessCode: number,
): Promise<boolean> => {
  return true

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST ?? "smtp.gmail.com",
      port: process.env.EMAIL_PORT ? Number(process.env.EMAIL_PORT) : undefined,
      secure: process.env.EMAIL_SECURE === "true", // Convert string to boolean
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    })

    const mailOptions = {
      from: process.env.EMAIL_FROM ?? "admin@kwil.com",
      to: emailAddress,
      subject: "Access Code",
      text: `Your access code is ${accessCode}`,
    }

    await transporter.sendMail(mailOptions)
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}
