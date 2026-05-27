const mongoose = require("mongoose");

const medicalRecordSchema =
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

      diagnosis: {
        type: String,
      },

      treatment: {
        type: String,
      },

      prescription: {
        type: String,
      },

      notes: {
        type: String,
      },

      files: [
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
    "MedicalRecord",
    medicalRecordSchema
  );