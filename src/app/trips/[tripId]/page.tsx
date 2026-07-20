import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Wallet, Pencil } from "lucide-react";
import styles from "./detail.module.css";
import { trips } from "@/data/trips";
import ChecklistPanel from "./ChecklistPanel";
import GalleryPanel from "./GalleryPanel";
import ItineraryPanel from "./ItineraryPanel";
import NotesPanel from "./NotesPanel";
import SharePanel from "./SharePanel";
import ExportPdfButton from "./ExportPdfButton";

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

type Props = { params: Promise<{ tripId: string }> };

function findTrip(tripId: string) {
  return trips.find((t) => t.slug === tripId || t.id === tripId);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tripId } = await params;
  const trip = findTrip(tripId);
  if (!trip) return { title: "Trip not found" };

  return {
    title: `${trip.destination} Trip`,
    description: trip.description,
    openGraph: {
      title: `${trip.destination} Trip | Wayfarly`,
      description: trip.description,
    },
  };
}

export async function generateStaticParams() {
  return trips.map((t) => ({ tripId: t.slug }));
}

export default async function TripDetailPage({ params }: Props) {
  const { tripId } = await params;
  const trip = findTrip(tripId);
  if (!trip) notFound();

  const remaining = trip.budgetTotal - trip.budgetSpent;

  return (
    <div>
      <div className={styles["wayfarly-tripdetail-hero"]}>
        <Image
          src={tripImages[trip.destination]}
          alt={trip.destination}
          fill
          priority
          sizes="100vw"
          style={{
            objectFit: "cover",
          }}
        />

        <div className={styles["wayfarly-tripdetail-hero-overlay"]} />

        <div className={styles["wayfarly-tripdetail-hero-content"]}>
          <span className={styles["wayfarly-tripdetail-hero-status"]}>
            {trip.status}
          </span>

          <h1 className={styles["wayfarly-tripdetail-hero-title"]}>
            {trip.destination}, {trip.country}
          </h1>

          <div className={styles["wayfarly-tripdetail-hero-meta"]}>
            {trip.startDate} → {trip.endDate}
          </div>
        </div>
      </div>

      <div className={styles["wayfarly-tripdetail-body"]}>
        <div>
          <ItineraryPanel tripId={trip.id} days={trip.itinerary} />

          <GalleryPanel tripId={trip.id} images={trip.gallery} />
        </div>

        <div>
          <div className={styles["wayfarly-tripdetail-panel"]}>
            <div className={styles["wayfarly-tripdetail-panel-title"]}>
              <Wallet size={17} /> Budget Tracker
            </div>
            <div className={styles["wayfarly-tripdetail-budget-row"]}>
              <span>Total</span>
              <span className={styles["wayfarly-tripdetail-budget-value"]}>
                {trip.currency}
                {trip.budgetTotal.toLocaleString()}
              </span>
            </div>
            <div className={styles["wayfarly-tripdetail-budget-row"]}>
              <span>Spent</span>
              <span className={styles["wayfarly-tripdetail-budget-value"]}>
                {trip.currency}
                {trip.budgetSpent.toLocaleString()}
              </span>
            </div>
            <div className={styles["wayfarly-tripdetail-budget-row"]}>
              <span>Remaining</span>
              <span
                className={styles["wayfarly-tripdetail-budget-value"]}
                style={{
                  color: remaining >= 0 ? "var(--wf-teal)" : "var(--wf-coral)",
                }}
              >
                {trip.currency}
                {remaining.toLocaleString()}
              </span>
            </div>
          </div>

          <ChecklistPanel tripId={trip.id} items={trip.checklist} />

          <SharePanel
            tripId={trip.id}
            slug={trip.slug}
            initialPublic={trip.isPublic}
          />

          <NotesPanel tripId={trip.id} initialNotes={trip.notes} />

          <div className={styles["wayfarly-tripdetail-action-row"]}>
            <a
              href={`/trips/${trip.slug}/edit`}
              className={styles["wayfarly-tripdetail-edit-link"]}
            >
              <Pencil size={14} /> Edit trip
            </a>
            <ExportPdfButton
              title={trip.title}
              destination={trip.destination}
              country={trip.country}
              startDate={trip.startDate}
              endDate={trip.endDate}
              currency={trip.currency}
              budgetTotal={trip.budgetTotal}
              budgetSpent={trip.budgetSpent}
              itinerary={trip.itinerary}
              checklist={trip.checklist}
              notes={trip.notes}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
