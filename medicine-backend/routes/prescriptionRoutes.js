const express = require("express");

const {
  createPrescription,
} = require("../controllers/prescriptionController");

const {
  protect,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/",
  protect,
  createPrescription
);

module.exports = router;