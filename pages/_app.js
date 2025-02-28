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

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <ToastContainer />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
