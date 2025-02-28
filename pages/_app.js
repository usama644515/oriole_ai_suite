/* eslint-disable @next/next/no-img-element */
import "../styles/globals.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      const response = await fetch("/api/auth");
      if (!response.ok && router.pathname !== "/login") {
        router.push("/login");
      } else {
        setLoading(false);
      }
    }
    checkAuth();
  }, [router.pathname]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "linear-gradient(to right, #004aad, #007bff)", // Gradient background
        }}
      >
        <img src="/loader.png" alt="Loading..." style={{ width: "300px", height: "auto" }} />
      </div>
    );
  }

  return (
    <>
      <ToastContainer />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
