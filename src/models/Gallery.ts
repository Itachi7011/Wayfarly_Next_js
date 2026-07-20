import { Schema, model, models } from "mongoose";

const GalleryImageSchema = new Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
  },
  { _id: true }
);

const GallerySchema = new Schema(
  {
    tripId: { type: Schema.Types.ObjectId, ref: "Trip", required: true, index: true },
    images: { type: [GalleryImageSchema], default: [] },
  },
  { timestamps: true }
);

export default models.Gallery || model("Gallery", GallerySchema);
