import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

type ContactPayload = {
  name?: string;
  email?: string;
  company?: string;
  projectType?: string;
  timeline?: string;
  message?: string;
};

const DEFAULT_TEMPLATE_ID = "new-contact-submission";

function buildTemplateVariables(data: {
  name: string;
  email: string;
  company: string;
  projectType: string;
  timeline: string;
  message: string;
}) {
  return {
    CONTACT_NAME: data.name,
    CONTACT_EMAIL: data.email,
    COMPANY: data.company || "—",
    PROJECT_TYPE: data.projectType,
    TIMELINE: data.timeline || "—",
    MESSAGE: data.message,
  };
}

export async function POST(request: Request) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 500 }
    );
  }

  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  const templateId =
    process.env.RESEND_CONTACT_TEMPLATE_ID?.trim() || DEFAULT_TEMPLATE_ID;

  if (!toEmail || !fromEmail) {
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 500 }
    );
  }

  let body: ContactPayload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const projectType = body.projectType?.trim();
  const message = body.message?.trim();
  const company = body.company?.trim() ?? "";
  const timeline = body.timeline?.trim() ?? "";

  if (!name || !email || !projectType || !message) {
    return NextResponse.json(
      { error: "Please fill in all required fields." },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: fromEmail,
    to: toEmail,
    replyTo: email,
    subject: `New project inquiry from ${name}`,
    template: {
      id: templateId,
      variables: buildTemplateVariables({
        name,
        email,
        company,
        projectType,
        timeline,
        message,
      }),
    },
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json(
      { error: "Failed to send your message. Please try again later." },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true });
}
