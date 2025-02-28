import { useState } from "react";
import styles from "@/styles/Navbar.module.css";
import { FaUserCircle } from "react-icons/fa"; // Importing user icon

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className={styles.navbar}>
      <h2 className={styles.logo}>AI Detection Dashboard</h2>
      <div className={styles.profileContainer}>
        <div className={styles.profileIcon} onClick={toggleDropdown}>
          <FaUserCircle size={30} />
        </div>
        {dropdownOpen && (
          <div className={styles.dropdownMenu}>
            <a href="#" className={styles.dropdownItem}>View Profile</a>
            <a href="#" className={styles.dropdownItem}>Logout</a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
