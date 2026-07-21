"use client";

import { useState, useTransition } from "react";
import { CalendarRange, Plus, X } from "lucide-react";
import {
  addItineraryDay,
  removeItineraryDay,
  addItineraryActivity,
  removeItineraryActivity,
} from "@/actions/trips";
import type { ItineraryDay } from "@/data/trips";
import styles from "./detail.module.css";

type ActivityTime = "Morning" | "Afternoon" | "Evening";
const TIMES: ActivityTime[] = ["Morning", "Afternoon", "Evening"];

export default function ItineraryPanel({
  tripId,
  days,
}: {
  tripId: string;
  days: ItineraryDay[];
}) {
  const [localDays, setLocalDays] = useState(days);
  const [draftByDay, setDraftByDay] = useState<
    Record<number, { time: ActivityTime; title: string }>
  >({});
  const [, startTransition] = useTransition();

  const addDay = () => {
    const nextDayNumber = (localDays.at(-1)?.day ?? 0) + 1;
    setLocalDays((prev) => [...prev, { day: nextDayNumber, activities: [] }]);

    startTransition(async () => {
      await addItineraryDay(tripId);
    });
  };

  const removeDay = (dayNumber: number) => {
    setLocalDays((prev) => prev.filter((d) => d.day !== dayNumber));

    startTransition(async () => {
      await removeItineraryDay(tripId, dayNumber);
    });
  };

  const addActivity = (dayNumber: number) => {
    const draft = draftByDay[dayNumber];
    const title = draft?.title.trim();
    if (!title) return;
    const time = draft?.time ?? "Morning";

    const tempId = `temp-${Date.now()}`;
    setLocalDays((prev) =>
      prev.map((d) =>
        d.day === dayNumber
          ? { ...d, activities: [...d.activities, { id: tempId, time, title }] }
          : d,
      ),
    );
    setDraftByDay((prev) => ({
      ...prev,
      [dayNumber]: { time: "Morning", title: "" },
    }));

    startTransition(async () => {
      await addItineraryActivity(tripId, dayNumber, { time, title });
    });
  };

  const removeActivity = (dayNumber: number, activityId: string) => {
    setLocalDays((prev) =>
      prev.map((d) =>
        d.day === dayNumber
          ? {
              ...d,
              activities: d.activities.filter((a) => a.id !== activityId),
            }
          : d,
      ),
    );

    startTransition(async () => {
      await removeItineraryActivity(tripId, dayNumber, activityId);
    });
  };

  return (
    <div className={styles["wayfarly-tripdetail-panel"]}>
      <div className={styles["wayfarly-tripdetail-panel-title"]}>
        <CalendarRange size={17} /> Itinerary
      </div>

      {localDays.length === 0 && (
        <p className={styles["wayfarly-tripdetail-notes-text"]}>
          No itinerary days added yet.
        </p>
      )}

      {localDays.map((day) => {
        const draft = draftByDay[day.day] ?? {
          time: "Morning" as ActivityTime,
          title: "",
        };
        return (
          <div
            key={day.day}
            className={styles["wayfarly-tripdetail-day-block"]}
          >
            <div className={styles["wayfarly-tripdetail-day-header"]}>
              <span className={styles["wayfarly-tripdetail-day-label"]}>
                Day {day.day}
              </span>
              <button
                className={styles["wayfarly-tripdetail-day-remove"]}
                onClick={() => removeDay(day.day)}
                aria-label={`Remove day ${day.day}`}
              >
                <X size={13} />
              </button>
            </div>

            {day.activities.map((a) => (
              <div
                key={a.id}
                className={styles["wayfarly-tripdetail-activity-row"]}
              >
                <span className={styles["wayfarly-tripdetail-activity-time"]}>
                  {a.time}
                </span>
                <span style={{ flex: 1 }}>{a.title}</span>
                <button
                  className={styles["wayfarly-tripdetail-activity-remove"]}
                  onClick={() => removeActivity(day.day, a.id)}
                  aria-label="Remove activity"
                >
                  <X size={12} />
                </button>
              </div>
            ))}

            <div className={styles["wayfarly-tripdetail-inline-add-row"]}>
              <select
                className={styles["wayfarly-tripdetail-inline-select"]}
                value={draft.time}
                onChange={(e) =>
                  setDraftByDay((prev) => ({
                    ...prev,
                    [day.day]: {
                      ...draft,
                      time: e.target.value as ActivityTime,
                    },
                  }))
                }
                aria-label="Time of day"
              >
                {TIMES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <input
                className={styles["wayfarly-tripdetail-inline-input"]}
                placeholder="Add an activity..."
                value={draft.title}
                onChange={(e) =>
                  setDraftByDay((prev) => ({
                    ...prev,
                    [day.day]: { ...draft, title: e.target.value },
                  }))
                }
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  (e.preventDefault(), addActivity(day.day))
                }
              />
              <button
                className={styles["wayfarly-tripdetail-inline-add-btn"]}
                onClick={() => addActivity(day.day)}
                aria-label="Add activity"
              >
                <Plus size={15} />
              </button>
            </div>
          </div>
        );
      })}

      <button
        className={styles["wayfarly-tripdetail-add-day-btn"]}
        onClick={addDay}
      >
        <Plus size={15} /> Add a day
      </button>
    </div>
  );
}
