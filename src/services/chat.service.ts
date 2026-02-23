import { MessageRepository } from "../repositories/message.repository";

export class ChatService {
  private messageRepo = new MessageRepository();

  async joinRoom(socket: any, roomId: string) {
    socket.join(roomId);
    return { roomId };
  }

  async createMessage(roomId: string, message: string, sender: string) {
    const savedMessage = await this.messageRepo.create({
      roomId,
      message,
      sender,
    });

    return savedMessage;
  }

  async getRoomHistory(roomId: string) {
    return this.messageRepo.findByRoom(roomId);
  }
}
