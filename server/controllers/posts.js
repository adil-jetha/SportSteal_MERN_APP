
// Import the necessary models.
import Post from "../models/Post.js";
import User from "../models/User.js";

/* CREATE */// Start a new post
export const createPost = async (req, res) => {
  try {
    // Take post-request info out of the request
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);// Get user information
    // Generate a new post object with the supplied information and the user's details.
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    // Store the new post in the database.
    await newPost.save();

    // Send the response with all posts that were retrieved.
    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */// Retrieve all feed posts
export const getFeedPosts = async (req, res) => {
  try {// Pull up every post in the database.
    const post = await Post.find();
    // Send responses to the posts.
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
// Get all of a certain user's posts
export const getUserPosts = async (req, res) => {
  try {// Take the request parameters' user ID.
    const { userId } = req.params;  // Gather all posts containing the given user ID.
    const post = await Post.find({ userId });  // Send responses to the posts.
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
// Return all comments liked by a certain person.
export const getLikedPosts = async (req, res) => {
  try {
    // Take the request parameters' user ID.
    const { userId } = req.params;
    // Get all posts that have the user ID you gave in the "likes" column.
    const posts = await Post.find({ "likes.userId": userId });
    // Send responses to the posts.
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};


/* UPDATE */// Change a post's "like" status for a specific user
export const likePost = async (req, res) => {
  try {

    // Take the request's post ID and user ID.
    const { id } = req.params;

    const { userId } = req.body;
    // Get the post using its ID
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);// Determine whether the user has already liked the post.

    if (isLiked) {// If the post has already been liked, remove the "like"; if not, add a "like"
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }
    // Add the new "likes" information to the post in the database.
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );
    // Respond with the revised post.
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};





/* CREATE COMMENT */
export const addComment = async (req, res) => {
  try {
    // From the request, retrieve the post ID and comment information.
    const { id } = req.params;
    const { userId, firstName, lastName, comment } = req.body;


    // Using the ID, locate the post in the database.
    const post = await Post.findById(id);

    // With the user's information and the comment text, create a new comment object.
    const newComment = {
      userId,
      firstName,
      lastName,
      comment,
    };


    // Include the new comment in the post's array of comments.
    post.comments.push(newComment);

    // Update the post with the new comment and save it to the database.
    const updatedPost = await post.save();



    // React by posting the revised message
    res.status(200).json(updatedPost);
  } catch (err) {
    // Handle errors and deliver a response when one occurs.

    res.status(404).json({ message: err.message });
  }
};


// Retrieve all remarks for a certain post.
export const getComments = async (req, res) => {
  try {
    // Take the request parameters to find the post ID.
    const { id } = req.params;


    // Using the ID, locate the post in the database.
    const post = await Post.findById(id);


    // Send an error response in the event that the post is invalid.
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Get the comments array from the post
    const comments = post.comments;


    // Record comments for troubleshooting.

    console.log('115', comments);
    // Respond by sending the comments array.
    return res.status(200).json({ comments });
  } catch (err) {

    // Handle errors and deliver a response when one occurs.
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};


/* CREATE COMMENT */





























// Record comments for troubleshooting.


// Respond by sending the comments array.

// Handle errors and deliver a response when one occurs.


