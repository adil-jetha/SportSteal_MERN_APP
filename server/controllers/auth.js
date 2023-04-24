// Import the necessary libraries.
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* REGISTER USER */// Add a new user.
export const register = async (req, res) => {
  try {// Destructure the user input from the request body using this code.
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;
    // Create a salt and use bcrypt to hash the password.
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    // Create a new instance of the user with the hashed password and other information.
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });
    // The new user is saved to the database.
    const savedUser = await newUser.save();
    // Return the saved user with the creation status 201.
    res.status(201).json(savedUser);
  } catch (err) {
    // Send back a 500 Internal Server Error error message.
    res.status(500).json({ error: err.message });
  }
};

/* LOGGING IN */// User logging in
export const login = async (req, res) => {
  try {// Remove the request body's email and password.
    const { email, password } = req.body;
    // Search the database for the user by email.
    const user = await User.findOne({ email: email });
    //Return a 400 status (Bad Request) error if the user is not present.
    if (!user) return res.status(400).json({ msg: "User does not exist. " });
    // Compare the entered password to the database's hashed password.
    const isMatch = await bcrypt.compare(password, user.password);
    // Return a 400 status (Bad Request) error if the password is incorrect.
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });
    // Create a user's JSON Web Token (JWT)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    // Remove the user object's password.
    delete user.password;
    // Send back the user object and JWT token with a 200 status (OK)
    res.status(200).json({ token, user });
  } catch (err) {
    // Send back a 500 Internal Server Error error message.
    res.status(500).json({ error: err.message });
  }
};










