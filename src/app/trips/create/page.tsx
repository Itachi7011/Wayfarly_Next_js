import type { Metadata } from "next";
import styles from "./create.module.css";
import TripForm from "./TripForm";

export const metadata: Metadata = {
  title: "Create a Trip",
  description: "Start a new trip on Wayfarly — set your dates, budget and destination.",
};

export default function CreateTripPage() {
  return (
    <div className={styles["wayfarly-tripform-shell"]}>
      <h1 className={styles["wayfarly-tripform-heading"]}>Create a new trip</h1>
      <p className={styles["wayfarly-tripform-sub"]}>Fill in the basics — you can flesh out the itinerary afterwards.</p>
      <TripForm mode="create" />
    </div>
  );
}
