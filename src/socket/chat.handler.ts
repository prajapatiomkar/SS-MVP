import { Server, Socket } from "socket.io";
import { ChatService } from "../services/chat.service";
import {
  ClientToServerEvents,
  ServerToClientEvents,
  SocketData,
} from "../types/socket.types";

const chatService = new ChatService();

export const chatHandler = (
  io: Server<ClientToServerEvents, ServerToClientEvents>,
  socket: Socket<ClientToServerEvents, ServerToClientEvents, {}, SocketData>,
) => {
  socket.on("join_room", (roomId) => {
    const result = chatService.joinRoom(socket, roomId);
    socket.emit("joined_room", result);
  });

  socket.on("send_message", ({ roomId, message }) => {
    const payload = chatService.createMessage(
      roomId,
      message,
      socket.data.userId!, // ← now real identity
    );

    io.to(roomId).emit("receive_message", payload);
  });
};
