// FIRST APPROACH - use a function that receives the app and configures the routes. Faster way?
// const passport = require('passport');

// module.exports = (app) => {
//   app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

//   app.get("/auth/google/callback", passport.authenticate("google"));
// }

// SECOND APPROACH - create a router, the "root" of the router is defined in the app.use. Clearer way
const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback", passport.authenticate("google"));

module.exports = router;