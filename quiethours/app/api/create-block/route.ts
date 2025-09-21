import dbConnect from "@/lib/dbConnect";
import block from "@/models/block";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";


export async function POST(request:Request){
    const supabase = createServerComponentClient({cookies})
    const {data:{user}} = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    console.log("hi from create block")
    const {title,startTime,endTime} = await request.json()

    const blockCreate = await block.create({
        userId:user,
        title,
        startTime,
        endTime
    })
    return NextResponse.json(block, { status: 201 });
}