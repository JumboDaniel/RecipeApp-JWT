module.exports.signup_get = (req, res)=>{
    res.render('signup')
}

module.exports.login_get = (req, res)=>{
    res.render('signup')
}

module.exports.signup_post = (req, res)=>{
    const {name, email} = req.body;
    console.log(name , email)
    res.send('new signup')
}

module.exports.login_post = (req, res)=>{
    const {name, email} = req.body;
    console.log(name , email)
    res.send('new login')
}
