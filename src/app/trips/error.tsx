"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

export default function DashboardError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div style={{ maxWidth: 480, margin: "4rem auto", textAlign: "center", padding: "0 1.5rem" }}>
      <AlertTriangle size={32} color="var(--wf-coral)" style={{ marginBottom: 10 }} />
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 600 }}>
        Something went wrong loading your trips
      </h2>
      <p style={{ opacity: 0.65, marginTop: 8, fontSize: "0.9rem" }}>
        This usually means the database connection dropped. Try again in a moment.
      </p>
      <button
        onClick={reset}
        style={{
          marginTop: 18,
          padding: "0.7rem 1.4rem",
          borderRadius: 999,
          background: "var(--wf-brass)",
          color: "var(--wf-ink)",
          fontWeight: 700,
        }}
      >
        Try again
      </button>
    </div>
  );
}
