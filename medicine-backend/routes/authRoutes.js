const express = require("express");

const passport = require("passport");

const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/authController");

const {
  protect,
} = require("../middleware/authMiddleware");

const router = express.Router();

// Normal Auth
router.post(
  "/register",
  registerUser
);

router.post(
  "/login",
  loginUser
);

router.get(
  "/me",
  protect,
  getMe
);

// Google OAuth
router.get(
  "/google",
  passport.authenticate(
    "google",
    {
      scope: [
        "profile",
        "email",
      ],
    }
  )
);

router.get(
  "/google/callback",
  passport.authenticate(
    "google",
    {
      session: false,
    }
  ),
  (req, res) => {
    res.json({
      success: true,
      user: req.user,
    });
  }
);

module.exports = router;