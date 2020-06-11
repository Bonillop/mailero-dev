const express = require('express');
const router = express.Router();

/**
 * See the current user
 */
router.get("/current_user", (req, res) => {
  res.send(req.user);
});

/**
 * Logout the user
 */
router.get("/logout", (req, res) => {
  req.logout();
  res.send(req.user);
});

module.exports = router;