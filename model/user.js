const mongoose = require('mongoose');
const Schema =mongoose.Schema;

const userSchema = new Schema ({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: [true, 'Input your email'],
        unique: true,
        lowercase: true,
        // validate: [(val)=>{ }, 'Please enter a valid email']
    },  
    password:{
        type: String,
        required: [true, 'Input your password'],
        minlength: [6, 'Minimum password is 6 characters']
    }
})

module.exports = mongoose.model('user', userSchema)