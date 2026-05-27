const express = require("express");

const {
  createMedicalRecord,
  getMedicalRecords,
  getMedicalRecordById,
  updateMedicalRecord,
  deleteMedicalRecord,
} = require("../controllers/medicalRecordController");

const {
  protect,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/",
  protect,
  createMedicalRecord
);

router.get(
  "/",
  protect,
  getMedicalRecords
);

router.get(
  "/:id",
  protect,
  getMedicalRecordById
);

router.put(
  "/:id",
  protect,
  updateMedicalRecord
);

router.delete(
  "/:id",
  protect,
  deleteMedicalRecord
);

module.exports = router;