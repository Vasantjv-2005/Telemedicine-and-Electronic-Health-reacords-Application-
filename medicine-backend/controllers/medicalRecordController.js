const MedicalRecord = require("../models/MedicalRecord");

// Create Medical Record
exports.createMedicalRecord =
  async (req, res) => {
    try {
      const medicalRecord =
        await MedicalRecord.create({
          patient: req.body.patient,
          doctor: req.body.doctor,
          diagnosis:
            req.body.diagnosis,
          treatment:
            req.body.treatment,
          prescription:
            req.body.prescription,
          notes: req.body.notes,
          files: req.body.files,
        });

      res.status(201).json({
        success: true,
        message:
          "Medical record created successfully",
        medicalRecord,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// Get All Medical Records
exports.getMedicalRecords =
  async (req, res) => {
    try {
      const medicalRecords =
        await MedicalRecord.find()
          .populate(
            "patient",
            "fullName email"
          )
          .populate(
            "doctor",
            "fullName email"
          )
          .sort({
            createdAt: -1,
          });

      res.status(200).json({
        success: true,
        count:
          medicalRecords.length,
        medicalRecords,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// Get Single Medical Record
exports.getMedicalRecordById =
  async (req, res) => {
    try {
      const medicalRecord =
        await MedicalRecord.findById(
          req.params.id
        )
          .populate(
            "patient",
            "fullName email"
          )
          .populate(
            "doctor",
            "fullName email"
          );

      if (!medicalRecord) {
        return res.status(404).json({
          success: false,
          message:
            "Medical record not found",
        });
      }

      res.status(200).json({
        success: true,
        medicalRecord,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// Update Medical Record
exports.updateMedicalRecord =
  async (req, res) => {
    try {
      const medicalRecord =
        await MedicalRecord.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
          }
        );

      res.status(200).json({
        success: true,
        message:
          "Medical record updated successfully",
        medicalRecord,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// Delete Medical Record
exports.deleteMedicalRecord =
  async (req, res) => {
    try {
      await MedicalRecord.findByIdAndDelete(
        req.params.id
      );

      res.status(200).json({
        success: true,
        message:
          "Medical record deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };