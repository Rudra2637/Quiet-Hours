import dbConnect from "@/lib/dbConnect";
import block from "@/models/block";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server"; // adjust path if needed

export async function POST(request: Request) {
  await dbConnect();

  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, start_time, end_time } = await request.json();
    console.log("Received data: ", { title, start_time, end_time });

    const blockCreate = await block.create({
      userId: user.id, 
      title,
      startTime: start_time,
      endTime: end_time,
      reminderSent: false,   // ensure default at creation
    });

    return NextResponse.json(blockCreate, { status: 201 });
  } catch (error) {
    console.error("Error creating block: ", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
