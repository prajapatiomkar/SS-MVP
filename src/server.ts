import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { initSocket } from "./socket";
import {
  ServerToClientEvents,
  ClientToServerEvents,
  InterServerEvents,
  SocketData,
} from "./types/socket.types";
import { socketAuthMiddleware } from "./middleware/socket-auth.middleware";
import { connectDB } from "./config/db";

const app = express();
const httpServer = createServer(app);
connectDB();

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(httpServer, {
  cors: { origin: "*" },
});

app.get("/health", (_, res) => {
  res.json({ status: "OK" });
});
io.use(socketAuthMiddleware);
// initialize socket layer
initSocket(io);

const PORT = 3000;

httpServer.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
