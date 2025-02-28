import { useEffect, useState } from "react";
import styles from "@/styles/AiModels.module.css";
import { FaBrain } from "react-icons/fa";

const AiModels = () => {
  const [models, setModels] = useState([]);

  useEffect(() => {
    // Fetch AI Models (Replace with your API)
    const fetchModels = async () => {
      const response = await fetch("/api/ai-models"); // Mock API
      const data = await response.json();
      setModels(data);
    };

    fetchModels();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}><FaBrain /> AI Models</h1>
      <p className={styles.subtitle}>Explore our cutting-edge AI models designed for various applications.</p>

      <div className={styles.grid}>
        {models.length > 0 ? (
          models.map((model) => (
            <div key={model.id} className={styles.card}>
              <img src={model.image} alt={model.name} className={styles.image} />
              <h3 className={styles.name}>{model.name}</h3>
              <p className={styles.description}>{model.description}</p>
              <button className={styles.button}>Learn More</button>
            </div>
          ))
        ) : (
          <p className={styles.loading}>Loading AI Models...</p>
        )}
      </div>
    </div>
  );
};

export default AiModels;
