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
        from: "David Clinton <portfolio@daveclintonn.cc>",
        to: email,
        subject:
          "Welcome to the Elite Club of Shitposters (aka, My Newsletter)",
        html: `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Welcome to the Elite Club of Procrastinators (aka, My Newsletter)</title>
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
                        .profile-pic {
                            width: 100px;
                            height: 100px;
                            border-radius: 50%;
                            margin-bottom: 15px;
                        }
                        h1 {
                            color: #ff1493;
                            font-size: 32px;
                            margin-bottom: 20px;
                            position: relative;
                        }
                        h1::after {
                            content: '';
                            display: block;
                            width: 60px;
                            height: 4px;
                            background-color: #ff69b4;
                            margin: 20px auto 0;
                            border-radius: 2px;
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
                        .emoji {
                            font-size: 24px;
                            vertical-align: middle;
                        }
                        .highlight {
                            background-color: #ffc0cb;
                            padding: 2px 4px;
                            border-radius: 4px;
                        }
                        ul {
                            background-color: #fff0f5;
                            border-left: 4px solid #ff69b4;
                            padding: 20px 20px 20px 40px;
                            border-radius: 0 10px 10px 0;
                        }
                        li {
                            margin-bottom: 10px;
                        }
                        li strong {
                            color: #ff1493;
                        }
                        .button {
                            display: inline-block;
                            background-color: #ff69b4;
                            color: #ffffff;
                            text-decoration: none;
                            padding: 12px 24px;
                            border-radius: 30px;
                            font-weight: 600;
                            text-align: center;
                            transition: background-color 0.3s ease;
                        }
                        .button:hover {
                            background-color: #ff1493;
                        }
                        @keyframes fadeIn {
                            from { opacity: 0; transform: translateY(20px); }
                            to { opacity: 1; transform: translateY(0); }
                        }
                        .fade-in {
                            animation: fadeIn 0.5s ease-out forwards;
                            opacity: 0;
                        }
                        .delay-1 { animation-delay: 0.2s; }
                        .delay-2 { animation-delay: 0.4s; }
                        .delay-3 { animation-delay: 0.6s; }
                        .pink-border {
                            border: 2px dashed #ff69b4;
                            border-radius: 15px;
                            padding: 20px;
                            margin-bottom: 20px;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                           <h1 class="fade-in">Hey there, Legend! <span class="emoji">🎉</span></h1>
                        </div>

                        <div class="pink-border fade-in delay-1">
                            <p>Congrats! You've officially joined the <span class="highlight">procrastination station</span>—where our inboxes are as full as our hearts are pink and hopeful. <span class="emoji">📨💖</span></p>
                        </div>

                        <p class="fade-in delay-1">Let's be honest, you're probably reading this to avoid doing something else more important (don't worry, we won't tell). But buckle up, because this newsletter will be the most exciting thing you've ignored since that pile of laundry from last week.</p>

                        <p class="fade-in delay-2">Here's what you can expect from our pink-tinted world:</p>
                        <ul class="fade-in delay-2">
                            <li><strong>Rosy Content</strong> (we promise it won't make you blush... much).</li>
                            <li><strong>Occasional Bursts of Brilliance</strong> (sprinkled with nonsense, but it's charmingly pink).</li>
                            <li><strong>Procrastination Tips</strong> (like reading this email instead of painting the town red... or pink).</li>
                        </ul>

                        <p class="fade-in delay-3">So, sit back, grab a pink lemonade (or three), and let the good times scroll! <span class="emoji">😎💕</span></p>

                        <p class="fade-in delay-3" style="text-align: center; margin-top: 30px;">
                            <a href="https://daveclintonn.cc/" class="button">Embrace the Pink Procrastination</a>
                        </p>

                        <div class="signature fade-in delay-3">
                            Painting your inbox pink,<br>
                            <strong>David Clinton</strong>
                        </div>

                        <p class="ps fade-in delay-3">P.S. You're now officially pinker than your non-subscribing friends. Just saying. <span class="emoji">😏🎀</span></p>
                    </div>
                </body>
            </html>
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
