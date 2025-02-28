/* eslint-disable @next/next/no-img-element */
import styles from "@/styles/DetectionCard.module.css";

const DetectionCard = ({ title, image, onClick }) => {
  return (
    <div className={styles.card} onClick={onClick} style={{ cursor: "pointer" }}>
      <img src={image} alt={title} className={styles.image} />
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
      </div>
    </div>
  );
};

export default DetectionCard;
