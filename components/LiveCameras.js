/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faPlus,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";
import styles from "@/styles/LiveCameras.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CameraList = ({ ipAddress, limit, type }) => {
  const [cameras, setCameras] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCamera, setNewCamera] = useState({ name: "", rtsp_url: "" });
  const [menuOpen, setMenuOpen] = useState(null);
  const [userId, setUserId] = useState(null); // State to store userId

  // Fetch userId from local storage on component mount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.userId) {
      setUserId(user.userId);
    }
  }, []);

  // Fetch cameras when userId and type are available
  useEffect(() => {
    if (ipAddress && userId && type) {
      fetch(`${ipAddress}/list_cameras`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, modelType: type }), // Send data in the body
      })
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
          return res.json();
        })
        .then((data) => setCameras(data))
        .catch((err) => console.error("Error fetching cameras:", err));
    }
    console.log("ipAddress", ipAddress);
    console.log("userId", userId);
    console.log("type", type);
  }, [ipAddress, userId, type]);

  const openFullScreen = (camera) => setSelectedCamera(camera);
  const closeFullScreen = () => setSelectedCamera(null);

  const openModal = () => {
    if (cameras.length >= limit) {
      toast.error("Camera limit reached. Cannot add more cameras.");
    } else {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewCamera({ name: "", rtsp_url: "" });
  };

  const handleInputChange = (e) => {
    setNewCamera({ ...newCamera, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!newCamera.name || !newCamera.rtsp_url) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch(`${ipAddress}/add_camera`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newCamera.name,
          rtsp_url: newCamera.rtsp_url,
          userId: userId, // Use userId from state
          modelType: type, // Use type prop
        }),
      });

      if (response.ok) {
        const addedCamera = await response.json();
        setCameras([...cameras, addedCamera]);
        closeModal();
      } else {
        console.error("Failed to add camera");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async (cameraId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this camera?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${ipAddress}/remove_camera/${cameraId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Refresh the entire tab after successful deletion
        window.location.reload();
      } else {
        console.error("Failed to delete camera");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <h2 className={styles.title}>Live Camera Feeds</h2>
        <button className={styles.addCameraBtn} onClick={openModal}>
          <FontAwesomeIcon icon={faPlus} /> Add New Camera
        </button>
      </div>

      {cameras.length === 0 ? (
        <p className={styles.noCameras}>No cameras available</p>
      ) : (
        <div className={styles.grid}>
          {cameras.map((camera) => (
            <div key={camera._id} className={styles.cameraCard}>
              <div className={styles.menuWrapper}>
                <div
                  className={styles.menuIcon}
                  onClick={() =>
                    setMenuOpen(menuOpen === camera._id ? null : camera._id)
                  }
                >
                  <FontAwesomeIcon icon={faEllipsisV} />
                </div>
                {menuOpen === camera._id && (
                  <div className={styles.dropdownMenu}>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => handleDelete(camera._id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
              <img
                src={camera.mjpeg_url}
                alt={camera.name}
                className={styles.stream}
                onClick={() => setSelectedCamera(camera)}
              />
              <div className={styles.overlay}>{camera.name}</div>
            </div>
          ))}
        </div>
      )}

      {selectedCamera && (
        <div className={styles.fullScreen}>
          <div className={styles.fullScreenContent}>
            <button className={styles.closeBtn} onClick={closeFullScreen}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <h3 className={styles.fullScreenTitle}>{selectedCamera.name}</h3>
            <img
              src={selectedCamera.mjpeg_url}
              alt="Live Feed"
              className={styles.fullScreenVideo}
            />
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <button className={styles.closeModalBtn} onClick={closeModal}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <h3>Add New Camera</h3>
            <input
              type="text"
              name="name"
              placeholder="Camera Name"
              className={styles.input}
              value={newCamera.name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="rtsp_url"
              placeholder="RTSP URL"
              className={styles.input}
              value={newCamera.rtsp_url}
              onChange={handleInputChange}
            />
            <button className={styles.submitBtn} onClick={handleSubmit}>
              Save Camera
            </button>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default CameraList;