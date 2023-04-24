// Import the necessary modules.
import express from "express";
import { getFeedPosts, getUserPosts, likePost, getLikedPosts, addComment, getComments }
    from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";
// Create a fresh instance of the router.
const router = express.Router();

/* READ */ // How to access feed posts. Verifying the user's authentication is done via the middleware "verifyToken".
router.get("/", verifyToken, getFeedPosts);
// Path to retrieve posts for a certain user. Verifying the user's authentication is done via the middleware "verifyToken".
router.get("/:userId/posts", verifyToken, getUserPosts);
// Direction to retrieve posts liked by a certain person. Verifying the user's authentication is done via the middleware "verifyToken".
router.get("/liked/:id", verifyToken, getLikedPosts);

// /* UPDATE */ method for like a post. Verifying the user's authentication is done via the middleware "verifyToken".
router.patch("/:id/like", verifyToken, likePost);

// /* CREATE */ How to find comments for a particular post. Verifying the user's authentication is done via the middleware "verifyToken".
router.get("/:id/get/comment", verifyToken, getComments)
// Directions for adding a comment to a particular post. Verifying the user's authentication is done via the middleware "verifyToken".
router.post("/:id/comment", verifyToken, addComment);
// Export the default router so that it can be used in other areas of the program;
export default router;
