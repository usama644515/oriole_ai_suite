import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/Dashboard";
import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      
      <Sidebar />
      <div className={styles.main}>
      <Navbar />
        <Dashboard />
      </div>
    </div>
  );
}
