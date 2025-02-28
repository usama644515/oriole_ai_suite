import { useRouter } from "next/router";
import styles from "@/styles/Sidebar.module.css";
import { FaTachometerAlt, FaCamera, FaCog, FaSignOutAlt, FaBrain } from "react-icons/fa";
import Image from "next/image";
import logo from "@/public/logo.png";

const Sidebar = () => {
  const router = useRouter();
  
  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to logout?")) {
      await fetch("/api/logout", { method: "POST" });
      router.push("/login");
    }
  };

  // Function to check if a menu item is active
  const isActive = (path) => router.pathname === path;

  return (
    <aside className={styles.sidebar}>
      {/* Logo Section */}
      <div className={styles.logoContainer}>
        <Image src={logo} alt="AI Logo" className={styles.logo} />
      </div>

      {/* Divider Line */}
      <div className={styles.separator}></div>

      <div className={styles.inner}>
        {/* Menu Items */}
        <ul className={styles.menu}>
          <li className={`${styles.menuItem} ${isActive("/") ? styles.active : ""}`} onClick={() => router.push("/")}>
            <FaTachometerAlt /> <span>Dashboard</span>
          </li>
          <div className={styles.line}></div>

          <li className={`${styles.menuItem} ${isActive("/live-cameras") ? styles.active : ""}`} onClick={() => router.push("/live-cameras")}>
            <FaCamera /> <span>Live Cameras</span>
          </li>
          <div className={styles.line}></div>

          <li className={`${styles.menuItem} ${isActive("/ai-models") ? styles.active : ""}`} onClick={() => router.push("/ai-models")}>
            <FaBrain /> <span>AI Models</span>
          </li>
          <div className={styles.line}></div>

          <li className={`${styles.menuItem} ${isActive("/settings") ? styles.active : ""}`} onClick={() => router.push("/settings")}>
            <FaCog /> <span>Settings</span>
          </li>
          <div className={styles.line}></div>

          {/* Logout Button with Confirmation */}
          <li className={`${styles.menuItem} ${styles.logout}`} onClick={handleLogout}>
            <FaSignOutAlt /> <span>Logout</span>
          </li>
        </ul>

        {/* Footer */}
        <p className={styles.footer}>© 2025 Oriole AI Suite</p>
      </div>
    </aside>
  );
};

export default Sidebar;
