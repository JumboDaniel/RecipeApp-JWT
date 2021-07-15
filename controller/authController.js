const User = require('../model/user');
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

module.exports.signup_get = (req, res)=>{
    res.render('signup')
}

module.exports.login_get = (req, res)=>{
    res.render('signup')
}

module.exports.signup_post = async (req, res)=>{
    const {firstname, lastname, email, password} = req.body;
    try {
        const user = await User.create({firstname, lastname,  email, password})
        res.status(201).json({user})
    } catch (err) {
        const errors = handleErrors(err)
        res.status(400).json({errors})
    }
}

module.exports.login_post = (req, res)=>{
    const {name, email} = req.body;
    res.send('new login')
}
