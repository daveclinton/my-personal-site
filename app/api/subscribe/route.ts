import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const WELCOME_EMAIL_HTML = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to This Chaos</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

      body {
        font-family: 'Poppins', Arial, sans-serif;
        background-color: #fff0f5;
        color: #4a0e2e;
        line-height: 1.6;
        padding: 20px;
        margin: 0;
      }
      .container {
        background-color: #ffffff;
        max-width: 600px;
        margin: 40px auto;
        padding: 40px;
        border-radius: 20px;
        box-shadow: 0 10px 25px rgba(255, 105, 180, 0.2);
      }
      .header {
        text-align: center;
        margin-bottom: 30px;
      }
      h1 {
        color: #ff1493;
        font-size: 32px;
        margin-bottom: 20px;
      }
      p {
        font-size: 16px;
        margin-bottom: 20px;
      }
      .signature {
        font-style: italic;
        font-size: 18px;
        text-align: right;
        margin-top: 40px;
        color: #ff1493;
      }
      .ps {
        font-size: 14px;
        color: #ff69b4;
        border-top: 1px solid #ffc0cb;
        padding-top: 20px;
        margin-top: 30px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Oh, you actually signed up?</h1>
      </div>
      <p>Well, color me surprised. Welcome to the club. You're now on my list, and there's no turning back now.</p>
      <p>In case you're wondering what you've just walked into: it's not all chaos and confusion here. I'm going to be sharing tips, tricks, and downright genius-level advice (well, most of the time) on mobile development. Stuff like React Native, Expo, WebGL, Three Fiber, and a bit of Next.js, React, and Rust—yeah, all that geeky, technical nonsense. But don't worry, I'll keep it interesting enough that you won't pass out from boredom.</p>
      <p>Stick around, who knows, you might actually learn something... or at least get a few laughs out of my ramblings. Either way, it's too late now. Welcome aboard, pal.</p>
      <div class="signature">
        Cheers to poor decisions,<br>
        <strong>David Clinton</strong>
      </div>
      <p class="ps">P.S. Don't bother trying to unsubscribe. You're stuck with me now. 😏</p>
    </div>
  </body>
</html>`;

async function findOrCreateSubscriber(email: string): Promise<{
  id: string;
  email: string;
  createdAt: Date;
  isNewSubscriber: boolean;
}> {
  const subscriber = await prisma.subscriber.findUnique({ where: { email } });

  if (subscriber) {
    return { ...subscriber, isNewSubscriber: false };
  }

  const newSubscriber = await prisma.subscriber.create({ data: { email } });
  return { ...newSubscriber, isNewSubscriber: true };
}

async function sendWelcomeEmail(email: string) {
  await resend.emails.send({
    from: "David Clinton <portfolio@daveclintonn.cc>",
    to: email,
    subject: "Well, You Signed Up, Didn't You? Welcome to the Wild Side",
    html: WELCOME_EMAIL_HTML,
  });
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email Required" },
        { status: 400 }
      );
    }

    const { isNewSubscriber } = await findOrCreateSubscriber(email);

    if (!isNewSubscriber) {
      return NextResponse.json(
        {
          success: false,
          message: "You are already subscribed.",
        },
        { status: 409 }
      );
    }

    await sendWelcomeEmail(email);

    return NextResponse.json(
      {
        success: true,
        message: "Subscription successful. Welcome email sent!",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Subscription error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred, please try again.",
      },
      { status: 500 }
    );
  }
}
