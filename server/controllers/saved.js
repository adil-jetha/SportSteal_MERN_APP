// Bring up the Post model from the given route.
import Post from "../models/Post.js";

/* CREATE */
// The getUserSaved function obtains all of a user's saved posts in an asynchronous manner.
export const getUserSaved = async (req, res) => {
  try {// Obtain the userId from the arguments of the request
    const { userId } = req.params;// Locate all the posts with the specified userId.
    const post = await Post.find({ userId });
    res.status(200).json(post);    // Send a 200 status and a JSON object containing the found posts.
  } catch (err) {
    res.status(404).json({ message: err.message });// Send a 404 status with the error message as a JSON if there is a problem. 
  }
};
// The saved method is an asynchronous function that changes a post's status from "saved" to "unsaved" for a particular user.
/* UPDATE */
export const saved = async (req, res) => {
  try {
    const { id } = req.params;// Get the request parameters' post id.
    const { userId } = req.body;// Take the userId from the body of the request.
    const post = await Post.findById(id);// Locate the post using its id
    const isLiked = post.likes.get(userId); // Determine whether the user has already "liked" the post.
    //Remove the user's like if they have already liked the post.
    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);// Add the user's like if they have not already.
    }
    // Get the updated post and update the post with the new likes.
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);// Send a 200 status and a JSON object containing the changed post.
  } catch (err) {
    res.status(404).json({ message: err.message });// Send a 404 status with the error message as a JSON if there is a problem. 
  }
};






