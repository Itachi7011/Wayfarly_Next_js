"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import Swal from "sweetalert2";
import styles from "./trips.module.css";
import { deleteTrip } from "@/actions/trips";
import type { Trip } from "@/data/trips";

import Image, { type StaticImageData } from "next/image";

import kyotoImage from "./Kyoto.jpg";
import lisbonImage from "./lisbon.jpg";
import elChaltenImage from "./El Chalten.jpg";
import marrakechImage from "./Marrakech.jpg";

const tripImages: Record<string, StaticImageData> = {
  Kyoto: kyotoImage,
  Lisbon: lisbonImage,
  "El Chaltén": elChaltenImage,
  Marrakech: marrakechImage,
};

const filters = ["All", "Upcoming", "Completed", "Cancelled"] as const;

export default function TripsGrid({ trips }: { trips: Trip[] }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");

  const visible = useMemo(() => {
    return trips.filter((t) => {
      const matchesFilter = filter === "All" || t.status === filter;
      const matchesQuery =
        query.trim() === "" ||
        t.title.toLowerCase().includes(query.toLowerCase()) ||
        t.destination.toLowerCase().includes(query.toLowerCase());
      return matchesFilter && matchesQuery;
    });
  }, [trips, query, filter]);

  const handleDelete = async (tripId: string, title: string) => {
    const confirm = await Swal.fire({
      icon: "warning",
      title: `Delete "${title}"?`,
      text: "This can't be undone.",
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "#ff6b4a",
      background: "var(--surface)",
      color: "var(--foreground)",
    });
    if (!confirm.isConfirmed) return;

    const result = await deleteTrip(tripId);
    Swal.fire({
      icon: result.success ? "success" : "info",
      title: result.success ? "Trip deleted" : "Heads up",
      text: result.message,
      confirmButtonColor: "#c9932c",
      background: "var(--surface)",
      color: "var(--foreground)",
    });
  };

  return (
    <>
      <div className={styles["wayfarly-trips-toolbar"]}>
        <div className={styles["wayfarly-trips-search-wrap"]}>
          <Search size={15} className={styles["wayfarly-trips-search-icon"]} />
          <input
            className={styles["wayfarly-trips-search-input"]}
            placeholder="Search trips..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search trips"
          />
        </div>
        <div className={styles["wayfarly-trips-filter-row"]}>
          {filters.map((f) => (
            <button
              key={f}
              className={styles["wayfarly-trips-filter-btn"]}
              data-active={filter === f}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className={styles["wayfarly-trips-grid"]}>
        {visible.map((trip) => {
          const progress = Math.min(
            100,
            Math.round((trip.budgetSpent / trip.budgetTotal) * 100),
          );
          return (
            <div key={trip.id} className={styles["wayfarly-trips-card"]}>
              <Link href={`/trips/${trip.slug}`}>
                <div className={styles["wayfarly-trips-card-cover"]}>
                  <Image
                    src={tripImages[trip.destination]}
                    alt={trip.destination}
                    fill
                    sizes="(max-width: 768px) 100vw, 350px"
                    style={{
                      objectFit: "cover",
                    }}
                  />

                  <span className={styles["wayfarly-trips-card-status"]}>
                    {trip.status}
                  </span>
                </div>
              </Link>
              <div className={styles["wayfarly-trips-card-body"]}>
                <Link href={`/trips/${trip.slug}`}>
                  <div className={styles["wayfarly-trips-card-title"]}>
                    {trip.destination}
                  </div>
                </Link>
                <div className={styles["wayfarly-trips-card-dates"]}>
                  {trip.startDate} → {trip.endDate}
                </div>
                <div className={styles["wayfarly-trips-card-budget-row"]}>
                  <span>
                    {trip.currency}
                    {trip.budgetSpent.toLocaleString()} spent
                  </span>
                  <span style={{ opacity: 0.6 }}>
                    of {trip.currency}
                    {trip.budgetTotal.toLocaleString()}
                  </span>
                </div>
                <div className={styles["wayfarly-trips-progress-track"]}>
                  <div
                    className={styles["wayfarly-trips-progress-fill"]}
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className={styles["wayfarly-trips-card-actions"]}>
                  <Link
                    href={`/trips/${trip.slug}`}
                    className={styles["wayfarly-trips-card-action"]}
                  >
                    View
                  </Link>
                  <Link
                    href={`/trips/${trip.slug}/edit`}
                    className={styles["wayfarly-trips-card-action"]}
                  >
                    Edit
                  </Link>
                  <button
                    className={styles["wayfarly-trips-card-action"]}
                    data-danger="true"
                    onClick={() => handleDelete(trip.id, trip.destination)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {visible.length === 0 && (
          <p style={{ opacity: 0.6, padding: "2rem 0" }}>
            No trips match that search.
          </p>
        )}
      </div>
    </>
  );
}
