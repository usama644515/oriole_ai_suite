import { useRouter } from "next/router";
import LiveCameras from "@/components/LiveCameras";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import styles from "@/styles/Home.module.css";

export default function Cameras() {
  const router = useRouter();
  const { category, ipAddress,limit } = router.query; // Get category and IP from URL

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.main}>
        <Navbar />
        <LiveCameras category={category} ipAddress={ipAddress} limit={limit} />
      </div>
    </div>
  );
}
