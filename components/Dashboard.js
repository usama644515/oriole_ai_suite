import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/Dashboard.module.css";
import DetectionCard from "./DetectionCard";

const detections = [
  { title: "Fire Detection", image: "/images/fire.webp", category: "fire detection" },
  { title: "NPR Detection", image: "/images/npr.webp", category: "npr detection" },
  { title: "PPE Detection", image: "/images/safty.webp", category: "ppe detection" },
  { title: "Object Detection", image: "/images/object.webp", category: "object detection" },
  { title: "Face Recognition", image: "/images/face.webp", category: "face recognition" },
];

const Dashboard = () => {
  const router = useRouter();
  const [userModels, setUserModels] = useState([]);

  useEffect(() => {
    // Fetch user data from localStorage (or replace with API call if needed)
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUserModels(userData.aiModels); // Store the full AI models array
    }
  }, []);

  // Filter detections based on user's AI models
  const availableDetections = detections
    .map(item => {
      const matchedModel = userModels.find(model => model.name === item.title);
      return matchedModel ? { ...item, ipAddress: matchedModel.ipAddress,limit: matchedModel.cameraLimit } : null;
    })
    .filter(Boolean); // Remove null values

  const handleCardClick = (category, ipAddress,limit) => {
    router.push({
      pathname: "/cameras",
      query: { category, ipAddress,limit },
    });
  };

  return (
    <main className={styles.dashboard}>
      {availableDetections.map((item, index) => (
        <DetectionCard
          key={index}
          title={item.title}
          image={item.image}
          onClick={() => handleCardClick(item.category, item.ipAddress,item.limit)}
        />
      ))}
    </main>
  );
};

export default Dashboard;
