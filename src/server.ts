import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { initSocket } from "./socket";

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

app.get("/health", (_, res) => {
  res.json({ status: "OK" });
});

// initialize socket layer
initSocket(io);

const PORT = 3000;

httpServer.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
