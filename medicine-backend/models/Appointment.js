const mongoose = require("mongoose");

const appointmentSchema =
  new mongoose.Schema(
    {
      patient: {
        type:
          mongoose.Schema.Types
            .ObjectId,
        ref: "User",
      },

      doctor: {
        type:
          mongoose.Schema.Types
            .ObjectId,
        ref: "User",
      },

      appointmentDate: {
        type: Date,
        required: true,
      },

      status: {
        type: String,
        enum: [
          "pending",
          "approved",
          "completed",
          "cancelled",
        ],
        default: "pending",
      },

      symptoms: {
        type: String,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Appointment",
    appointmentSchema
  );