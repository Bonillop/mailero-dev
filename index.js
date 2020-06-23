const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const keys = require('./config/keys')
require('./models/user'); // Since we use user in passport, we must require it first
require('./services/passport'); // This is for when we want to execute code but not use a function or something like that
const authRoutes = require('./routes/authRoutes'); // SECOND APPROACH
const apiRoutes = require('./routes/apiRoutes');

mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const app = express();
app.use(bodyParser.json());
app.use(cookieSession({
  maxAge: 30 * 24 * 60 * 60 * 1000,
  keys: [keys.cookieKey]
}))
app.use(passport.initialize());
app.use(passport.session());

// require("./routes/authRoutes")(app); FIRST APPROACH, we pass app as an argument for the function with the routes
app.use("/auth", authRoutes); // SECOND APPROACH
app.use("/api", apiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app is listening to port ${PORT}`);
});
