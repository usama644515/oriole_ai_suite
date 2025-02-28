import { verifyToken } from "@/utils/auth";

export default function handler(req, res) {
  const user = verifyToken(req);
  if (!user) return res.status(401).json({ message: "Unauthorized" });

  res.status(200).json({
    userId: user.userId,
    userName: user.userName,
    subscriptionStatus: user.subscriptionStatus,
    aiModels: user.aiModels
  });
}
