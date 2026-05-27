const mongoose = require("mongoose");

const doctorSchema =
  new mongoose.Schema(
    {
      user: {
        type:
          mongoose.Schema.Types
            .ObjectId,
        ref: "User",
      },

      specialization: {
        type: String,
        required: true,
      },

      experience: {
        type: Number,
      },

      hospital: {
        type: String,
      },

      fees: {
        type: Number,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Doctor",
    doctorSchema
  );