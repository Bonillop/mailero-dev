const express = require('express');
const router = express.Router();
const keys = require('../config/keys')
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

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
  res.redirect("/");
});

router.post("/stripe", requireLogin, async (req, res) => {
  try {
    const charge = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      description: "$5 for 5 credits",
      source: req.body.id,
    })
    req.user.credits += 5;
    const updatedUser = await req.user.save();

    res.send(updatedUser);
  } catch (error) {
    console.log(error);
  }
})

module.exports = router;