import mongoose from "mongoose";

const AiModelSchema = new mongoose.Schema({
  name: { type: String, enum: ["NPR Detection", "Fire Detection"], required: true },
  cameraLimit: { type: Number, required: true },
  ipAddress: { type: String, required: true }, // IP field added
});

const UserSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  businessName: { type: String, required: true },
  userId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  accountCreated: { type: Date, default: Date.now },
  subscriptionStatus: { type: String, enum: ["Active", "Pending", "Canceled"], default: "Pending" },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  aiModels: [AiModelSchema], // Updated to use a separate schema
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
