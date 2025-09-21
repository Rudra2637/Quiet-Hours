import dbConnect from "@/lib/dbConnect";
import block from "@/models/block";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await dbConnect();
  const blocks = await block.find({ userId: user.id }).sort({ startTime: 1 });
  return NextResponse.json(blocks);
}