// Import the necessary modules.
import express from "express";
import { saved, getUserSaved } from "../controllers/saved.js";
import { verifyToken } from "../middleware/auth.js";
// Create a fresh instance of the router.
const router = express.Router();

/* READ */ // a way to access saved content for a particular user. Verifying the user's authentication is done via the middleware "verifyToken".
router.get("/:userId/saved", verifyToken, getUserSaved);

// /* UPDATE */ route for updating a user's saved content. Verifying the user's authentication is done via the middleware "verifyToken".
router.patch("/:id/saved", verifyToken, saved);
// Export the default router so that it can be used in other areas of the program;
export default router;
