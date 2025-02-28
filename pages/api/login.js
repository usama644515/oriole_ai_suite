import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/dbConnect";
import User from "@/models/User";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  await connectDB();

  const { userId, password } = req.body;

  if (!userId || !password) {
    return res.status(400).json({ message: "User ID and password are required" });
  }

  const user = await User.findOne({ userId });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Create a JWT token
  const token = jwt.sign(
    {
      userId: user.userId,
      userName: user.userName,
      subscriptionStatus: user.subscriptionStatus,
      aiModels: user.aiModels,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  // Set token in HTTP-Only Cookie
  res.setHeader(
    "Set-Cookie",
    `token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict`
  );

  // Send response with user data and token
  res.status(200).json({
    message: "Login successful",
    token,
    user: {
      userId: user.userId,
      userName: user.userName,
      email: user.email,
      subscriptionStatus: user.subscriptionStatus,
      aiModels: user.aiModels,
      createdAt: user.createdAt,
    },
  });
}
