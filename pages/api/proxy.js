export default async function handler(req, res) {
    if (req.method === "POST") {
      try {
        const response = await fetch("http://203.6.209.25:5001/list_cameras", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(req.body),
        });
  
        const data = await response.json();
        res.status(response.status).json(data);
      } catch (error) {
        console.error("API Proxy Error:", error);
        res.status(500).json({ error: "Failed to fetch data from the backend" });
      }
    } else {
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  