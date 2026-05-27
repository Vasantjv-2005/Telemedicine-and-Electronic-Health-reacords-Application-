exports.createAppointment =
  async (req, res) => {
    try {
      res.status(201).json({
        message:
          "Appointment created successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };