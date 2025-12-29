import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  trustedOrigins: ["http://localhost:3000"],
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "USER",
        required: false,
      },
      phone: {
        type: "string",
        required: false,
      },
      status: {
        type: "string",
        defaultValue: "ACTIVE",
        required: false,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      try {
        // Send an email using async/await

        const VERIFICATION_LINK = url;
        const info = await transporter.sendMail({
          from: `"Jubayer" <${process.env.SMTP_USER}>`,
          to: user.email,
          subject: "Please verify your mail",
          html: `
                <html>
                <head>
                    <meta charset="UTF-8">
                    <title>Email Verification</title>
                    <style>
                    body { font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 0; padding: 0; }
                    .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.1); }
                    .button { display: inline-block; padding: 12px 20px; margin-top: 20px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 4px; }
                    </style>
                </head>
                <body>
                    <div class="container">
                    <h2>Email Verification</h2>
                    <p>Hi ${user.name},</p>
                    <p>Thank you for signing up. Please verify your email by clicking the button below:</p>
                    <a href="${VERIFICATION_LINK}" class="button">Verify Email</a>
                    <p>If you did not sign up, you can ignore this email.</p>
                    <p>Regards,<br>Jubayer</p>
                    </div>
                </body>
                </html>
                `, // HTML version of the message
        });

        console.log("Message sent:", info.messageId);
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  },
});
