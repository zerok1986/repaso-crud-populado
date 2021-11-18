const mongoose = require('mongoose')
const Schema = mongoose.Schema

const parkSchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
  description: String,
})

module.exports = mongoose.model('Park', parkSchema)
