import { Server } from "socket.io";
import { chatHandler } from "./chat.handler";

export const initSocket = (io: Server) => {
  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    chatHandler(io, socket);

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
};
