import { Schema, model, models } from "mongoose";

const NoteSchema = new Schema(
  {
    tripId: { type: Schema.Types.ObjectId, ref: "Trip", required: true, index: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

export default models.Note || model("Note", NoteSchema);
