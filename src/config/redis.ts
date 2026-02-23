import { createAdapter } from "@socket.io/redis-adapter";
import { createClient } from "redis";
import { Server } from "socket.io";

export const setupRedisAdapter = async (io: Server) => {
  const pubClient = createClient({
    url: "redis://localhost:6379",
  });

  const subClient = pubClient.duplicate();

  await pubClient.connect();
  await subClient.connect();

  io.adapter(createAdapter(pubClient, subClient));

  console.log("Redis adapter connected");
};
