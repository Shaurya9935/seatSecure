import { Server } from "socket.io";

let io;

export function initializeSocket(server) {
  io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("🟢 Client Connected:", socket.id);

    socket.on("join-show", (showId) => {
      socket.join(showId);
      console.log(`Socket ${socket.id} joined show ${showId}`);
    });

    socket.on("disconnect", () => {
      console.log("🔴 Client Disconnected:", socket.id);
    });
  });

  return io;
}

export function getIO() {
  if (!io) {
    throw new Error("Socket.io is not initialized");
  }

  return io;
}
