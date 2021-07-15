const mongoose = require('mongoose');
const Schema =mongoose.Schema;
const {isEmail} = require('validator')

const userSchema = new Schema ({
    firstname:{
        type: String,
        required: [true, 'Please enter your first name'],
    },
    lastname:{
        type: String,
        required: [true, 'Please enter your last name'],
    },
    email:{
        type: String,
        required: [true, 'Input your email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },  
    password:{
        type: String,
        required: [true, 'Input your password'],
        minlength: [6, 'Minimum password is 6 characters']
    }
})

module.exports = mongoose.model('user', userSchema)