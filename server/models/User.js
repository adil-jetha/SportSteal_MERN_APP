// Import the necessary module
import mongoose from "mongoose";
// Defining the User Schema
const UserSchema = new mongoose.Schema(
  {
    // Specify the characteristics of the necessary fields.
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    // Specify optional fields' attributes
    picturePath: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number,
    twitter: String,
    linkedIn: String,
    instagram: String
  },
  // Make the createdAt and updatedAt fields timestamp-enabled.
  { timestamps: true }
);
// Create a user model using the schema
const User = mongoose.model("User", UserSchema);
//User model export
export default User;