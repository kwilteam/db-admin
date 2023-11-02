import nodemailer from "nodemailer"

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
