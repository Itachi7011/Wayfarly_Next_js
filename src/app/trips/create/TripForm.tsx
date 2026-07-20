"use client";

import { useState, useTransition } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import type { z } from "zod";
import { tripSchema, type TripInput } from "@/lib/validations";
import { createTrip, updateTrip } from "@/actions/trips";
import ImageDropzone from "@/components/ui/ImageDropzone";
import styles from "./create.module.css";

type TripFormValues = z.input<typeof tripSchema>;

type Props = {
  mode: "create" | "edit";
  tripId?: string;
  defaultValues?: Partial<TripFormValues>;
};

export default function TripForm({ mode, tripId, defaultValues }: Props) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [coverImage, setCoverImage] = useState<string | null>(defaultValues?.coverImage ?? null);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TripFormValues, unknown, TripInput>({
    resolver: zodResolver(tripSchema),
    defaultValues: { currency: "INR", ...defaultValues },
  });

  const onSubmit: SubmitHandler<TripInput> = (data) => {
    setServerError(null);
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => formData.set(key, String(value ?? "")));
    if (coverImage) formData.set("coverImage", coverImage);

    startTransition(async () => {
      const result =
        mode === "create" ? await createTrip(formData) : await updateTrip(tripId as string, formData);
      if (result && !result.success) setServerError(result.message);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={styles["wayfarly-tripform-card"]}>
        <div className={styles["wayfarly-tripform-section-title"]}>Basic Information</div>

        <div className={styles["wayfarly-tripform-field"]}>
          <label htmlFor="title">Trip title</label>
          <input id="title" className={styles["wayfarly-tripform-input"]} placeholder="Kyoto Autumn Wander" {...register("title")} />
          {errors.title && <p className={styles["wayfarly-tripform-error"]}>{errors.title.message}</p>}
        </div>

        <div className={styles["wayfarly-tripform-field"]}>
          <label htmlFor="destination">Destination</label>
          <input id="destination" className={styles["wayfarly-tripform-input"]} placeholder="Kyoto, Japan" {...register("destination")} />
          {errors.destination && <p className={styles["wayfarly-tripform-error"]}>{errors.destination.message}</p>}
        </div>

        <div className={styles["wayfarly-tripform-row"]}>
          <div className={styles["wayfarly-tripform-field"]}>
            <label htmlFor="startDate">Start date</label>
            <input id="startDate" type="date" className={styles["wayfarly-tripform-input"]} {...register("startDate")} />
            {errors.startDate && <p className={styles["wayfarly-tripform-error"]}>{errors.startDate.message}</p>}
          </div>
          <div className={styles["wayfarly-tripform-field"]}>
            <label htmlFor="endDate">End date</label>
            <input id="endDate" type="date" className={styles["wayfarly-tripform-input"]} {...register("endDate")} />
            {errors.endDate && <p className={styles["wayfarly-tripform-error"]}>{errors.endDate.message}</p>}
          </div>
        </div>

        <div className={styles["wayfarly-tripform-field"]}>
          <label htmlFor="description">Description</label>
          <textarea id="description" className={styles["wayfarly-tripform-textarea"]} placeholder="What's this trip about?" {...register("description")} />
        </div>

        <div className={styles["wayfarly-tripform-divider"]} />
        <div className={styles["wayfarly-tripform-section-title"]}>Budget</div>

        <div className={styles["wayfarly-tripform-row"]}>
          <div className={styles["wayfarly-tripform-field"]}>
            <label htmlFor="budget">Total budget</label>
            <input id="budget" type="number" step="1" className={styles["wayfarly-tripform-input"]} placeholder="150000" {...register("budget")} />
            {errors.budget && <p className={styles["wayfarly-tripform-error"]}>{errors.budget.message}</p>}
          </div>
          <div className={styles["wayfarly-tripform-field"]}>
            <label htmlFor="currency">Currency</label>
            <select id="currency" className={styles["wayfarly-tripform-input"]} {...register("currency")}>
              <option value="INR">INR (₹)</option>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
            </select>
          </div>
        </div>

        <div className={styles["wayfarly-tripform-divider"]} />
        <div className={styles["wayfarly-tripform-section-title"]}>Cover Image</div>
        <ImageDropzone
          previewUrl={coverImage}
          onUploaded={({ url }) => setCoverImage(url)}
          hint="Uploads to Cloudinary once configured — see README"
        />

        {serverError && <div className={styles["wayfarly-tripform-banner"]}>{serverError}</div>}

        <button type="submit" className={styles["wayfarly-tripform-submit"]} disabled={isPending}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, justifyContent: "center", width: "100%" }}>
            <Save size={16} /> {isPending ? "Saving..." : mode === "create" ? "Create Trip" : "Save Changes"}
          </span>
        </button>
      </div>
    </form>
  );
}
