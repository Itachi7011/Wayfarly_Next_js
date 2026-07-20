"use server";

import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactResult = { success: boolean; message: string };

export async function submitContactForm(formData: FormData): Promise<ContactResult> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  };

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  // NOTE: this scaffold validates and logs the message but doesn't send an email —
  // wire up a provider like Resend, Postmark, or SES here (or write to a Mongo
  // "Message" collection) before relying on this in production.
  console.log("New contact form submission:", parsed.data);

  return { success: true, message: "Thanks — we'll get back to you within a couple of days." };
}
