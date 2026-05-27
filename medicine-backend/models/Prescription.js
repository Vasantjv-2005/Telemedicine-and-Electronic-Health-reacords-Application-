const mongoose = require("mongoose");

const prescriptionSchema =
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

      medicines: [
        {
          name: String,
          dosage: String,
          timing: String,
        },
      ],

      notes: {
        type: String,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Prescription",
    prescriptionSchema
  );