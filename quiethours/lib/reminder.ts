import dbConnect from "./dbConnect";
import block from "@/models/block";
import { sendReminder } from "./mailer";
import { createClient } from "./supabase/server";

export async function runReminders() {
  await dbConnect();
  const supabase = await createClient();

  const now = new Date();
  const tenMinLater = new Date(now.getTime() + 10 * 60000);


  const blocks = await block.find({
    startTime: { $gte: now, $lte: tenMinLater },
    reminderSent: false,
  });

  for (const b of blocks) {

    const { data: userData } = await supabase.auth.admin.getUserById(b.userId);
    const email = userData?.user?.email;

    if (email) {
      await sendReminder(email, b.title, b.startTime);
      b.reminderSent = true;
      await b.save();
      console.log(`✅ Reminder sent to ${email} for block "${b.title}"`);
    }
  }

  return { count: blocks.length };
}
