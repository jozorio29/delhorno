import { connectToDB } from "@/lib/db";
import { ContactMessage } from "@/models/ContactMessage";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, phone, message, company } = await req.json();

    // Honeypot: si 'company' viene con algo, descartamos (probable bot)
    if (company) {
      // Bot detectado → ignorar y devolver "todo bien"
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    if (!name?.trim() || !phone?.trim() || !message?.trim()) {
      return NextResponse.json(
        { ok: false, message: "Por favor, completa todos los campos." },
        { status: 400 }
      );
    }

    await connectToDB();

    const doc = await ContactMessage.create({
      name,
      phone,
      message,
    });

    if (
      process.env.TWILIO_ACCOUNT_SID &&
      process.env.TWILIO_AUTH_TOKEN &&
      process.env.TWILIO_WHATSAPP_FROM &&
      process.env.TWILIO_WHATSAPP_TO
    ) {
      try {
        const body = `📩 Nuevo mensaje de la web\n\n👤 ${name}\n📞 ${phone}\n\n📝 ${message}`;
        const basicAuth = Buffer.from(
          `${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`
        ).toString("base64");

        await fetch(
          `https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Messages.json`,
          {
            method: "POST",
            headers: {
              Authorization: `Basic ${basicAuth}`,
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              To: process.env.TWILIO_WHATSAPP_TO,
              From: process.env.TWILIO_WHATSAPP_FROM,
              Body: body,
            }),
          }
        );
      } catch {}
    }

    return NextResponse.json({ ok: true, id: doc._id }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Error al enviar el mensaje." },
      { status: 500 }
    );
  }
}
