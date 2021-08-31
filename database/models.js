const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ip = require('ip')

const userSchema = new Schema({ 
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    user_ip: {
        type: String,
        default: ip.address(),
    },
    created_at: {
        type: Date,
        default: new Date()
    }
});
const userModel = mongoose.model('user', userSchema);


module.exports = {
    userModel: userModel,
}