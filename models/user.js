const mongoose = require('mongoose')
const joi = require('joi')

const userSchema = new mongoose.Schema({
    name: joi.string().alphanum().min(3).max(25).required(),
    eamil: joi.string().email().min(3).required(),
    password: joi.string().min(5).required(),
})

module.exports = mongoose.model('User', userSchema)