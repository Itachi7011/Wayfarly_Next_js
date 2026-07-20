import { Schema, model, models, type InferSchemaType } from "mongoose";

const TripSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    title: { type: String, required: true, minlength: 3, trim: true },
    destination: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    budget: { type: Number, required: true, min: 0 },
    currency: { type: String, default: "INR" },
    coverImage: { type: String, default: "" },
    status: {
      type: String,
      enum: ["Upcoming", "Completed", "Cancelled"],
      default: "Upcoming",
    },
    isPublic: { type: Boolean, default: false },
    shareId: { type: String, unique: true, sparse: true, index: true },
  },
  { timestamps: true }
);

export type TripDoc = InferSchemaType<typeof TripSchema>;

export default models.Trip || model("Trip", TripSchema);
