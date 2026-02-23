import { Socket } from "socket.io";
import jwt from "jsonwebtoken";
import { SocketData } from "../types/socket.types";

const SECRET = "supersecret"; // later move to env

interface JwtPayload {
  userId: string;
}

export const socketAuthMiddleware = (
  socket: Socket<any, any, any, SocketData>,
  next: (err?: Error) => void,
) => {
  try {
    const token = socket.handshake.auth?.token;

    if (!token) {
      return next(new Error("Authentication token missing"));
    }

    const decoded = jwt.verify(token, SECRET) as JwtPayload;

    socket.data.userId = decoded.userId;

    next();
  } catch (error) {
    next(new Error("Invalid authentication token"));
  }
};
