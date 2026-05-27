const mongoose = require("mongoose");

const patientSchema =
  new mongoose.Schema(
    {
      user: {
        type:
          mongoose.Schema.Types
            .ObjectId,
        ref: "User",
      },

      age: {
        type: Number,
      },

      gender: {
        type: String,
      },

      bloodGroup: {
        type: String,
      },

      medicalHistory: [
        {
          type: String,
        },
      ],
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Patient",
    patientSchema
  );