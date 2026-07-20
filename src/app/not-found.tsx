import Link from "next/link";
import { Compass, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "calc(100vh - 200px)",
        display: "grid",
        placeItems: "center",
        textAlign: "center",
        padding: "2rem 1.5rem",
      }}
    >
      <div>
        <div
          style={{
            width: 84,
            height: 84,
            margin: "0 auto 1.4rem",
            borderRadius: "999px",
            display: "grid",
            placeItems: "center",
            background: "conic-gradient(from 220deg, var(--wf-brass), var(--wf-coral), var(--wf-teal), var(--wf-brass))",
            color: "var(--wf-ink)",
          }}
        >
          <Compass size={36} strokeWidth={2} />
        </div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 600,
          }}
        >
          Lost your way?
        </h1>
        <p style={{ opacity: 0.65, marginTop: "0.6rem", maxWidth: "40ch", marginInline: "auto" }}>
          This page wandered off the map. Let&apos;s get you back to somewhere familiar.
        </p>
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            marginTop: "1.8rem",
            padding: "0.8rem 1.5rem",
            borderRadius: 999,
            background: "linear-gradient(135deg,var(--wf-brass),var(--wf-coral))",
            color: "var(--wf-ink)",
            fontWeight: 700,
          }}
        >
          <Home size={16} /> Return Home
        </Link>
      </div>
    </div>
  );
}
