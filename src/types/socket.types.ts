export interface ServerToClientEvents {
  joined_room: (data: { roomId: string }) => void;
  receive_message: (data: {
    roomId: string;
    message: string;
    sender: string;
  }) => void;
}

export interface ClientToServerEvents {
  join_room: (roomId: string) => void;
  send_message: (data: { roomId: string; message: string }) => void;
}

export interface InterServerEvents {}

export interface SocketData {
  userId?: string;
}
