exports.createPrescription =
  async (req, res) => {
    try {
      res.status(201).json({
        message:
          "Prescription generated",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };