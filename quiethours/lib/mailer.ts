import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // your Gmail
        pass: process.env.EMAIL_PASS, // your App Password
      },
});

export async function sendReminder(to: string, blockTitle: string, startTime: Date) {
  const formatted = startTime.toLocaleString();

  await transporter.sendMail({
    from: "Quiet Hours",
    to,
    subject: "Quiet Hours Reminder",
    text: `Your quiet hours session "${blockTitle}" starts at ${formatted}.`,
  });
}
