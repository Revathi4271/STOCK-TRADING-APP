import jwt from "jsonwebtoken";

/**
 * Generates a signed JWT for a given user id.
 * Expiry is controlled via JWT_EXPIRES_IN in .env (default 7d).
 */
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

export default generateToken;
