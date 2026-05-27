const User = require("../models/User");

// Get All Patients
exports.getPatients = async (
  req,
  res
) => {
  try {
    const patients = await User.find({
      role: "patient",
    }).select("-password");

    res.status(200).json({
      success: true,
      count: patients.length,
      patients,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Patient
exports.getPatientById =
  async (req, res) => {
    try {
      const patient =
        await User.findById(
          req.params.id
        ).select("-password");

      if (!patient) {
        return res.status(404).json({
          success: false,
          message:
            "Patient not found",
        });
      }

      res.status(200).json({
        success: true,
        patient,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// Update Patient Profile
exports.updatePatient =
  async (req, res) => {
    try {
      const updatedPatient =
        await User.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
          }
        ).select("-password");

      res.status(200).json({
        success: true,
        message:
          "Patient updated successfully",
        patient: updatedPatient,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// Delete Patient
exports.deletePatient =
  async (req, res) => {
    try {
      await User.findByIdAndDelete(
        req.params.id
      );

      res.status(200).json({
        success: true,
        message:
          "Patient deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };