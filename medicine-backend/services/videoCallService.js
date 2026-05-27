const { v4: uuidv4 } =
  require("uuid");

const createVideoRoom =
  () => {
    return {
      roomId: uuidv4(),
      createdAt:
        new Date(),
    };
  };

module.exports =
  createVideoRoom;