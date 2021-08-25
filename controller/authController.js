const User = require('../model/user');
const jwt = require('jsonwebtoken');


const maxAge = 3 * 24 * 60 *60;

//Error Handlers
const handleErrors = (err)=>{
    console.log(err.message, err.code)
    let errors = {firstname:'', lastname:'', email:'', password:''}
    //error handling
    //Wrong input error
    if(err.message.includes('user validation failed')){
       Object.values(err.errors).forEach(({properties}) => {
           errors[properties.path] = properties.message;
       });
    }
    //duplicate email error
    else if(err.code === 11000){
        errors.email = 'The email is already registered'
    }
    return errors
}


const createToken = (id)=>{
    return jwt.sign({id}, 'login sceret', {
        expiresIn: maxAge
    })
}

module.exports.signup_get = (req, res)=>{
    res.render('signup')
}

module.exports.login_get = (req, res)=>{
    res.render('login')
}

module.exports.signup_post = async (req, res)=>{
    const {firstname, lastname, email, password} = req.body;
    try {
        const user = await User.create({firstname, lastname,  email, password})
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
        res.status(201).json({user: user._id})
    } catch (err) {
        const errors = handleErrors(err)
        res.status(400).json({errors})
    }
}

module.exports.login_post = async (req, res)=>{
    const {name, email} = req.body;
    try {
        const user = await User.login({email, password})
        res.status(200).json({user: user._id})
    } catch (error) {
        res.status(400).json({})
    }
    res.send('new login')
}
