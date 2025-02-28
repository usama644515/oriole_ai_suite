import jwt from "jsonwebtoken";

export function verifyToken(req) {
  const token = req.cookies.token;
  if (!token) return null;

  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
}
