import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    roomId: { type: String, required: true },
    message: { type: String, required: true },
    sender: { type: String, required: true },
  },
  { timestamps: true },
);

export const MessageModel = mongoose.model("Message", messageSchema);
