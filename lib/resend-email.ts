/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { Resend } from "resend";
import { z } from "zod";

const ContactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(5000),
});

const resend = new Resend(process.env.RESEND_API_KEY);

type EmailResponse = {
  success: boolean;
  message: string;
  error?: string;
};

export async function sendEmail(formData: FormData): Promise<EmailResponse> {
  const rawFormData = {
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  };

  try {
    const validatedData = ContactFormSchema.parse(rawFormData);

    const sanitizedData = {
      name: validatedData.name.trim(),
      email: validatedData.email.toLowerCase().trim(),
      message: validatedData.message.trim(),
    };

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2>New Contact Form Submission</h2>
            <p><strong>From:</strong> ${sanitizedData.name}</p>
            <p><strong>Email:</strong> ${sanitizedData.email}</p>
            <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <h3>Message:</h3>
              <p>${sanitizedData.message.replace(/\n/g, "<br>")}</p>
            </div>
            <p style="color: #666; font-size: 12px;">
              This email was sent from your website's contact form.
            </p>
          </div>
        </body>
      </html>
    `;

    try {
      const data = await resend.emails.send({
        from: `Contact Form <portfolio@daveclintonn.cc>`,
        to: "clintondavid46@gmail.com",
        subject: `New message from ${sanitizedData.name}`,
        html: htmlContent,
        text: `Name: ${sanitizedData.name}\nEmail: ${sanitizedData.email}\nMessage: ${sanitizedData.message}`,
      });

      console.log("Email sent successfully:", data);

      return {
        success: true,
        message:
          "Cheers! Your message has been sent successfully. Time to sit back and wait for the code to compile (or me to respond).",
      };
    } catch (error: any) {
      console.error("Email sending error:", error);

      return {
        success: false,
        message:
          "Oops! Looks like something crashed harder than a buggy deployment. Try again in a bit.",
        error: error?.message || "UNKNOWN_ERROR",
      };
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.errors.map((err) => err.message).join(", ");
      return {
        success: false,
        message:
          "Hmm, seems like the input didn’t pass the linter. Double-check those fields and try again!",
        error: errorMessage,
      };
    }

    console.error("Validation error:", error);
    return {
      success: false,
      message:
        "Whoa, something went off the rails! Let’s call it a 'feature' and try again later.",
      error: "VALIDATION_ERROR",
    };
  }
}
