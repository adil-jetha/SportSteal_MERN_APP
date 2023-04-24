// Import the necessary module
import jwt from "jsonwebtoken";

// Middleware method to check the request header's JSON Web Token (JWT)

export const verifyToken = async (req, res, next) => {
  try {// Extract the JWT from the request's "Authorization" header
    let token = req.header("Authorization");
    // Return an access denied response if the token is not present.
    if (!token) {
      return res.status(403).send("Access Denied");
    }
    // Remove the "Bearer" prefix if the token begins with it.
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }
    // Use the environment variables' secret key to validate the token.
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    // Join the request object's request object with the verified token data for processing.
    req.user = verified;

    // Invoke the following middleware function in the series.
    next();
  } catch (err) {// Provide an error answer if a token verification issue occurs.
    res.status(500).json({ error: err.message });
  }
};




















