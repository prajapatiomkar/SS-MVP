import { MessageModel } from "../models/message.model";

export class MessageRepository {
  async create(data: { roomId: string; message: string; sender: string }) {
    return MessageModel.create(data);
  }

  async findByRoom(roomId: string) {
    return MessageModel.find({ roomId }).sort({ createdAt: -1 });
  }
}
