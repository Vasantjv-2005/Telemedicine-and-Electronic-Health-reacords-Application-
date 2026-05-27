exports.getDoctors = async (
  req,
  res
) => {
  try {
    res.status(200).json({
      message: "Doctors fetched",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};