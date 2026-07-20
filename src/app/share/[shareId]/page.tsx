import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarRange, Wallet, ListChecks, Compass, ArrowRight } from "lucide-react";
import styles from "./share.module.css";
import { trips } from "@/data/trips";
import { connectToDatabase } from "@/lib/db";
import TripModel from "@/models/Trip";
import ItineraryModel from "@/models/Itinerary";
import ChecklistModel from "@/models/Checklist";

type Props = { params: Promise<{ shareId: string }> };

type ShareView = {
  title: string;
  destination: string;
  description: string;
  startDate: string;
  endDate: string;
  budgetTotal: number;
  budgetSpent: number;
  currency: string;
  cover: string; // CSS background value — gradient or url()
  itinerary: { day: number; activities: { id: string; time: string; title: string }[] }[];
  checklist: { id: string; text: string; completed: boolean }[];
};

async function getShareView(shareId: string): Promise<ShareView | null> {
  // Demo path: seed trips are "shared" via their slug so the feature works with zero setup.
  const seedTrip = trips.find((t) => t.slug === shareId && t.isPublic);
  if (seedTrip) {
    return {
      title: seedTrip.title,
      destination: `${seedTrip.destination}, ${seedTrip.country}`,
      description: seedTrip.description,
      startDate: seedTrip.startDate,
      endDate: seedTrip.endDate,
      budgetTotal: seedTrip.budgetTotal,
      budgetSpent: seedTrip.budgetSpent,
      currency: seedTrip.currency,
      cover: seedTrip.coverColor,
      itinerary: seedTrip.itinerary.map((d) => ({
        day: d.day,
        activities: d.activities.map((a) => ({ id: a.id, time: a.time, title: a.title })),
      })),
      checklist: seedTrip.checklist,
    };
  }

  // Real path: once MongoDB is connected, real trips shared via SharePanel resolve here.
  try {
    await connectToDatabase();
    const trip = await TripModel.findOne({ shareId, isPublic: true });
    if (!trip) return null;

    const [itineraryDays, checklist] = await Promise.all([
      ItineraryModel.find({ tripId: trip._id }).sort({ dayNumber: 1 }),
      ChecklistModel.findOne({ tripId: trip._id }),
    ]);

    return {
      title: trip.title,
      destination: trip.destination,
      description: trip.description ?? "",
      startDate: new Date(trip.startDate).toISOString().slice(0, 10),
      endDate: new Date(trip.endDate).toISOString().slice(0, 10),
      budgetTotal: trip.budget,
      budgetSpent: 0,
      currency: trip.currency === "INR" ? "₹" : trip.currency,
      cover: trip.coverImage ? `url(${trip.coverImage}) center/cover` : "linear-gradient(135deg,#c9932c,#ff6b4a)",
      itinerary: itineraryDays.map((d) => ({
        day: d.dayNumber,
        activities: d.activities.map((a: { _id: unknown; time: string; title: string }) => ({
          id: String(a._id),
          time: a.time,
          title: a.title,
        })),
      })),
      checklist: (checklist?.items ?? []).map((i: { _id: unknown; text: string; completed: boolean }) => ({
        id: String(i._id),
        text: i.text,
        completed: i.completed,
      })),
    };
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { shareId } = await params;
  const view = await getShareView(shareId);
  if (!view) return { title: "Trip not found" };

  return {
    title: `${view.title} — shared trip`,
    description: view.description || `A trip to ${view.destination}, shared via Wayfarly.`,
    openGraph: {
      title: `${view.title} | Wayfarly`,
      description: view.description || `A trip to ${view.destination}, shared via Wayfarly.`,
    },
    robots: { index: false, follow: false },
  };
}

export default async function SharedTripPage({ params }: Props) {
  const { shareId } = await params;
  const view = await getShareView(shareId);
  if (!view) notFound();

  const remaining = view.budgetTotal - view.budgetSpent;

  return (
    <div>
      <div className={styles["wayfarly-share-banner"]}>
        You&apos;re viewing a shared, read-only trip on{" "}
        <Link href="/">Wayfarly</Link>
      </div>

      <div className={styles["wayfarly-share-hero"]} style={{ background: view.cover }}>
        <div className={styles["wayfarly-share-hero-overlay"]} />
        <div className={styles["wayfarly-share-hero-content"]}>
          <h1 className={styles["wayfarly-share-hero-title"]}>{view.destination}</h1>
          <div className={styles["wayfarly-share-hero-meta"]}>
            {view.startDate} → {view.endDate}
          </div>
        </div>
      </div>

      <div className={styles["wayfarly-share-body"]}>
        <div>
          <div className={styles["wayfarly-share-panel"]}>
            <div className={styles["wayfarly-share-panel-title"]}>
              <CalendarRange size={16} style={{ display: "inline", marginRight: 6, verticalAlign: -3 }} />
              Itinerary
            </div>
            {view.itinerary.length === 0 && (
              <p style={{ fontSize: "0.85rem", opacity: 0.6 }}>No itinerary shared yet.</p>
            )}
            {view.itinerary.map((day) => (
              <div key={day.day} className={styles["wayfarly-share-day-block"]}>
                <div className={styles["wayfarly-share-day-label"]}>Day {day.day}</div>
                {day.activities.map((a) => (
                  <div key={a.id} className={styles["wayfarly-share-activity-row"]}>
                    <span className={styles["wayfarly-share-activity-time"]}>{a.time}</span>
                    <span>{a.title}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className={styles["wayfarly-share-panel"]}>
            <div className={styles["wayfarly-share-panel-title"]}>
              <Wallet size={16} style={{ display: "inline", marginRight: 6, verticalAlign: -3 }} />
              Budget
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.86rem", padding: "0.4rem 0" }}>
              <span>Total</span>
              <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700 }}>
                {view.currency}{view.budgetTotal.toLocaleString()}
              </span>
            </div>
            {view.budgetSpent > 0 && (
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.86rem", padding: "0.4rem 0" }}>
                <span>Remaining</span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontWeight: 700,
                    color: remaining >= 0 ? "var(--wf-teal)" : "var(--wf-coral)",
                  }}
                >
                  {view.currency}{remaining.toLocaleString()}
                </span>
              </div>
            )}
          </div>

          <div className={styles["wayfarly-share-panel"]}>
            <div className={styles["wayfarly-share-panel-title"]}>
              <ListChecks size={16} style={{ display: "inline", marginRight: 6, verticalAlign: -3 }} />
              Packing Checklist
            </div>
            {view.checklist.length === 0 && <p style={{ fontSize: "0.85rem", opacity: 0.6 }}>Nothing listed yet.</p>}
            {view.checklist.map((item) => (
              <div key={item.id} className={styles["wayfarly-share-checklist-item"]} data-done={item.completed}>
                <input type="checkbox" checked={item.completed} readOnly />
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles["wayfarly-share-cta"]}>
        <Compass size={22} style={{ opacity: 0.5 }} />
        <p style={{ opacity: 0.65, fontSize: "0.9rem", marginTop: 8 }}>
          Plan your own trip — itineraries, budgets, checklists and photos, all in one place.
        </p>
        <Link href="/register" className={styles["wayfarly-share-cta-btn"]}>
          Try Wayfarly free <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}
