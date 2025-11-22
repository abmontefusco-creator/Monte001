import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
  { any: mongoose.Schema.Types.Mixed },
  { strict: false }
);

const News = mongoose.model("News", newsSchema, "news");

export default News;