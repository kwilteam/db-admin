import nodemailer from "nodemailer"

export const sendAccessCode = async (
  emailAddress: string,
  accessCode: number,
): Promise<boolean> => {
  try {
    if (process.env.APP_ENV === "test") {
      return true // For testing login
    }

    const host = process.env.EMAIL_HOST
    const port = process.env.EMAIL_PORT
    const secure = process.env.EMAIL_SECURE
    const user = process.env.EMAIL_USER
    const password = process.env.EMAIL_PASSWORD

    if (!host?.length || !port?.length || !user?.length || !password?.length) {
      return false
    }

    console.log("sendAccessCode", host, port, secure, user, password)

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
