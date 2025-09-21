import { NextResponse } from "next/server";
import { runReminders } from "@/lib/reminder";

export async function GET() {
  try {
    const result = await runReminders();
    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    console.error("Cron error:", error);
    return NextResponse.json({ success: false, error: "Cron failed" }, { status: 500 });
  }
}
