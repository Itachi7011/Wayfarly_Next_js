import type { Metadata } from "next";
import { notFound } from "next/navigation";
import styles from "../../create/create.module.css";
import TripForm from "../../create/TripForm";
import { trips } from "@/data/trips";

type Props = { params: Promise<{ tripId: string }> };

export const metadata: Metadata = {
  title: "Edit Trip",
};

export default async function EditTripPage({ params }: Props) {
  const { tripId } = await params;
  const trip = trips.find((t) => t.slug === tripId || t.id === tripId);
  if (!trip) notFound();

  return (
    <div className={styles["wayfarly-tripform-shell"]}>
      <h1 className={styles["wayfarly-tripform-heading"]}>Edit {trip.destination}</h1>
      <p className={styles["wayfarly-tripform-sub"]}>Update the details below and save your changes.</p>
      <TripForm
        mode="edit"
        tripId={trip.id}
        defaultValues={{
          title: trip.title,
          destination: trip.destination,
          description: trip.description,
          startDate: trip.startDate,
          endDate: trip.endDate,
          budget: trip.budgetTotal,
          currency: "INR",
        }}
      />
    </div>
  );
}
