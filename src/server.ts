import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

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

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("ping", (data) => {
    console.log("Ping received:", data);
    socket.emit("pong", { message: "Pong from server" });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

const PORT = 3000;

httpServer.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
