const {
  Server,
} = require("socket.io");

let io;

const initializeSocket = (
  server
) => {
  io = new Server(server, {
    cors: {
      origin:
        process.env.CLIENT_URL,

      methods: [
        "GET",
        "POST",
      ],
    },
  });

  io.on(
    "connection",
    (socket) => {
      console.log(
        `🟢 User Connected: ${socket.id}`
      );

      // Join Video Room
      socket.on(
        "join-room",
        (roomId) => {
          socket.join(
            roomId
          );

          console.log(
            `📌 Joined Room: ${roomId}`
          );

          socket
            .to(roomId)
            .emit(
              "user-joined",
              socket.id
            );
        }
      );

      // WebRTC Offer
      socket.on(
        "offer",
        (data) => {
          socket
            .to(data.roomId)
            .emit(
              "offer",
              data
            );
        }
      );

      // WebRTC Answer
      socket.on(
        "answer",
        (data) => {
          socket
            .to(data.roomId)
            .emit(
              "answer",
              data
            );
        }
      );

      // ICE Candidate
      socket.on(
        "ice-candidate",
        (data) => {
          socket
            .to(data.roomId)
            .emit(
              "ice-candidate",
              data
            );
        }
      );

      // Chat Message
      socket.on(
        "send-message",
        (data) => {
          io.to(
            data.roomId
          ).emit(
            "receive-message",
            data
          );
        }
      );

      // Disconnect
      socket.on(
        "disconnect",
        () => {
          console.log(
            `🔴 User Disconnected: ${socket.id}`
          );
        }
      );
    }
  );
};

const getIO = () => {
  if (!io) {
    throw new Error(
      "Socket.io not initialized"
    );
  }

  return io;
};

module.exports = {
  initializeSocket,
  getIO,
};