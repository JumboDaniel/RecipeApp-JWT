const User = require('../model/user');

module.exports.signup_get = (req, res)=>{
    res.render('signup')
}

module.exports.login_get = (req, res)=>{
    res.render('signup')
}

module.exports.signup_post = async (req, res)=>{
    const {name, email, password} = req.body;
    try {
        const user = await User.create({name, email, password})
        return res.status(201).json(user)
    } catch (err) {
        console.log(err)
        res.status(400).send('User not created')
    }
    res.send('new signup')
}

module.exports.login_post = (req, res)=>{
    const {name, email} = req.body;
    res.send('new login')
}
