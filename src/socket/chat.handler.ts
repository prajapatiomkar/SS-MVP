import { Server, Socket } from "socket.io";

export const chatHandler = (io: Server, socket: Socket) => {
  socket.on("join_room", (roomId: string) => {
    socket.join(roomId);
    socket.emit("joined_room", { roomId });
    console.log(`${socket.id} joined ${roomId}`);
  });

  socket.on("send_message", ({ roomId, message }) => {
    io.to(roomId).emit("receive_message", {
      roomId,
      message,
      sender: socket.id,
    });
  });
};
