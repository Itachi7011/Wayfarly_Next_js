import { Schema, model, models } from "mongoose";

const ChecklistItemSchema = new Schema(
  {
    text: { type: String, required: true },
    completed: { type: Boolean, default: false },
  },
  { _id: true }
);

const ChecklistSchema = new Schema(
  {
    tripId: { type: Schema.Types.ObjectId, ref: "Trip", required: true, index: true },
    items: { type: [ChecklistItemSchema], default: [] },
  },
  { timestamps: true }
);

export default models.Checklist || model("Checklist", ChecklistSchema);
