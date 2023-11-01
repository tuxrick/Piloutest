const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },
    last_name: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    emergency_contact_name: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },    
    emergency_contact_phone: {
        type: String,
        required: true,
        min: 5,
        max: 1024
    },
    blood_type: {
        type: String,
        required: false,
        min: 6,
        max: 255
    },
    creation_date: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        required: false,
        minlength: 4
    },
    code: {
        type: Number,
        required: false,
    },
    expire_code: {
        type: Date,
        required: false,
        default: Date.now
    },
})

module.exports = mongoose.model('users', userSchema);