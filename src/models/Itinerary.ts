import { Schema, model, models } from "mongoose";

const ActivitySchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    time: { type: String, enum: ["Morning", "Afternoon", "Evening"], required: true },
  },
  { _id: true }
);

const ItinerarySchema = new Schema(
  {
    tripId: { type: Schema.Types.ObjectId, ref: "Trip", required: true, index: true },
    dayNumber: { type: Number, required: true },
    activities: { type: [ActivitySchema], default: [] },
  },
  { timestamps: true }
);

export default models.Itinerary || model("Itinerary", ItinerarySchema);
