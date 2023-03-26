import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxLength: 20 },
  videoUrl: { type: String, required: true },
  description: { type: String, trim: true, maxLength: 140, default: "" },
  createdAt: { type: Date, required: true, default: Date.now },
  hashtags: [{ type: String, trim: true, default: undefined }],
  meta: {
    views: { type: Number, default: 0, required: true },
  },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});

videoSchema.static("formatHashtags", function (hashtags) {
  return hashtags
    ? hashtags.split(",").map((word) => {
        word = word.trim();
        return word.startsWith("#") ? word : `#${word}`;
      })
    : "";
});

const Video = mongoose.model("Video", videoSchema);
export default Video;
