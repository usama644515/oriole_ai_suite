import AiModels from "@/components/AiModels";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import styles from "@/styles/Home.module.css";

export default function aiMOdels() {
  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.main}>
        <Navbar />
        <AiModels />
      </div>
    </div>
  );
}
