const mongoose = require('mongoose');
// const Schema = mongoose.Schema; without destructuring
const { Schema } = mongoose;

const recipientSchema = new Schema({
  email: String,
  responded: {type: Boolean, default: false}
})

// We directly export the Schema because this one will be used inside survey schema to generate 
// a more complex model. This is the way to define a subdocument collection
module.exports = recipientSchema;