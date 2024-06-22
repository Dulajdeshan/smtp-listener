import express from "express";
import path from "path";
import opener from "opener";
import { wss } from "./smtp-server"; // Import WebSocket server instance
import axios from "axios"; // Import axios

const app = express();
const PORT = 8585;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Route to get the public IP address
app.get("/public-ip", async (req, res) => {
  try {
    const response = await axios.get("https://api.ipify.org?format=json");
    res.send(response.data.ip);
  } catch (error) {
    console.error("Error fetching public IP:", error);
    res.status(500).send("Internal Server Error");
  }
});

// WebSocket endpoint (no need to create a new WebSocket server)
wss.on("connection", (ws) => {
  console.log("Client connected to WebSocket server");

  ws.on("close", () => {
    console.log("Client disconnected from WebSocket server");
  });
});

app.listen(PORT, async () => {
  console.log(`Web server listening on port ${PORT}`);
  opener(`http://localhost:${PORT}`);
});
