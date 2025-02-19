const mangoose = require('mongoose');

const userSchema = new mangoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
})
module.exports = mongoose.model('User', userSchema);