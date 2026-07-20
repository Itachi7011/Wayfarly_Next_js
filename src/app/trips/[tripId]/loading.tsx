export default function TripDetailLoading() {
  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "2rem 1.5rem" }}>
      <div style={{ height: 260, borderRadius: 20, background: "var(--surface-dim)", animation: "wf-pulse 1.4s ease-in-out infinite" }} />
      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: "1.6rem", marginTop: "1.6rem" }}>
        <div style={{ height: 320, borderRadius: 20, background: "var(--surface-dim)", animation: "wf-pulse 1.4s ease-in-out infinite" }} />
        <div style={{ height: 320, borderRadius: 20, background: "var(--surface-dim)", animation: "wf-pulse 1.4s ease-in-out infinite" }} />
      </div>
      <style>{`@keyframes wf-pulse { 0%,100% { opacity: 0.6 } 50% { opacity: 1 } }`}</style>
    </div>
  );
}
