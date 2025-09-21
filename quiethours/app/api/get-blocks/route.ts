import dbConnect from "@/lib/dbConnect";
import Block from "@/models/block";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server"; // adjust path based on folder structure

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const blocks = await Block.find({ userId: user.id }).sort({ startTime: 1 });

    return NextResponse.json(blocks, { status: 200 });
  } catch (error) {
    console.error("Error fetching blocks: ", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
