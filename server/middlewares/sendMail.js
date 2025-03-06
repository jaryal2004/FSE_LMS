import { createTransport } from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const sendMail = async (email, subject, data) => {
  try {
    // ✅ Log to check if function is being called
    console.log("📧 Sending email to:", email);
    console.log("📜 Subject:", subject);
    console.log("🔢 OTP Data:", data.otp);

    // ✅ Check if environment variables exist
    if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
      console.error("❌ Missing Gmail credentials in .env file");
      return;
    }

    // ✅ Configure Transport
    const transport = createTransport({
      host: "smtp.gmail.com",
      port: 465, // Change to 465 if needed
      secure: true, // False for TLS, True for SSL
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false, // Prevent self-signed certificate issues
      },
    });

    // ✅ Email Template
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>OTP Verification</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                background-color: #f3f3f3;
            }
            .container {
                background-color: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                text-align: center;
            }
            h1 {
                color: red;
            }
            p {
                margin-bottom: 20px;
                color: #666;
            }
            .otp {
                font-size: 36px;
                font-weight: bold;
                color: #7b68ee;
                margin-bottom: 30px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>OTP Verification</h1>
            <p>Hello <strong>${data.name}</strong>, your One-Time Password (OTP) for verification is:</p>
            <p class="otp">${data.otp}</p>
            <p>This OTP is valid for 5 minutes.</p>
        </div>
    </body>
    </html>`;

    // ✅ Send the Email
    const info = await transport.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject,
      html,
    });

    console.log("✅ Email sent successfully:", info.response);
  } catch (error) {
    console.error("❌ Error sending email:", error.message);
  }
};

export default sendMail;

export const sendForgotMail = async (subject, data) => { 
  // Forgot password email logic 
};
