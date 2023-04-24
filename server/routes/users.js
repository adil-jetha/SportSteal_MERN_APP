// Import the necessary modules.
import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
  updateUser
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";
// Create a new instance of the router by setting router to express.Router();
const router = express.Router();

/* READ */ // How to navigate to a specific user's ID. Verifying the user's authentication is done via the middleware "verifyToken".
router.get("/:id", verifyToken, getUser);
// Follow this path to find a user's buddies by ID. 'verifyToken' middleware 
router.get("/:id/friends", verifyToken, getUserFriends);

// /* UPDATE */ route for a user to add or remove friends. Verifying the user's authentication is done via the middleware "verifyToken".
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);
// Route for changing a user's data. Verifying the user's authentication is done via the middleware "verifyToken".
router.patch("/:id", verifyToken, updateUser);
// Export the default router so that it can be used in other areas of the program;
export default router;
