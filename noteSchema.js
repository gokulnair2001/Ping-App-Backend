const { strict } = require("assert")
var mongoose = require("mongoose")
var Schema = mongoose.Schema

var note = new Schema({
    title: String,
    date: String,
    note: String
})

const data = mongoose.model("data", note)

module.exports = data 