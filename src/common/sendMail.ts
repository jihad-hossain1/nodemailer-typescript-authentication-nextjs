import User from "@/models/user.model";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";

export const sendEmail = async ({ email, emailType, userId }: {email: string, emailType: string, userId: string}) => {
  try {
    const tokenEncryption = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: tokenEncryption,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotePsswordToken: tokenEncryption,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    console.log(process.env.MAIL_USER!, process.env.MAIL_PASS!, process.env.MAIL_HOST!, process.env.MAIL_PORT!);

    var mailTransport = nodemailer.createTransport({
      host: process.env.MAIL_HOST! as string,
      port: Number(process.env.MAIL_PORT!),
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS!,
      },
    });

    const mailOptions = {
      from: "lovedose4166@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${tokenEncryption}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }
            or copy and paste the link below in your browser. <br> ${
              process.env.DOMAIN
            }/verifyemail?token=${tokenEncryption}
            </p>`,
    };

    const mailresponse = await mailTransport.sendMail(mailOptions);
    return mailresponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};


const transporter = nodemailer.createTransport({
  host:'smtp.gmail.com',
  port:587,
  secure:false,
  auth: {
    user: 'jihadkhan4191@gmail.com',
    pass: 'bjpd sshs bsdq svvd'
  },
});

export async function sendEmails(to: string, subject: string, html: string) {
  try {
    const mailOptions = {
      from: 'jihadkhan4191@gmail.com',
      to: to,
      subject: subject,
      html: html
    };
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ', to);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email: ', error);
    return { success: false, error: (error as Error).message };
  }
}