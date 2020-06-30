// We basically export a function that receives the app and configures the new route handlers

const mongoose = require('mongoose');
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");
const Mailer = require("../services/Mailer");

// This approach avoids having some issues with testing the models with mongoose
const Survey = mongoose.model("surveys");

module.exports = app => {

  app.get('/api/surveys/thanks', (req, res) => {
    res.send('Thanks for voting!');
  })

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;
    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user._id,
      dateSent: Date.now()
    });

    const mailer = new Mailer(survey, surveyTemplate(survey));
    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (error) {
      res.status(422).send(error);
    }

  })
}