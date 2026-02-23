export class ChatService {
  joinRoom(socket: any, roomId: string) {
    socket.join(roomId);
    return { roomId };
  }

  createMessage(roomId: string, message: string, sender: string) {
    return {
      roomId,
      message,
      sender,
    };
  }
}
