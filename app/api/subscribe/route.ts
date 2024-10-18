import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json({ success: false, message: "Email Required" });
  }

  try {
    let emailSubscriber = await prisma.subscriber.findFirst({
      where: { email },
    });

    if (!emailSubscriber) {
      emailSubscriber = await prisma.subscriber.create({
        data: { email },
      });

      await resend.emails.send({
        from: "David Clinton <email@daveclintonn.cc>",
        to: email,
        subject: "Welcome to Our Newsletter!",
        html: `
          <h1>Welcome to Our Newsletter!</h1>
          <p>Thank you for subscribing to our newsletter. We're excited to share our latest updates with you!</p>
          <p>Best regards,</p>
          <p>David Clinton</p>
        `,
      });

      return NextResponse.json({
        success: true,
        message: "Subscription successful. Welcome email sent!",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "You are already subscribed.",
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "An error occurred, please try again.",
    });
  }
}
