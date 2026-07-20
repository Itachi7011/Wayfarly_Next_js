"use client";

import { useState, useTransition } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { submitContactForm } from "@/actions/contact";
import styles from "../info.module.css";

export default function ContactForm() {
  const [status, setStatus] = useState<{ success: boolean; message: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      const result = await submitContactForm(formData);
      setStatus(result);
    });
  };

  if (status?.success) {
    return (
      <div className={styles["wayfarly-info-card"]} style={{ textAlign: "center", padding: "2rem" }}>
        <CheckCircle2 size={28} color="var(--wf-teal)" style={{ marginBottom: 10 }} />
        <p style={{ fontWeight: 700 }}>Message sent</p>
        <p style={{ opacity: 0.65, fontSize: "0.88rem", marginTop: 4 }}>{status.message}</p>
      </div>
    );
  }

  return (
    <form action={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div>
        <label htmlFor="name" style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, marginBottom: 6, opacity: 0.75 }}>
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          placeholder="Ada Lovelace"
          style={{
            width: "100%",
            padding: "0.7rem 0.9rem",
            borderRadius: 12,
            border: "1px solid var(--border-color)",
            background: "var(--surface-dim)",
            color: "var(--foreground)",
            fontSize: "0.9rem",
          }}
        />
      </div>
      <div>
        <label htmlFor="email" style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, marginBottom: 6, opacity: 0.75 }}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="you@email.com"
          style={{
            width: "100%",
            padding: "0.7rem 0.9rem",
            borderRadius: 12,
            border: "1px solid var(--border-color)",
            background: "var(--surface-dim)",
            color: "var(--foreground)",
            fontSize: "0.9rem",
          }}
        />
      </div>
      <div>
        <label htmlFor="message" style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, marginBottom: 6, opacity: 0.75 }}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="What's on your mind?"
          style={{
            width: "100%",
            padding: "0.7rem 0.9rem",
            borderRadius: 12,
            border: "1px solid var(--border-color)",
            background: "var(--surface-dim)",
            color: "var(--foreground)",
            fontSize: "0.9rem",
            resize: "vertical",
            fontFamily: "inherit",
          }}
        />
      </div>

      {status && !status.success && (
        <p style={{ fontSize: "0.8rem", color: "var(--wf-coral)" }}>{status.message}</p>
      )}

      <button type="submit" disabled={isPending} className={styles["wayfarly-info-cta-btn"]} style={{ marginTop: 0, justifyContent: "center" }}>
        <Send size={15} /> {isPending ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
