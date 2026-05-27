const express = require("express");

const {
  createNotification,
  getNotifications,
  markAsRead,
  deleteNotification,
} = require("../controllers/notificationController");

const {
  protect,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/",
  protect,
  createNotification
);

router.get(
  "/:userId",
  protect,
  getNotifications
);

router.put(
  "/:id/read",
  protect,
  markAsRead
);

router.delete(
  "/:id",
  protect,
  deleteNotification
);

module.exports = router;