import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import styles from "./trips.module.css";
import TripsGrid from "./TripsGrid";
import { trips } from "@/data/trips";

export const metadata: Metadata = {
  title: "My Trips",
  description: "Every trip you've planned with Wayfarly, in one place.",
};

export default function TripsPage() {
  return (
    <div>
      <div className={styles["wayfarly-trips-header"]}>
        <h1 className={styles["wayfarly-trips-heading"]}>My Trips</h1>
        <Link
          href="/trips/create"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "0.65rem 1.1rem",
            borderRadius: 999,
            background: "linear-gradient(135deg,var(--wf-brass),var(--wf-coral))",
            color: "var(--wf-ink)",
            fontWeight: 700,
            fontSize: "0.86rem",
          }}
        >
          <Plus size={16} /> New Trip
        </Link>
      </div>
      <TripsGrid trips={trips} />
    </div>
  );
}
