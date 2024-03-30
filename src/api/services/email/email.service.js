import nodemailer from "nodemailer";
import CONFIG from "../../../config/default.js"
export const sendToMail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: CONFIG.EMAIL_HOST,
    port: 587,
    auth: {
      user: CONFIG.EMAIL_USER,
      pass: CONFIG.EMAIL_PASS,
      // apiKey: process.env.EMAIL_APIKEY,
    },
    tls: { rejectUnauthorized: false },
  });

  const mailOptions = {
    from: process.env.EMAIL_SENDER,
    to: options.email,
    subject: options.subject,
    html: options.message,
  };
  await transporter.sendMail(mailOptions);
  return;
};
