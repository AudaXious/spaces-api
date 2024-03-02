import bcrypt from "bcrypt";
import { sendToMail } from "../services/email/email.service.js";

export const comparePassword = async (password, userPassword) => {
  const bool = await bcrypt.compare(password, userPassword);
  return bool;
};

export const hashPassword = async function (password) {
  const newPassword = await bcrypt.hash(password, 12);
  return newPassword;
};

export const generateOTP = () => {
  const code = Math.floor(100000 + Math.random() * 900000); // 6-digit code
  return code.toString();
};

export const generateAndSendOTP = async ({ email, otp, flag }) => {
  let body = {
    subject: "Verify your account",
    message: `<h4>Hello. Please use this 6-digits code verify your account: ${otp} </h4>`,
  };

  if (flag === "reset") {
    body = {
      subject: "Reset your password",
      message: `<h4>Hello. Please use this 6-digits code to reset your password: ${otp} </h4>`,
    };
  }
  await sendToMail({
    email: email,
    subject: body.subject,
    message: body.message,
  });
  return otp;
};
