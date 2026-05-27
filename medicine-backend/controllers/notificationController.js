const Notification = require("../models/Notification");

// Create Notification
exports.createNotification =
  async (req, res) => {
    try {
      const notification =
        await Notification.create({
          user: req.body.user,
          title: req.body.title,
          message: req.body.message,
        });

      res.status(201).json({
        success: true,
        message:
          "Notification created successfully",
        notification,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// Get User Notifications
exports.getNotifications =
  async (req, res) => {
    try {
      const notifications =
        await Notification.find({
          user: req.params.userId,
        }).sort({
          createdAt: -1,
        });

      res.status(200).json({
        success: true,
        count: notifications.length,
        notifications,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// Mark Notification As Read
exports.markAsRead =
  async (req, res) => {
    try {
      const notification =
        await Notification.findByIdAndUpdate(
          req.params.id,
          {
            isRead: true,
          },
          {
            new: true,
          }
        );

      res.status(200).json({
        success: true,
        message:
          "Notification marked as read",
        notification,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// Delete Notification
exports.deleteNotification =
  async (req, res) => {
    try {
      await Notification.findByIdAndDelete(
        req.params.id
      );

      res.status(200).json({
        success: true,
        message:
          "Notification deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };