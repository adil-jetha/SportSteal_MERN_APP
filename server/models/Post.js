// Import the necessary module
import mongoose from "mongoose";
// Create a schema for saved content
const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: [{
      userId: {
        type: String,
        required: true,
      },
      comment: {
        type: String,
        // required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
    }],
    saved: {
      type: Map,
      of: Boolean,
    },
  },  // Make the createdAt and updatedAt fields timestamp-enabled.
  { timestamps: true }
);
// depending on the schema, create a saved model.
const Post = mongoose.model("Post", postSchema);
// Saved model export
export default Post;













