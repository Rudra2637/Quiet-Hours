import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
});

export async function sendReminder(to: string, blockTitle: string, startTime: Date) {
  const formatted = startTime.toLocaleString();

  await transporter.sendMail({
    from: `"Quiet Hours" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Quiet Hours Reminder",
    text: `Your quiet hours session "${blockTitle}" starts at ${formatted}.`,
  });
}
