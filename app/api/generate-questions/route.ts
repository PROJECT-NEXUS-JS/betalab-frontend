import { generateQualifierQuestions } from "@/lib/gemini";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { conditions } = await req.json();
  try {
    const questions = await generateQualifierQuestions(conditions);
    return NextResponse.json({ questions });
  } catch (error) {
    return NextResponse.json({ questions: [conditions] }, { status: 500 });
  }
}