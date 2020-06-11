const mongoose = require('mongoose');
// const Schema = mongoose.Schema; without destructuring
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String 
})

// first argument is the name of the in our mongodb database
mongoose.model("users", userSchema);