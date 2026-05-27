const { Server } =
  require("socket.io");

let io;

const initSocket = (
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

      socket.on(
        "join-room",
        (roomId) => {
          socket.join(
            roomId
          );

          console.log(
            `📌 Joined Room: ${roomId}`
          );
        }
      );

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

      socket.on(
        "disconnect",
        () => {
          console.log(
            `🔴 User Disconnected`
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
  initSocket,
  getIO,
};