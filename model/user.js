const mongoose = require('mongoose');
const Schema =mongoose.Schema;
const {isEmail} = require('validator')
const bcrypt = require('bcrypt');
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
//Hash password using mongoose hooks
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    next()
})
module.exports = mongoose.model('user', userSchema)