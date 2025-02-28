import bcrypt from "bcryptjs";
import connectDB from "@/lib/dbConnect";
import User from "@/models/User";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  await connectDB();

  const { userName, businessName, userId, password, address, phoneNumber, aiModels } = req.body;

  if (!userName || !businessName || !userId || !password || !address || !phoneNumber || !Array.isArray(aiModels) || aiModels.length === 0) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingUser = await User.findOne({ userId });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const validModels = ["NPR Detection", "Fire Detection"];
  const formattedModels = aiModels.map((model) => {
    if (
      !validModels.includes(model.name) ||
      typeof model.cameraLimit !== "number" ||
      !model.ipAddress ||
      !/^https?:\/\/\d+\.\d+\.\d+\.\d+(:\d+)?$/.test(model.ipAddress) // Validates IP format
    ) {
      return null;
    }
    return {
      name: model.name,
      cameraLimit: model.cameraLimit,
      ipAddress: model.ipAddress,
    };
  });

  if (formattedModels.includes(null)) {
    return res.status(400).json({ message: "Invalid AI model data or IP address format" });
  }

  const newUser = new User({
    userName,
    businessName,
    userId,
    password: hashedPassword,
    address,
    phoneNumber,
    aiModels: formattedModels,
  });

  await newUser.save();

  res.status(201).json({ message: "User registered successfully", userId });
}
