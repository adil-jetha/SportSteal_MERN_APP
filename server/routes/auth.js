// Import the necessary modules.
import express from "express";
import { login } from "../controllers/auth.js";
// Create a fresh instance of the router.
const router = express.Router();
// Path to a user's login.
router.post("/login", login);
//The router instance should be exported to.
export default router;
