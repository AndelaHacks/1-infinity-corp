import mongoose from "mongoose";

const { Schema } = mongoose;

let Article = null;

try {
  const ArticleSchema = new Schema({
    _id: {
      timestamp: Number,
      author: String
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "users"
    },
    author: String,
    category: String,
    title: String,
    content: String,
    tags: String,
    reviews: [
      {
        reviewer: String,
        review: String
      }
    ],
    articleConfirmed: {
      type: Boolean,
      default: false
    }
  });
  Article = mongoose.model("Article", ArticleSchema);
} catch (e) {
  Article = mongoose.model("Article");
}

export default Article;
