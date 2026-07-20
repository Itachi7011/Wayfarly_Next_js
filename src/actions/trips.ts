"use server";

import { randomBytes } from "crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { connectToDatabase } from "@/lib/db";
import Trip from "@/models/Trip";
import Checklist from "@/models/Checklist";
import Gallery from "@/models/Gallery";
import Itinerary from "@/models/Itinerary";
import Note from "@/models/Note";
import { tripSchema } from "@/lib/validations";
import { getSession } from "@/lib/auth";

export type ActionResult = { success: boolean; message: string };

export async function createTrip(formData: FormData): Promise<ActionResult> {
  const raw = {
    title: formData.get("title"),
    destination: formData.get("destination"),
    description: formData.get("description") ?? "",
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
    budget: formData.get("budget"),
    currency: formData.get("currency") ?? "INR",
    coverImage: formData.get("coverImage") ?? "",
  };

  const parsed = tripSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message ?? "Invalid trip data" };
  }

  const session = await getSession();
  if (!session) {
    return { success: false, message: "You must be logged in to create a trip." };
  }

  try {
    await connectToDatabase();
    const trip = await Trip.create({ ...parsed.data, userId: session.userId });
    await Checklist.create({ tripId: trip._id, items: [] });
  } catch (err) {
    return {
      success: false,
      message:
        err instanceof Error && err.message.includes("MONGODB_URI")
          ? "Database isn't connected yet — add MONGODB_URI to .env.local to save real trips."
          : "Something went wrong while saving your trip.",
    };
  }

  revalidatePath("/trips");
  redirect("/trips");
}

export async function updateTrip(tripId: string, formData: FormData): Promise<ActionResult> {
  const raw = {
    title: formData.get("title"),
    destination: formData.get("destination"),
    description: formData.get("description") ?? "",
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
    budget: formData.get("budget"),
    currency: formData.get("currency") ?? "INR",
    coverImage: formData.get("coverImage") ?? "",
  };

  const parsed = tripSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message ?? "Invalid trip data" };
  }

  const session = await getSession();
  if (!session) {
    return { success: false, message: "You must be logged in to edit a trip." };
  }

  try {
    await connectToDatabase();
    // Ownership check: always scope the query by userId, never trust the id alone.
    await Trip.findOneAndUpdate({ _id: tripId, userId: session.userId }, parsed.data);
  } catch {
    return { success: false, message: "Something went wrong while updating your trip." };
  }

  revalidatePath(`/trips/${tripId}`);
  redirect(`/trips/${tripId}`);
}

export async function deleteTrip(tripId: string): Promise<ActionResult> {
  const session = await getSession();
  if (!session) return { success: false, message: "You must be logged in." };

  try {
    await connectToDatabase();
    await Trip.findOneAndDelete({ _id: tripId, userId: session.userId });
  } catch {
    return { success: false, message: "Could not delete this trip." };
  }

  revalidatePath("/trips");
  return { success: true, message: "Trip deleted." };
}

export async function addGalleryImage(
  tripId: string,
  image: { url: string; publicId: string }
): Promise<ActionResult> {
  const session = await getSession();
  if (!session) return { success: false, message: "You must be logged in." };

  try {
    await connectToDatabase();
    await Gallery.findOneAndUpdate(
      { tripId },
      { $push: { images: image } },
      { upsert: true }
    );
  } catch (err) {
    return {
      success: false,
      message:
        err instanceof Error && err.message.includes("MONGODB_URI")
          ? "Database isn't connected — this photo is only showing for you, in this session."
          : "Could not save this photo.",
    };
  }

  revalidatePath(`/trips/${tripId}`);
  return { success: true, message: "Photo added." };
}

export async function toggleChecklistItem(tripId: string, itemId: string): Promise<ActionResult> {
  const session = await getSession();
  if (!session) return { success: false, message: "You must be logged in." };

  try {
    await connectToDatabase();
    const checklist = await Checklist.findOne({ tripId });
    if (!checklist) return { success: false, message: "Checklist not found." };

    const item = checklist.items.id(itemId);
    if (!item) return { success: false, message: "Item not found." };

    item.completed = !item.completed;
    await checklist.save();
  } catch {
    return { success: false, message: "Could not update checklist item." };
  }

  revalidatePath(`/trips/${tripId}`);
  return { success: true, message: "Updated." };
}

export async function addChecklistItem(tripId: string, text: string): Promise<ActionResult> {
  const session = await getSession();
  if (!session) return { success: false, message: "You must be logged in." };
  if (!text.trim()) return { success: false, message: "Item text can't be empty." };

  try {
    await connectToDatabase();
    await Checklist.findOneAndUpdate(
      { tripId },
      { $push: { items: { text: text.trim(), completed: false } } },
      { upsert: true }
    );
  } catch (err) {
    return {
      success: false,
      message:
        err instanceof Error && err.message.includes("MONGODB_URI")
          ? "Database isn't connected — this item is only showing for you, in this session."
          : "Could not add this item.",
    };
  }

  revalidatePath(`/trips/${tripId}`);
  return { success: true, message: "Item added." };
}

export async function addItineraryDay(tripId: string): Promise<ActionResult> {
  const session = await getSession();
  if (!session) return { success: false, message: "You must be logged in." };

  try {
    await connectToDatabase();
    const lastDay = await Itinerary.findOne({ tripId }).sort({ dayNumber: -1 });
    const nextDayNumber = (lastDay?.dayNumber ?? 0) + 1;
    await Itinerary.create({ tripId, dayNumber: nextDayNumber, activities: [] });
  } catch (err) {
    return {
      success: false,
      message:
        err instanceof Error && err.message.includes("MONGODB_URI")
          ? "Database isn't connected — this day is only showing for you, in this session."
          : "Could not add a new day.",
    };
  }

  revalidatePath(`/trips/${tripId}`);
  return { success: true, message: "Day added." };
}

export async function removeItineraryDay(tripId: string, dayNumber: number): Promise<ActionResult> {
  const session = await getSession();
  if (!session) return { success: false, message: "You must be logged in." };

  try {
    await connectToDatabase();
    await Itinerary.findOneAndDelete({ tripId, dayNumber });
  } catch {
    return { success: false, message: "Could not remove this day." };
  }

  revalidatePath(`/trips/${tripId}`);
  return { success: true, message: "Day removed." };
}

export async function addItineraryActivity(
  tripId: string,
  dayNumber: number,
  activity: { time: "Morning" | "Afternoon" | "Evening"; title: string }
): Promise<ActionResult> {
  const session = await getSession();
  if (!session) return { success: false, message: "You must be logged in." };
  if (!activity.title.trim()) return { success: false, message: "Activity title can't be empty." };

  try {
    await connectToDatabase();
    await Itinerary.findOneAndUpdate(
      { tripId, dayNumber },
      { $push: { activities: activity } },
      { upsert: true }
    );
  } catch (err) {
    return {
      success: false,
      message:
        err instanceof Error && err.message.includes("MONGODB_URI")
          ? "Database isn't connected — this activity is only showing for you, in this session."
          : "Could not add this activity.",
    };
  }

  revalidatePath(`/trips/${tripId}`);
  return { success: true, message: "Activity added." };
}

export async function removeItineraryActivity(
  tripId: string,
  dayNumber: number,
  activityId: string
): Promise<ActionResult> {
  const session = await getSession();
  if (!session) return { success: false, message: "You must be logged in." };

  try {
    await connectToDatabase();
    await Itinerary.findOneAndUpdate(
      { tripId, dayNumber },
      { $pull: { activities: { _id: activityId } } }
    );
  } catch {
    return { success: false, message: "Could not remove this activity." };
  }

  revalidatePath(`/trips/${tripId}`);
  return { success: true, message: "Activity removed." };
}

export async function toggleTripSharing(tripId: string): Promise<ActionResult & { shareId?: string; isPublic?: boolean }> {
  const session = await getSession();
  if (!session) return { success: false, message: "You must be logged in." };

  try {
    await connectToDatabase();
    const trip = await Trip.findOne({ _id: tripId, userId: session.userId });
    if (!trip) return { success: false, message: "Trip not found." };

    trip.isPublic = !trip.isPublic;
    if (trip.isPublic && !trip.shareId) {
      trip.shareId = randomBytes(6).toString("hex");
    }
    await trip.save();

    revalidatePath(`/trips/${tripId}`);
    return { success: true, message: trip.isPublic ? "Sharing turned on." : "Sharing turned off.", shareId: trip.shareId, isPublic: trip.isPublic };
  } catch (err) {
    return {
      success: false,
      message:
        err instanceof Error && err.message.includes("MONGODB_URI")
          ? "Database isn't connected — sharing is only previewed for you, in this session."
          : "Could not update sharing for this trip.",
    };
  }
}

export async function saveTripNotes(tripId: string, content: string): Promise<ActionResult> {
  const session = await getSession();
  if (!session) return { success: false, message: "You must be logged in." };

  try {
    await connectToDatabase();
    await Note.findOneAndUpdate({ tripId }, { content }, { upsert: true });
  } catch (err) {
    return {
      success: false,
      message:
        err instanceof Error && err.message.includes("MONGODB_URI")
          ? "Database isn't connected — these notes are only saved for you, in this session."
          : "Could not save your notes.",
    };
  }

  revalidatePath(`/trips/${tripId}`);
  return { success: true, message: "Notes saved." };
}
